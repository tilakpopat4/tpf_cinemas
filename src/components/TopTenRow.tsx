import React, { useRef } from 'react';
import { Play, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { Film } from '../types';

interface TopTenRowProps {
  films: Film[];
  onPlay: (film: Film) => void;
  watchlistIds: string[];
  onToggleWatchlist: (filmId: string) => void;
}

export default function TopTenRow({ films, onPlay, watchlistIds, onToggleWatchlist }: TopTenRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);

  // Sort by views descending and take the top 10
  const topTenFilms = [...films]
    .sort((a, b) => b.views - a.views)
    .slice(0, 10);

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth * 0.75 
        : scrollLeft + clientWidth * 0.75;
      
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  if (topTenFilms.length === 0) return null;

  return (
    <div className="relative py-6 sm:py-8 group/row">
      
      {/* Category Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 flex justify-between items-end">
        <h2 className="text-xl sm:text-2xl font-serif font-bold tracking-wide text-white flex items-center gap-2">
          <span className="w-1.5 h-6 bg-brand-gold rounded-full"></span>
          Top 10 Most Watched in India
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-brand-gold/10 text-brand-gold border border-brand-gold/20 font-bold uppercase tracking-wider">
            Live Rankings
          </span>
        </h2>
      </div>

      {/* Row Wrapper */}
      <div className="relative w-full overflow-hidden">
        
        {/* Left Scroll Button */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-30 h-[85%] w-12 bg-black/70 hover:bg-black/95 text-white flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity duration-300 border-r border-white/5 cursor-pointer"
        >
          <ChevronLeft className="w-8 h-8 hover:scale-110 transition-transform" />
        </button>

        {/* Right Scroll Button */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-30 h-[85%] w-12 bg-black/70 hover:bg-black/95 text-white flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity duration-300 border-l border-white/5 cursor-pointer"
        >
          <ChevronRight className="w-8 h-8 hover:scale-110 transition-transform" />
        </button>

        {/* Scrollable Container */}
        <div
          ref={rowRef}
          className="flex gap-10 sm:gap-14 overflow-x-auto no-scrollbar scroll-smooth px-8 sm:px-16 lg:px-24 py-6"
        >
          {topTenFilms.map((film, index) => {
            const isSaved = watchlistIds.includes(film.id);
            const isSeries = film.type === 'series';
            
            return (
              <div
                key={film.id}
                className="relative flex-none w-[150px] sm:w-[210px] aspect-[2/3] group cursor-pointer"
                onClick={() => onPlay(film)}
              >
                {/* Netflix-style Large Hollow Rank Number */}
                <span 
                  className="absolute -left-7 sm:-left-12 bottom-[-16px] sm:bottom-[-28px] text-[100px] sm:text-[160px] font-black leading-none font-sans select-none z-10 text-[#0c0c0c]/90 drop-shadow-[0_8px_16px_rgba(0,0,0,0.9)]" 
                  style={{ 
                    WebkitTextStroke: '2px rgba(201, 168, 76, 0.75)',
                    fontFamily: 'Inter, system-ui, sans-serif'
                  }}
                >
                  {index + 1}
                </span>

                {/* Main Card Container */}
                <div className="relative w-full h-full bg-neutral-900 rounded-[12px] overflow-hidden shadow-2xl hover:shadow-brand-gold/15 transition-all duration-300 transform hover:scale-105 border border-white/5 group-hover:border-brand-gold/30">
                  
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
                    {isSeries ? (
                      <span className="bg-brand-gold text-[#0D0D0D] text-[9px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded">
                        SERIES
                      </span>
                    ) : (
                      <span className="bg-[#8B1A1A] text-white text-[9px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded">
                        MOVIE
                      </span>
                    )}
                    {film.isNew && (
                      <span className="bg-white/10 backdrop-blur-md text-white text-[9px] font-mono font-bold uppercase tracking-widest px-1.5 py-0.5 rounded border border-white/10">
                        NEW
                      </span>
                    )}
                  </div>

                  {/* Watchlist Toggle Overlay inside card */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Avoid playing movie on click
                      onToggleWatchlist(film.id);
                    }}
                    className="absolute top-2.5 right-2.5 z-20 w-8 h-8 rounded-full bg-black/60 hover:bg-[#8B1A1A] text-white flex items-center justify-center backdrop-blur-sm transition-all active:scale-90"
                    title={isSaved ? "Remove from Watchlist" : "Add to Watchlist"}
                  >
                    <Heart className={`w-4 h-4 ${isSaved ? 'fill-brand-gold text-brand-gold' : 'text-white'}`} />
                  </button>

                  {/* Hover Details Panel Overlay */}
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/85 to-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    
                    {/* Floating Action Button */}
                    <div className="mb-2.5 self-start p-2 rounded-full bg-brand-gold text-[#0D0D0D] shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      <Play className="w-4 h-4 fill-[#0D0D0D]" />
                    </div>

                    <h3 className="text-xs sm:text-sm font-serif font-bold text-white tracking-tight leading-snug line-clamp-1 mb-0.5">
                      {film.title}
                    </h3>
                    
                    <p className="text-[10px] text-white/55 font-sans leading-none mb-1.5">
                      by {film.director}
                    </p>

                    <div className="flex items-center gap-2 text-[9.5px] font-mono text-white/80 border-t border-white/10 pt-1.5">
                      <span className="text-brand-gold">{film.language}</span>
                      <span className="text-white/30">•</span>
                      <span>{film.duration}</span>
                    </div>

                    <div className="text-[9px] font-mono text-white/40 mt-1 line-clamp-2">
                      {film.synopsis}
                    </div>

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
