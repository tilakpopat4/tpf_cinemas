export interface Film {
  id: string;
  title: string;
  synopsis: string;
  director: string;
  duration: string;
  language: string;
  genre: string;
  posterUrl: string;
  backdropUrl: string;
  videoUrl: string; // YouTube embed ID or full embed URL
  releaseYear: number;
  isFeatured: boolean;
  isNew?: boolean;
  directorBio?: string;
  views: number;
  likes: number;
  type?: 'movie' | 'series';
  seasonsCount?: number;
  episodesCount?: number;
}

export interface Submission {
  id: string;
  filmTitle: string;
  synopsis: string;
  directorName: string;
  duration: string;
  language: string;
  genre: string;
  videoLink: string;
  email: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  reviewFeedback?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export interface UserProfile {
  name: string;
  email: string;
  joinedDate: string;
  isPremium: boolean;
  watchlistIds: string[];
  watchHistory: {
    filmId: string;
    watchedAt: string;
    progressPercent: number;
  }[];
}

export interface PlatformAnalytics {
  totalViews: number;
  totalWatchTimeHours: number;
  activeSubmissions: number;
  approvedFilmsCount: number;
}
