import React, { useState } from 'react';
import { User, Heart, Play, Trash2, Clock, CheckCircle2, Sparkles, Tv, ShieldCheck, LogOut, Cloud, RefreshCw } from 'lucide-react';
import { Film, UserProfile } from '../types';

interface ProfilePageProps {
  profile: UserProfile;
  films: Film[];
  onPlay: (film: Film) => void;
  onRemoveFromWatchlist: (filmId: string) => void;
  onUpdateQuality: (quality: string) => void;
  selectedQuality: string;
  firebaseUser: any; // Firebase user object
  onSignInWithGoogle: () => void;
  onSignOut: () => void;
  isSyncing: boolean;
}

export default function ProfilePage({ 
  profile, 
  films, 
  onPlay, 
  onRemoveFromWatchlist, 
  onUpdateQuality,
  selectedQuality,
  firebaseUser,
  onSignInWithGoogle,
  onSignOut,
  isSyncing
}: ProfilePageProps) {
  
  // High-end consumer quality presets matching professional OTT streaming platforms
  const qualityOptions = [
    { quality: 'Auto', resolution: 'Adaptive Stream', useCase: 'Adjusts based on network speeds' },
    { quality: 'High Definition', resolution: '1080p', useCase: 'Pristine detail and spatial sound' },
    { quality: 'Ultra HD', resolution: '4K', useCase: 'Immersive cinema screening experience' },
    { quality: 'Data Saver', resolution: '720p', useCase: 'Reduces bandwidth consumption' },
  ];

  const watchlistFilms = films.filter(f => profile.watchlistIds.includes(f.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 animate-fade-in">
      
      {/* Upper Grid: User Header & Quality Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* User Card with Google Sign-In support */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              {firebaseUser?.photoURL ? (
                <img 
                  src={firebaseUser.photoURL} 
                  alt={profile.name} 
                  className="w-16 h-16 rounded-full border-2 border-brand-gold object-cover shadow-md"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-brand-gold/10 text-brand-gold flex items-center justify-center border border-brand-gold/25 text-2xl font-serif font-bold">
                  {profile.name.charAt(0)}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-serif font-bold text-white truncate">{profile.name}</h2>
                <p className="text-xs text-white/50 truncate">{profile.email}</p>
              </div>
            </div>

            <div className="space-y-2.5 border-t border-white/5 pt-4">
              <div className="flex justify-between text-xs">
                <span className="text-white/40">Status:</span>
                {firebaseUser ? (
                  <span className="text-emerald-400 font-bold font-mono flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    GOOGLE SECURED
                  </span>
                ) : (
                  <span className="text-brand-gold font-bold font-mono">LOCAL VIEWER</span>
                )}
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-white/40">Joined:</span>
                <span className="text-white/70 font-mono">{new Date(profile.joinedDate).toLocaleDateString()}</span>
              </div>
              {firebaseUser && (
                <div className="flex justify-between text-xs">
                  <span className="text-white/40">Sync Status:</span>
                  <span className="text-white/70 font-mono flex items-center gap-1">
                    {isSyncing ? (
                      <>
                        <RefreshCw className="w-3 h-3 text-brand-gold animate-spin" />
                        <span>Syncing...</span>
                      </>
                    ) : (
                      <>
                        <Cloud className="w-3 h-3 text-emerald-400" />
                        <span>Cloud Saved</span>
                      </>
                    )}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-white/5">
            {firebaseUser ? (
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-emerald-500/5 border border-emerald-500/10 text-center space-y-1">
                  <Cloud className="w-5 h-5 text-emerald-400 mx-auto" />
                  <h4 className="text-[11px] font-mono font-bold text-emerald-400 uppercase">Cloud Sync Enabled</h4>
                  <p className="text-[10px] text-white/40 leading-normal font-light">Your screening feed and watchlist are saved continuously to your Google Account.</p>
                </div>
                <button
                  onClick={onSignOut}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-white/5 hover:bg-brand-red/10 border border-white/10 hover:border-brand-red/30 text-white/80 hover:text-brand-red font-mono text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  Disconnect Account
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-brand-gold/5 border border-brand-gold/15 text-center space-y-1">
                  <ShieldCheck className="w-5 h-5 text-brand-gold mx-auto" />
                  <h4 className="text-[11px] font-mono font-bold text-brand-gold uppercase">Cloud Storage Available</h4>
                  <p className="text-[10px] text-white/40 leading-normal font-light">Connect your Google Account to synchronize your curated watchlist and never lose progress.</p>
                </div>
                <button
                  onClick={onSignInWithGoogle}
                  className="w-full flex items-center justify-center gap-2.5 py-3 bg-brand-gold hover:bg-brand-gold/90 text-[#0D0D0D] font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-lg shadow-brand-gold/15"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.24 10.285V13.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.859-3.578-7.859-8s3.53-8 7.859-8c2.46 0 4.105 1.025 5.047 1.926l2.427-2.334C17.955 2.192 15.34 1 12.24 1 5.466 1 0 6.466 0 13.24S5.466 25.48 12.24 25.48c7.073 0 11.79-4.974 11.79-12 0-.814-.08-1.432-.191-2.195H12.24z"/>
                  </svg>
                  Sign In with Google
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Video Quality Settings (Direct from Master Plan) */}
        <div className="lg:col-span-2 glass-panel p-6 sm:p-8 rounded-2xl space-y-6">
          <div className="space-y-1">
            <h3 className="text-lg font-serif font-semibold text-white flex items-center gap-2">
              <Tv className="w-5 h-5 text-brand-gold" />
              Default Video Quality Settings
            </h3>
            <p className="text-xs text-white/40">
              Customize your default streaming delivery quality. Adjustments update your personal buffer parameters dynamically.
            </p>
          </div>

          {/* Quality Cards Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {qualityOptions.map((opt) => {
              const isSelected = selectedQuality === opt.quality;
              return (
                <button
                  key={opt.quality}
                  onClick={() => onUpdateQuality(opt.quality)}
                  className={`p-3.5 rounded-xl border text-left flex flex-col justify-between h-32 transition-all cursor-pointer ${
                    isSelected 
                      ? 'bg-brand-gold/15 border-brand-gold text-brand-gold' 
                      : 'bg-white/[0.03] border-white/5 hover:border-white/15 text-white'
                  }`}
                >
                  <div>
                    <span className="text-[10px] font-mono font-bold block uppercase text-white/40">
                      {opt.resolution}
                    </span>
                    <span className="text-sm font-bold block mt-1 leading-snug">
                      {opt.quality}
                    </span>
                  </div>

                  <div className="space-y-0.5">
                    <span className="text-[9.5px] leading-tight text-white/50 block font-light">
                      {opt.useCase}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="p-3 bg-white/[0.03] backdrop-blur-md rounded-xl border border-white/5 flex items-center justify-between text-xs font-mono text-white/50">
            <span>Selected Streaming Mode:</span>
            <span className="text-brand-gold font-bold">{selectedQuality}</span>
          </div>
        </div>

      </div>

      {/* Watchlist Section */}
      <div className="space-y-6">
        <h3 className="text-xl font-serif font-semibold text-white flex items-center gap-2">
          <Heart className="w-5 h-5 text-brand-red fill-brand-red" />
          My Handpicked Watchlist ({watchlistFilms.length})
        </h3>

        {watchlistFilms.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {watchlistFilms.map((film) => (
              <div
                key={film.id}
                className="relative aspect-[2/3] bg-neutral-900 rounded-[12px] overflow-hidden group border border-white/5"
              >
                <img
                  src={film.posterUrl}
                  alt={film.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-transparent flex flex-col justify-end p-4">
                  <h4 className="text-xs sm:text-sm font-serif font-bold text-white truncate mb-1">
                    {film.title}
                  </h4>
                  <p className="text-[10px] text-white/50 mb-3 truncate">
                    by {film.director}
                  </p>

                  <div className="flex gap-2">
                    <button
                      onClick={() => onPlay(film)}
                      className="flex-1 bg-brand-gold hover:bg-brand-gold/90 text-[#0D0D0D] font-bold text-[10px] sm:text-xs py-2 rounded-md flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Play className="w-3 h-3 fill-[#0D0D0D]" />
                      <span>Watch</span>
                    </button>
                    <button
                      onClick={() => onRemoveFromWatchlist(film.id)}
                      className="p-2 bg-white/5 hover:bg-brand-red text-white hover:text-white rounded-md transition-all cursor-pointer"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-panel py-16 text-center rounded-2xl space-y-4">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto border border-white/5">
              <Heart className="w-5 h-5 text-white/30" />
            </div>
            <p className="text-sm text-white/40 max-w-sm mx-auto leading-relaxed">
              Your watchlist is currently clear. Browse the Cinema Hall catalog to find films that move you.
            </p>
          </div>
        )}
      </div>

      {/* Simulated Watch History */}
      <div className="space-y-6">
        <h3 className="text-xl font-serif font-semibold text-white flex items-center gap-2">
          <Clock className="w-5 h-5 text-brand-gold" />
          Watch History
        </h3>

        {profile.watchHistory.length > 0 ? (
          <div className="glass-panel rounded-2xl overflow-hidden divide-y divide-white/5">
            {profile.watchHistory.map((history) => {
              const matchedFilm = films.find(f => f.id === history.filmId);
              if (!matchedFilm) return null;
              return (
                <div key={history.filmId} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4 min-w-0 flex-1">
                    <div className="w-12 h-16 bg-neutral-800 rounded overflow-hidden flex-none border border-white/10 shadow-inner">
                      <img src={matchedFilm.posterUrl} alt={matchedFilm.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="min-w-0 flex-1 space-y-1.5">
                      <h4 className="text-sm font-bold text-white truncate">{matchedFilm.title}</h4>
                      <p className="text-xs text-white/50">{matchedFilm.director} • {matchedFilm.language}</p>
                      
                      {/* Mobile Progress Bar (visible on mobile only) */}
                      <div className="block sm:hidden w-full max-w-xs pt-1">
                        <div className="flex justify-between text-[10px] font-mono text-white/40 mb-1">
                          <span>Progress</span>
                          <span className="text-brand-gold font-bold">{history.progressPercent}%</span>
                        </div>
                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-brand-gold to-yellow-500 rounded-full transition-all duration-500" 
                            style={{ width: `${history.progressPercent}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 sm:gap-6 justify-between sm:justify-end">
                    {/* Desktop Progress Bar (visible on tablet/desktop) */}
                    <div className="hidden sm:block w-44">
                      <div className="flex justify-between text-[10px] font-mono text-white/40 mb-1">
                        <span>Progress</span>
                        <span className="text-brand-gold font-bold">{history.progressPercent}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-brand-gold to-yellow-500 rounded-full transition-all duration-500" 
                          style={{ width: `${history.progressPercent}%` }}
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => onPlay(matchedFilm)}
                      className="px-4 py-1.5 bg-brand-gold/10 hover:bg-brand-gold text-brand-gold hover:text-[#0D0D0D] text-xs font-mono font-bold border border-brand-gold/20 rounded-md transition-all duration-300 cursor-pointer shadow-sm hover:shadow-brand-gold/5"
                    >
                      Resume
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-10 glass-panel rounded-2xl text-xs text-white/40">
            You haven't watched any films in this session yet.
          </div>
        )}
      </div>

    </div>
  );
}
