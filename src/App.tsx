import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import FilmRow from './components/FilmRow';
import TopTenRow from './components/TopTenRow';
import FilmPlayerModal from './components/FilmPlayerModal';
import BrowseCatalog from './components/BrowseCatalog';
import FilmmakerHub from './components/FilmmakerHub';
import ProfilePage from './components/ProfilePage';
import AboutPage from './components/AboutPage';
import AdminPanel from './components/AdminPanel';

import { Film, Submission, UserProfile } from './types';
import { INITIAL_FILMS, MOCK_SUBMISSIONS } from './data/mockFilms';
import { Sparkles, CreditCard, ShieldCheck, X, Check, Heart, Trophy, Globe, Lock, RefreshCw, ArrowLeft, ArrowRight, Key, ShieldAlert } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [films, setFilms] = useState<Film[]>(INITIAL_FILMS);
  const [submissions, setSubmissions] = useState<Submission[]>(MOCK_SUBMISSIONS);
  const [selectedFilm, setSelectedFilm] = useState<Film | null>(null);
  const [selectedQuality, setSelectedQuality] = useState<string>('Standard');
  
  // Admin password states
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);
  const [adminError, setAdminError] = useState('');

  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Tilak Popat',
    email: 'tilakpopat2007@gmail.com',
    joinedDate: '2026-06-01T00:00:00Z',
    isPremium: false,
    watchlistIds: ['film-1', 'film-3'],
    watchHistory: [
      { filmId: 'film-1', watchedAt: '2026-06-29T18:30:00Z', progressPercent: 85 },
      { filmId: 'film-3', watchedAt: '2026-06-30T10:15:00Z', progressPercent: 40 },
    ]
  });

  // Keep a local storage sync for session persistence if the user reloads the frame!
  useEffect(() => {
    const savedFilms = localStorage.getItem('tpf_films');
    const savedSubs = localStorage.getItem('tpf_subs');
    const savedProfile = localStorage.getItem('tpf_profile');
    const savedQuality = localStorage.getItem('tpf_quality');

    if (savedFilms) setFilms(JSON.parse(savedFilms));
    if (savedSubs) setSubmissions(JSON.parse(savedSubs));
    if (savedProfile) setUserProfile(JSON.parse(savedProfile));
    if (savedQuality) setSelectedQuality(savedQuality);
  }, []);

  const saveToLocalStorage = (newFilms: Film[], newSubs: Submission[], newProfile: UserProfile, newQuality: string) => {
    localStorage.setItem('tpf_films', JSON.stringify(newFilms));
    localStorage.setItem('tpf_subs', JSON.stringify(newSubs));
    localStorage.setItem('tpf_profile', JSON.stringify(newProfile));
    localStorage.setItem('tpf_quality', newQuality);
  };

  // Find the currently featured film
  const featuredFilm = films.find(f => f.isFeatured) || films[0];

  // Pending count for navbar badge
  const pendingCount = submissions.filter(s => s.status === 'pending').length;

  // Watch Now Trigger
  const handlePlayFilm = (film: Film) => {
    // Record view in film views count
    const updatedFilms = films.map(f => {
      if (f.id === film.id) {
        return { ...f, views: f.views + 1 };
      }
      return f;
    });

    // Add to watch history
    let updatedHistory = [...userProfile.watchHistory];
    const historyIndex = updatedHistory.findIndex(h => h.filmId === film.id);

    if (historyIndex >= 0) {
      updatedHistory[historyIndex] = {
        ...updatedHistory[historyIndex],
        watchedAt: new Date().toISOString(),
        progressPercent: Math.min(100, updatedHistory[historyIndex].progressPercent + 15)
      };
    } else {
      updatedHistory.unshift({
        filmId: film.id,
        watchedAt: new Date().toISOString(),
        progressPercent: 15
      });
    }

    const updatedProfile = {
      ...userProfile,
      watchHistory: updatedHistory
    };

    setFilms(updatedFilms);
    setUserProfile(updatedProfile);
    setSelectedFilm(film);

    saveToLocalStorage(updatedFilms, submissions, updatedProfile, selectedQuality);
  };

  // Toggle Watchlist
  const handleToggleWatchlist = (filmId: string) => {
    let updatedIds = [...userProfile.watchlistIds];
    const index = updatedIds.indexOf(filmId);

    if (index >= 0) {
      updatedIds.splice(index, 1);
    } else {
      updatedIds.push(filmId);
    }

    const updatedProfile = {
      ...userProfile,
      watchlistIds: updatedIds
    };

    setUserProfile(updatedProfile);
    saveToLocalStorage(films, submissions, updatedProfile, selectedQuality);
  };

  // Remove from watchlist
  const handleRemoveFromWatchlist = (filmId: string) => {
    const updatedProfile = {
      ...userProfile,
      watchlistIds: userProfile.watchlistIds.filter(id => id !== filmId)
    };
    setUserProfile(updatedProfile);
    saveToLocalStorage(films, submissions, updatedProfile, selectedQuality);
  };

  // Like / Appreciate film
  const handleLikeFilm = (filmId: string) => {
    const updatedFilms = films.map(f => {
      if (f.id === filmId) {
        return { ...f, likes: f.likes + 1 };
      }
      return f;
    });
    setFilms(updatedFilms);
    saveToLocalStorage(updatedFilms, submissions, userProfile, selectedQuality);
  };

  // Filmmaker files a submission
  const handleSubmitSubmission = (newSub: Omit<Submission, 'id' | 'status' | 'submittedAt'>) => {
    const createdSub: Submission = {
      ...newSub,
      id: `sub-${Date.now()}`,
      status: 'pending',
      submittedAt: new Date().toISOString()
    };

    const updatedSubs = [createdSub, ...submissions];
    setSubmissions(updatedSubs);
    saveToLocalStorage(films, updatedSubs, userProfile, selectedQuality);
  };

  // Admin approves submission
  const handleApproveSubmission = (submissionId: string, feedback: string) => {
    const activeSub = submissions.find(s => s.id === submissionId);
    if (!activeSub) return;

    // 1. Update status to approved & add feedback
    const updatedSubs = submissions.map(s => {
      if (s.id === submissionId) {
        return { ...s, status: 'approved' as const, reviewFeedback: feedback };
      }
      return s;
    });

    // 2. Transcode & append to active films
    // Standard beautiful backup images for newly approved indies
    const covers = [
      'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=600&h=900',
      'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=600&h=900',
      'https://images.unsplash.com/photo-1478720143033-6a972678aa30?auto=format&fit=crop&q=80&w=600&h=900'
    ];
    const backdrops = [
      'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=1600&h=900',
      'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=1600&h=900',
      'https://images.unsplash.com/photo-1478720143033-6a972678aa30?auto=format&fit=crop&q=80&w=1600&h=900'
    ];

    const randomIdx = Math.floor(Math.random() * covers.length);

    const approvedFilm: Film = {
      id: `film-approved-${Date.now()}`,
      title: activeSub.filmTitle,
      synopsis: activeSub.synopsis,
      director: activeSub.directorName,
      duration: activeSub.duration,
      language: activeSub.language,
      genre: activeSub.genre,
      posterUrl: covers[randomIdx],
      backdropUrl: backdrops[randomIdx],
      videoUrl: 'https://www.youtube.com/embed/R6MlUcmO1A0', // Play tears of steel or customizable unlisted video
      releaseYear: 2025,
      isFeatured: false,
      isNew: true,
      directorBio: `Originally submitted to TPF review board by ${activeSub.directorName}. Pitch email: ${activeSub.email}. Approved on TPF Desk on ${new Date().toLocaleDateString()}.`,
      views: 120,
      likes: 35
    };

    const updatedFilms = [approvedFilm, ...films];
    setFilms(updatedFilms);
    setSubmissions(updatedSubs);
    saveToLocalStorage(updatedFilms, updatedSubs, userProfile, selectedQuality);
  };

  // Admin rejects submission
  const handleRejectSubmission = (submissionId: string, feedback: string) => {
    const updatedSubs = submissions.map(s => {
      if (s.id === submissionId) {
        return { ...s, status: 'rejected' as const, reviewFeedback: feedback };
      }
      return s;
    });

    setSubmissions(updatedSubs);
    saveToLocalStorage(films, updatedSubs, userProfile, selectedQuality);
  };

  // Change Home Featured Film
  const handleSetFeaturedFilm = (filmId: string) => {
    const updatedFilms = films.map(f => ({
      ...f,
      isFeatured: f.id === filmId
    }));
    setFilms(updatedFilms);
    saveToLocalStorage(updatedFilms, submissions, userProfile, selectedQuality);
  };

  // Update streaming Quality selection
  const handleUpdateQuality = (quality: string) => {
    setSelectedQuality(quality);
    saveToLocalStorage(films, submissions, userProfile, quality);
  };

  // Segment film rows on main Home view
  const newlyAddedFilms = films.filter(f => f.isNew);
  const documentaryFilms = films.filter(f => f.genre === 'Documentary');
  const dramaFilms = films.filter(f => f.genre === 'Drama' && !f.isFeatured);
  const experimentalFilms = films.filter(f => f.genre === 'Experimental');

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex flex-col justify-between selection:bg-brand-gold selection:text-[#050505] relative overflow-hidden">
      {/* Background Mesh Gradients */}
      <div className="absolute top-[-150px] right-[-150px] w-[600px] h-[600px] bg-[#2D1B69] rounded-full blur-[120px] opacity-45 pointer-events-none z-0"></div>
      <div className="absolute bottom-[-150px] left-[-150px] w-[500px] h-[500px] bg-[#1B3A69] rounded-full blur-[120px] opacity-35 pointer-events-none z-0"></div>
      
      {/* Upper Site Block (with higher z-index to stay on top of gradients) */}
      <div className="space-y-0 relative z-10">
        
        {/* Main Header / Navbar */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          pendingCount={pendingCount}
        />

        {/* Dynamic Tab Swapper */}
        <main className="pb-16">
          {activeTab === 'home' && (
            <div className="space-y-4 sm:space-y-8">
              {/* Core Hero spotlight */}
              <HeroBanner
                film={featuredFilm}
                onPlay={handlePlayFilm}
                isInWatchlist={userProfile.watchlistIds.includes(featuredFilm.id)}
                onToggleWatchlist={handleToggleWatchlist}
              />

              {/* Staggered Rows */}
              <div className="space-y-2">
                <TopTenRow
                  films={films}
                  onPlay={handlePlayFilm}
                  watchlistIds={userProfile.watchlistIds}
                  onToggleWatchlist={handleToggleWatchlist}
                />

                <FilmRow
                  title="Spotlight New Releases"
                  films={newlyAddedFilms}
                  onPlay={handlePlayFilm}
                  watchlistIds={userProfile.watchlistIds}
                  onToggleWatchlist={handleToggleWatchlist}
                />

                <FilmRow
                  title="Human Documentaries"
                  films={documentaryFilms}
                  onPlay={handlePlayFilm}
                  watchlistIds={userProfile.watchlistIds}
                  onToggleWatchlist={handleToggleWatchlist}
                />

                <FilmRow
                  title="Independent Drama Masterworks"
                  films={dramaFilms}
                  onPlay={handlePlayFilm}
                  watchlistIds={userProfile.watchlistIds}
                  onToggleWatchlist={handleToggleWatchlist}
                />

                <FilmRow
                  title="Experimental & Neo-Noir"
                  films={experimentalFilms}
                  onPlay={handlePlayFilm}
                  watchlistIds={userProfile.watchlistIds}
                  onToggleWatchlist={handleToggleWatchlist}
                />
              </div>
            </div>
          )}

          {activeTab === 'browse' && (
            <BrowseCatalog
              films={films}
              onPlay={handlePlayFilm}
              watchlistIds={userProfile.watchlistIds}
              onToggleWatchlist={handleToggleWatchlist}
            />
          )}

          {activeTab === 'hub' && (
            <FilmmakerHub
              onSubmit={handleSubmitSubmission}
              mySubmissions={submissions.filter(s => s.email === userProfile.email)}
            />
          )}

          {activeTab === 'profile' && (
            <ProfilePage
              profile={userProfile}
              films={films}
              onPlay={handlePlayFilm}
              onRemoveFromWatchlist={handleRemoveFromWatchlist}
              onUpdateQuality={handleUpdateQuality}
              selectedQuality={selectedQuality}
            />
          )}

          {activeTab === 'about' && (
            <AboutPage />
          )}

          {activeTab === 'admin' && (
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
              
              {/* Mock Browser Frame */}
              <div className="w-full bg-[#121212] rounded-xl border border-white/10 shadow-2xl overflow-hidden">
                
                {/* Browser Header Bar */}
                <div className="flex items-center justify-between px-4 py-3 bg-[#1A1A1A] border-b border-white/10 select-none">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
                  </div>
                  
                  {/* Address Bar */}
                  <div className="flex-1 max-w-xl mx-4 flex items-center gap-2 bg-black/40 px-3.5 py-1.5 rounded-lg border border-white/5 text-xs text-white/60 font-mono">
                    <Lock className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span className="text-emerald-500/90 font-semibold select-all shrink-0">Secure</span>
                    <span className="text-white/30 shrink-0">|</span>
                    <span className="truncate select-all text-white/80">tpfcinemas.vercel.app/admin</span>
                  </div>

                  {/* Window Action */}
                  <div className="flex items-center gap-3 text-white/40">
                    <RefreshCw className="w-3.5 h-3.5 hover:text-white cursor-pointer transition-colors" />
                  </div>
                </div>

                {/* Simulated Content Area */}
                <div className="bg-[#0c0c0c] min-h-[500px]">
                  {!isAdminUnlocked ? (
                    <div className="max-w-md mx-auto py-16 px-4">
                      <div className="text-center space-y-4">
                        <div className="inline-flex p-4 rounded-full bg-brand-gold/5 border border-brand-gold/10 text-brand-gold">
                          <ShieldCheck className="w-12 h-12" />
                        </div>
                        
                        <div className="space-y-1">
                          <h2 className="text-xl font-serif font-bold text-white">
                            TPF Editorial Console
                          </h2>
                          <p className="text-xs text-white/40 font-mono">
                            VERCEL.APP HOST ROUTE ENCRYPTED
                          </p>
                        </div>

                        <form onSubmit={(e) => {
                          e.preventDefault();
                          if (adminPasswordInput === 'admin123') {
                            setIsAdminUnlocked(true);
                            setAdminError('');
                          } else {
                            setAdminError('Access Denied. Verification keys do not match.');
                          }
                        }} className="space-y-4 pt-4">
                          <div className="space-y-1 text-left">
                            <label className="text-[10px] font-mono uppercase tracking-wider text-white/50">
                              Authentication Passkey
                            </label>
                            <div className="relative">
                              <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                              <input
                                type="password"
                                placeholder="Enter passkey..."
                                value={adminPasswordInput}
                                onChange={(e) => setAdminPasswordInput(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-white/[0.03] border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/20 font-mono"
                              />
                            </div>
                          </div>

                          {adminError && (
                            <p className="text-xs text-brand-red font-mono bg-brand-red/10 border border-brand-red/20 py-2 px-3 rounded-lg flex items-center gap-2">
                              <ShieldAlert className="w-4 h-4 text-brand-red shrink-0" />
                              {adminError}
                            </p>
                          )}

                          <button
                            type="submit"
                            className="w-full py-2.5 bg-brand-gold hover:bg-brand-gold/90 text-[#0D0D0D] font-mono font-bold text-xs tracking-wider rounded-lg transition-all"
                          >
                            VERIFY CREDENTIALS
                          </button>

                          {/* Subtle user convenience guide */}
                          <div className="pt-2 px-4 py-2.5 rounded-lg bg-brand-gold/5 border border-brand-gold/15 text-center">
                            <span className="text-[10.5px] font-mono text-brand-gold font-semibold">
                              🔒 Access Passcode: <span className="underline select-all">admin123</span>
                            </span>
                          </div>
                        </form>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 sm:p-6 relative">
                      {/* Logout option */}
                      <div className="absolute top-4 right-6 z-20">
                        <button
                          onClick={() => {
                            setIsAdminUnlocked(false);
                            setAdminPasswordInput('');
                          }}
                          className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-[10.5px] font-mono font-bold text-white/60 hover:text-white transition-all cursor-pointer"
                        >
                          Lock Console
                        </button>
                      </div>
                      
                      <AdminPanel
                        submissions={submissions}
                        films={films}
                        onApprove={handleApproveSubmission}
                        onReject={handleRejectSubmission}
                        onSetFeatured={handleSetFeaturedFilm}
                        featuredFilmId={featuredFilm.id}
                      />
                    </div>
                  )}
                </div>

              </div>

            </div>
          )}
        </main>

      </div>

      {/* Footer Branding Area */}
      <footer className="relative z-10 bg-white/[0.02] backdrop-blur-md py-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1">
            <span className="text-sm font-serif font-bold text-white tracking-wider">
              TPF <span className="text-brand-gold">CINEMAS</span>
            </span>
            <p className="text-xs text-white/40 font-mono">
              "Every Story Deserves a Screen."
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end text-center md:text-right gap-1 text-[10.5px] font-mono text-white/30">
            <span>Confidential — Tilak Popat Films / TPF Cinemas</span>
            <span>All rights reserved.</span>
            <button
              onClick={() => {
                setActiveTab('admin');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-[10px] text-brand-gold hover:text-white hover:underline transition-all font-bold flex items-center gap-1 mt-1 bg-brand-gold/10 px-2.5 py-1 rounded border border-brand-gold/20"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-brand-gold" />
              Console: tpfcinemas.vercel.app/admin
            </button>
          </div>
        </div>
      </footer>

      {/* Theater Mode Video overlay Modal */}
      {selectedFilm && (
        <FilmPlayerModal
          film={selectedFilm}
          onClose={() => setSelectedFilm(null)}
          onLike={handleLikeFilm}
          allFilms={films}
          onPlayRelated={(relatedFilm) => handlePlayFilm(relatedFilm)}
        />
      )}

    </div>
  );
}
