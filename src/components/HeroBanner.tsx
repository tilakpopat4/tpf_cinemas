import React, { useState, useEffect } from 'react';
import { Play, Plus, Check, Star, Clock, Globe, X, Trophy } from 'lucide-react';
import { Film } from '../types';

interface HeroBannerProps {
  film: Film;
  onPlay: (film: Film) => void;
  isInWatchlist: boolean;
  onToggleWatchlist: (filmId: string) => void;
}

export default function HeroBanner({ film, onPlay, isInWatchlist, onToggleWatchlist }: HeroBannerProps) {
  const [showTrailer, setShowTrailer] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [previewEnded, setPreviewEnded] = useState(false);

  useEffect(() => {
    let timer: any;
    if (showTrailer && timeLeft > 0 && !previewEnded) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setPreviewEnded(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [showTrailer, timeLeft, previewEnded]);

  const handleOpenTrailer = () => {
    setShowTrailer(true);
    setTimeLeft(30);
    setPreviewEnded(false);
  };

  const handleCloseTrailer = () => {
    setShowTrailer(false);
  };

  return (
    <div className="relative w-full h-[70vh] sm:h-[80vh] md:h-[85vh] bg-black overflow-hidden flex items-end">
      
      {/* Background Backdrop Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={film.backdropUrl}
          alt={film.title}
          className="w-full h-full object-cover object-center opacity-70 scale-105 transition-transform duration-10000 ease-out"
          referrerPolicy="no-referrer"
        />
        {/* Cinematic Vignettes and Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D] via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Brand Watermark Overlay */}
      <div className="absolute top-10 right-10 z-10 pointer-events-none hidden lg:block opacity-25">
        <span className="font-mono text-[11px] tracking-[0.5em] text-white uppercase border-r border-brand-gold pr-4 mr-4">
          OFFICIAL SELECTION
        </span>
        <span className="font-mono text-[11px] tracking-[0.5em] text-white uppercase">
          TPF OTT MVP
        </span>
      </div>

      {/* Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-20 w-full animate-fade-in">
        <div className="max-w-3xl">
          
          {/* Spotlight Tag */}
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-brand-red text-white text-[11px] font-mono font-bold tracking-widest px-2.5 py-1 rounded uppercase">
              Spotlight
            </span>
            <span className="text-brand-gold text-xs font-mono font-bold tracking-wider flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-brand-gold" />
              DIRECTOR CHOICE
            </span>
          </div>

          {/* Film Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white tracking-tight leading-tight mb-4">
            {film.title}
          </h1>

          {/* Film Meta Rows */}
          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-white/80 font-medium mb-6">
            <span className="text-brand-gold font-bold">{film.releaseYear}</span>
            <span className="w-1.5 h-1.5 bg-white/30 rounded-full"></span>
            <span className="bg-white/10 px-2 py-0.5 rounded text-white text-xs">{film.genre}</span>
            <span className="w-1.5 h-1.5 bg-white/30 rounded-full"></span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-brand-gold/80" />
              {film.duration}
            </span>
            <span className="w-1.5 h-1.5 bg-white/30 rounded-full"></span>
            <span className="flex items-center gap-1 text-white/90">
              <Globe className="w-4 h-4 text-brand-gold/80" />
              {film.language}
            </span>
          </div>

          {/* Synopsis */}
          <p className="text-base sm:text-lg text-white/70 leading-relaxed font-light mb-8 max-w-2xl line-clamp-3 sm:line-clamp-none">
            {film.synopsis}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              id="hero-play-btn"
              onClick={() => onPlay(film)}
              className="flex items-center gap-2.5 bg-brand-gold hover:bg-brand-gold/90 text-[#0D0D0D] font-bold text-sm sm:text-base px-8 py-3.5 rounded-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-brand-gold/20 cursor-pointer"
            >
              <Play className="w-5 h-5 fill-[#0D0D0D]" />
              <span>Watch Film</span>
            </button>

            <button
              id="hero-trailer-btn"
              onClick={handleOpenTrailer}
              className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/20 font-semibold text-sm sm:text-base px-5 py-3.5 rounded-lg transition-all transform hover:scale-105 active:scale-95 cursor-pointer shadow-md"
            >
              <Play className="w-4 h-4 text-brand-gold fill-brand-gold" />
              <span>Play Trailer</span>
            </button>

            <button
              id="hero-watchlist-btn"
              onClick={() => onToggleWatchlist(film.id)}
              className={`flex items-center gap-2 px-6 py-3.5 rounded-lg font-semibold text-sm sm:text-base border backdrop-blur-xl transition-all ${
                isInWatchlist 
                  ? 'border-brand-gold/40 bg-brand-gold/15 text-brand-gold hover:bg-brand-gold/25' 
                  : 'border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10 text-white'
              }`}
            >
              {isInWatchlist ? (
                <>
                  <Check className="w-5 h-5 text-brand-gold" />
                  <span>On Watchlist</span>
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  <span>Add to List</span>
                </>
              )}
            </button>

            {/* Submitter Note */}
            <div className="text-xs text-white/40 font-mono italic mt-2 sm:mt-0 w-full sm:w-auto">
              Directed by <span className="text-white/70">{film.director}</span>
            </div>
          </div>

        </div>
      </div>

      {/* 30-Second Trailer Preview Modal */}
      {showTrailer && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-3xl glass-panel rounded-2xl shadow-2xl overflow-hidden border border-brand-gold/30 my-8 animate-fade-in">
            
            {/* Header / Close button */}
            <button
              onClick={handleCloseTrailer}
              className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/60 hover:bg-brand-red text-white hover:scale-105 transition-all active:scale-95 cursor-pointer"
              title="Close Preview"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Video Stage / CUTOFF Screen */}
            <div className="relative aspect-video w-full bg-black">
              {!previewEnded ? (
                <>
                  <iframe
                    src={`${film.videoUrl}?autoplay=1&modestbranding=1&rel=0&showinfo=0&controls=0&start=10`}
                    title={`${film.title} - Preview`}
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                  
                  {/* Countdown Timer HUD Overlay */}
                  <div className="absolute top-4 left-4 z-20 flex items-center gap-2.5 bg-black/75 backdrop-blur-md border border-brand-gold/30 px-3.5 py-1.5 rounded-full font-mono text-xs text-white select-none">
                    <span className="w-2 h-2 rounded-full bg-brand-gold animate-ping" />
                    <span className="text-brand-gold font-bold">PREVIEW ACTIVE</span>
                    <span className="text-white/30">|</span>
                    <span className="text-white font-bold">{timeLeft}s remaining</span>
                  </div>
                </>
              ) : (
                /* Concluded Screen */
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-gradient-to-b from-[#0D0D0D]/95 to-black p-6 text-center space-y-6">
                  <div className="w-14 h-14 rounded-full bg-brand-gold/10 text-brand-gold flex items-center justify-center border border-brand-gold/20">
                    <Trophy className="w-7 h-7 animate-bounce" />
                  </div>
                  
                  <div className="space-y-2 max-w-md">
                    <h4 className="text-xl font-serif font-bold text-white">
                      Curated Preview Concluded
                    </h4>
                    <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-light">
                      You've experienced 30 seconds of <strong className="text-white font-medium">"{film.title}"</strong>. Support independent filmmakers by streaming the full 4K high-fidelity master.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => {
                        handleCloseTrailer();
                        onPlay(film);
                      }}
                      className="flex items-center justify-center gap-2 px-6 py-3 bg-brand-gold hover:bg-brand-gold/90 text-[#0D0D0D] font-mono font-bold text-xs uppercase tracking-wider rounded-lg transition-all"
                    >
                      <Play className="w-4 h-4 fill-[#0D0D0D]" />
                      Stream Full Film
                    </button>
                    
                    <button
                      onClick={handleCloseTrailer}
                      className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white font-mono text-xs uppercase tracking-wider rounded-lg transition-all"
                    >
                      Close Preview
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom film metadata */}
            <div className="p-5 sm:p-6 bg-[#0E0E0E] border-t border-white/5 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white font-serif">{film.title}</h4>
                <p className="text-xs text-white/50">Director: {film.director}</p>
              </div>
              <span className="text-[10px] font-mono font-bold px-2.5 py-1 bg-white/5 border border-white/10 text-white/70 uppercase tracking-widest rounded">
                {film.language} • {film.genre}
              </span>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
