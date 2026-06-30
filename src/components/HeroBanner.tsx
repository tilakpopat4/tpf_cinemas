import React from 'react';
import { Play, Plus, Check, Star, Clock, Globe } from 'lucide-react';
import { Film } from '../types';

interface HeroBannerProps {
  film: Film;
  onPlay: (film: Film) => void;
  isInWatchlist: boolean;
  onToggleWatchlist: (filmId: string) => void;
}

export default function HeroBanner({ film, onPlay, isInWatchlist, onToggleWatchlist }: HeroBannerProps) {
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
    </div>
  );
}
