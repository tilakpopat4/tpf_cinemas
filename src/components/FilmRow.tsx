import React, { useRef } from 'react';
import { Play, ChevronLeft, ChevronRight, Star, Heart } from 'lucide-react';
import { Film } from '../types';

interface FilmRowProps {
  title: string;
  films: Film[];
  onPlay: (film: Film) => void;
  watchlistIds: string[];
  onToggleWatchlist: (filmId: string) => void;
}

export default function FilmRow({ title, films, onPlay, watchlistIds, onToggleWatchlist }: FilmRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth * 0.75 
        : scrollLeft + clientWidth * 0.75;
      
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  if (films.length === 0) return null;

  return (
    <div className="relative py-6 sm:py-8 group/row">
      
      {/* Category Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 flex justify-between items-end">
        <h2 className="text-xl sm:text-2xl font-serif font-semibold tracking-wide text-white flex items-center gap-2">
          <span className="w-1.5 h-6 bg-[#8B1A1A] rounded-full"></span>
          {title}
        </h2>
        <span className="text-xs font-mono text-brand-gold hover:underline cursor-pointer">
          View All ({films.length})
        </span>
      </div>

      {/* Row Wrapper */}
      <div className="relative w-full overflow-hidden">
        
        {/* Left Scroll Button */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-30 h-[85%] w-12 bg-black/60 hover:bg-black/95 text-white flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity duration-300 border-r border-white/5 cursor-pointer"
        >
          <ChevronLeft className="w-8 h-8 hover:scale-110 transition-transform" />
        </button>

        {/* Right Scroll Button */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-30 h-[85%] w-12 bg-black/60 hover:bg-black/95 text-white flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity duration-300 border-l border-white/5 cursor-pointer"
        >
          <ChevronRight className="w-8 h-8 hover:scale-110 transition-transform" />
        </button>

        {/* Scrollable Container */}
        <div
          ref={rowRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth px-4 sm:px-8 lg:px-16 py-4"
        >
          {films.map((film) => {
            const isSaved = watchlistIds.includes(film.id);
            return (
              <div
                key={film.id}
                className="relative flex-none w-[160px] sm:w-[220px] aspect-[2/3] bg-neutral-900 rounded-[12px] overflow-hidden group cursor-pointer shadow-lg hover:shadow-brand-gold/10 transition-all duration-300 transform hover:scale-105"
                onClick={() => onPlay(film)}
              >
                
                {/* Poster Image */}
                <img
                  src={film.posterUrl}
                  alt={film.title}
                  className="w-full h-full object-cover rounded-[12px] transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />

                {/* Badges Overlay */}
                <div className="absolute top-2.5 left-2.5 z-20 flex flex-col gap-1.5 pointer-events-none">
                  {film.isNew && (
                    <span className="bg-brand-red text-white text-[9px] font-mono font-bold uppercase tracking-widest px-1.5 py-0.5 rounded">
                      NEW
                    </span>
                  )}
                  {film.releaseYear === 2025 && (
                    <span className="bg-white/[0.04] backdrop-blur-sm text-brand-gold text-[9px] font-mono font-bold tracking-widest px-1.5 py-0.5 rounded border border-brand-gold/20">
                      2025
                    </span>
                  )}
                </div>

                {/* Watchlist Toggle Overlay inside card */}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Avoid playing movie on click
                    onToggleWatchlist(film.id);
                  }}
                  className="absolute top-2.5 right-2.5 z-20 w-8 h-8 rounded-full bg-black/60 hover:bg-brand-red text-white flex items-center justify-center backdrop-blur-sm transition-all active:scale-90"
                  title={isSaved ? "Remove from Watchlist" : "Add to Watchlist"}
                >
                  <Heart className={`w-4 h-4 ${isSaved ? 'fill-brand-gold text-brand-gold' : 'text-white'}`} />
                </button>

                {/* Hover Details Panel Overlay */}
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/80 to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  
                  {/* Floating Action Button */}
                  <div className="mb-2 self-start p-2 rounded-full bg-brand-gold text-[#0D0D0D] shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <Play className="w-5 h-5 fill-[#0D0D0D]" />
                  </div>

                  <h3 className="text-sm sm:text-base font-serif font-bold text-white tracking-tight leading-snug line-clamp-1 mb-1">
                    {film.title}
                  </h3>
                  
                  <p className="text-[11px] text-white/55 font-sans leading-none mb-2">
                    by {film.director}
                  </p>

                  <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono text-white/80 border-t border-white/10 pt-2">
                    <span className="text-brand-gold">{film.language}</span>
                    <span className="text-white/30">•</span>
                    <span>{film.duration}</span>
                  </div>

                  <div className="text-[9px] font-mono text-white/40 mt-1 line-clamp-2">
                    {film.synopsis}
                  </div>

                </div>

              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
