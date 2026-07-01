import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { UserProfile } from '../types';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error Details: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

/**
 * Checks if a Firestore error is related to being offline or having network connectivity issues.
 */
function isOfflineError(error: unknown): boolean {
  if (!(error instanceof Error)) return false;
  const errMsg = error.message.toLowerCase();
  return (
    errMsg.includes('offline') ||
    errMsg.includes('failed to get document because the client is offline') ||
    errMsg.includes('unavailable') ||
    errMsg.includes('network')
  );
}

/**
 * Fetches the user profile document from Firestore.
 */
export async function getFirestoreUserProfile(userId: string): Promise<UserProfile | null> {
  const docPath = `users/${userId}`;
  try {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as UserProfile;
    }
    return null;
  } catch (error) {
    if (isOfflineError(error)) {
      console.warn('Firestore is offline during getFirestoreUserProfile. Falling back to local storage profile cache.');
      const savedProfile = localStorage.getItem('tpf_profile');
      if (savedProfile) {
        try {
          return JSON.parse(savedProfile) as UserProfile;
        } catch (e) {
          return null;
        }
      }
      return null;
    }
    handleFirestoreError(error, OperationType.GET, docPath);
    return null;
  }
}

/**
 * Creates or updates the complete user profile in Firestore.
 */
export async function saveFirestoreUserProfile(
  userId: string,
  profile: Omit<UserProfile, 'watchlistIds' | 'watchHistory'> & {
    watchlistIds: string[];
    watchHistory: any[];
  }
): Promise<void> {
  const docPath = `users/${userId}`;
  try {
    const docRef = doc(db, 'users', userId);
    await setDoc(docRef, {
      uid: userId,
      name: profile.name,
      email: profile.email,
      joinedDate: profile.joinedDate,
      isPremium: profile.isPremium,
      watchlistIds: profile.watchlistIds,
      watchHistory: profile.watchHistory,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    if (isOfflineError(error)) {
      console.warn('Firestore is offline during saveFirestoreUserProfile. Action queued locally by Firebase SDK.');
      return;
    }
    handleFirestoreError(error, OperationType.CREATE, docPath);
  }
}

/**
 * Updates ONLY the watchlistIds of a user in Firestore.
 */
export async function updateFirestoreWatchlist(userId: string, watchlistIds: string[]): Promise<void> {
  const docPath = `users/${userId}`;
  try {
    const docRef = doc(db, 'users', userId);
    await updateDoc(docRef, {
      watchlistIds,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    if (isOfflineError(error)) {
      console.warn('Firestore is offline during updateFirestoreWatchlist. Action queued locally by Firebase SDK.');
      return;
    }
    handleFirestoreError(error, OperationType.UPDATE, docPath);
  }
}

/**
 * Updates ONLY the watch history of a user in Firestore.
 */
export async function updateFirestoreWatchHistory(userId: string, watchHistory: any[]): Promise<void> {
  const docPath = `users/${userId}`;
  try {
    const docRef = doc(db, 'users', userId);
    await updateDoc(docRef, {
      watchHistory,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    if (isOfflineError(error)) {
      console.warn('Firestore is offline during updateFirestoreWatchHistory. Action queued locally by Firebase SDK.');
      return;
    }
    handleFirestoreError(error, OperationType.UPDATE, docPath);
  }
}
