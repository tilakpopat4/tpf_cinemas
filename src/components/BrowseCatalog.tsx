import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Play, Sparkles, RefreshCw, Star } from 'lucide-react';
import { Film } from '../types';

interface BrowseCatalogProps {
  films: Film[];
  onPlay: (film: Film) => void;
  watchlistIds: string[];
  onToggleWatchlist: (filmId: string) => void;
}

export default function BrowseCatalog({ films, onPlay, watchlistIds, onToggleWatchlist }: BrowseCatalogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [selectedDuration, setSelectedDuration] = useState('All');

  // Dynamically extract unique genres and languages from existing catalog to be bulletproof
  const genres = useMemo(() => {
    const list = new Set(films.map(f => f.genre));
    return ['All', ...Array.from(list)];
  }, [films]);

  const languages = useMemo(() => {
    const list = new Set(films.map(f => f.language));
    return ['All', ...Array.from(list)];
  }, [films]);

  const durations = ['All', 'Under 20 Mins', '20 - 40 Mins', 'Over 40 Mins'];

  // Filter Logic
  const filteredFilms = useMemo(() => {
    return films.filter((film) => {
      // Search matches Title, Director, or Synopsis
      const matchesSearch = 
        film.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        film.director.toLowerCase().includes(searchQuery.toLowerCase()) ||
        film.synopsis.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesGenre = selectedGenre === 'All' || film.genre === selectedGenre;
      const matchesLanguage = selectedLanguage === 'All' || film.language === selectedLanguage;
      
      // Parse duration to minutes number
      const minutes = parseInt(film.duration);
      let matchesDuration = true;
      if (selectedDuration === 'Under 20 Mins') {
        matchesDuration = minutes < 20;
      } else if (selectedDuration === '20 - 40 Mins') {
        matchesDuration = minutes >= 20 && minutes <= 40;
      } else if (selectedDuration === 'Over 40 Mins') {
        matchesDuration = minutes > 40;
      }

      return matchesSearch && matchesGenre && matchesLanguage && matchesDuration;
    });
  }, [films, searchQuery, selectedGenre, selectedLanguage, selectedDuration]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedGenre('All');
    setSelectedLanguage('All');
    setSelectedDuration('All');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in">
      
      {/* Editorial Header */}
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
          The Indie <span className="text-brand-gold">Vault</span>
        </h1>
        <p className="text-sm sm:text-base text-white/50 max-w-2xl font-light">
          Filter through authentic storytelling spanning multiple Indian languages, regional subcultures, and cinematic styles. No filters of mainstream gatekeepers.
        </p>
      </div>

      {/* Filter and Search Bar Container */}
      <div className="glass-panel p-5 sm:p-6 rounded-2xl space-y-6">
        
        {/* Row 1: Search & Reset */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              id="catalog-search"
              placeholder="Search by film title, director name, keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/[0.03] backdrop-blur-md border border-white/10 focus:border-brand-gold rounded-xl py-3.5 pl-12 pr-4 text-white text-sm placeholder-white/30 focus:outline-none transition-all"
            />
          </div>

          <button
            onClick={resetFilters}
            className="px-5 py-3.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl text-sm font-semibold tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <RefreshCw className="w-4 h-4 text-brand-gold" />
            <span>Reset Filters</span>
          </button>
        </div>

        {/* Row 2: Filter Options */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-2">
          
          {/* Genre Selection */}
          <div className="space-y-2">
            <label className="text-[11px] font-mono font-bold text-white/40 uppercase tracking-widest block">
              Genre
            </label>
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="w-full bg-neutral-900/90 border border-white/10 focus:border-brand-gold text-white text-sm rounded-xl px-4 py-3 focus:outline-none cursor-pointer"
            >
              {genres.map(g => (
                <option key={g} value={g} className="bg-neutral-900">{g}</option>
              ))}
            </select>
          </div>

          {/* Language Selection */}
          <div className="space-y-2">
            <label className="text-[11px] font-mono font-bold text-white/40 uppercase tracking-widest block">
              Language
            </label>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full bg-neutral-900/90 border border-white/10 focus:border-brand-gold text-white text-sm rounded-xl px-4 py-3 focus:outline-none cursor-pointer"
            >
              {languages.map(l => (
                <option key={l} value={l} className="bg-neutral-900">{l}</option>
              ))}
            </select>
          </div>

          {/* Duration Selection */}
          <div className="space-y-2">
            <label className="text-[11px] font-mono font-bold text-white/40 uppercase tracking-widest block">
              Duration Bracket
            </label>
            <select
              value={selectedDuration}
              onChange={(e) => setSelectedDuration(e.target.value)}
              className="w-full bg-neutral-900/90 border border-white/10 focus:border-brand-gold text-white text-sm rounded-xl px-4 py-3 focus:outline-none cursor-pointer"
            >
              {durations.map(d => (
                <option key={d} value={d} className="bg-neutral-900">{d}</option>
              ))}
            </select>
          </div>

        </div>

      </div>

      {/* Grid List View */}
      {filteredFilms.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {filteredFilms.map((film) => (
            <div
              key={film.id}
              onClick={() => onPlay(film)}
              className="relative aspect-[2/3] bg-neutral-900 rounded-[12px] overflow-hidden group cursor-pointer shadow-md border border-white/5 hover:border-brand-gold/30 hover:shadow-brand-gold/5 transition-all duration-300 transform hover:scale-105"
            >
              
              {/* Poster Image */}
              <img
                src={film.posterUrl}
                alt={film.title}
                className="w-full h-full object-cover rounded-[12px] transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
                referrerPolicy="no-referrer"
              />

              {/* Poster badge tags */}
              <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1 pointer-events-none">
                {film.isNew && (
                  <span className="bg-brand-red text-white text-[8px] sm:text-[9px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded">
                    NEW
                  </span>
                )}
                <span className="bg-black/75 text-brand-gold text-[8px] sm:text-[9px] font-mono px-1.5 py-0.5 rounded border border-brand-gold/15">
                  {film.language}
                </span>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                
                {/* Micro CTA play */}
                <div className="mb-2 self-start p-1.5 rounded-full bg-brand-gold text-[#0D0D0D] shadow">
                  <Play className="w-4 h-4 fill-[#0D0D0D]" />
                </div>

                <h3 className="text-xs sm:text-sm font-serif font-bold text-white tracking-tight leading-snug line-clamp-1">
                  {film.title}
                </h3>
                
                <p className="text-[10px] text-white/55 mb-1.5">
                  {film.director}
                </p>

                <div className="flex items-center gap-2 text-[9px] sm:text-[10px] font-mono text-brand-gold border-t border-white/10 pt-1.5">
                  <span>{film.genre}</span>
                  <span className="text-white/20">•</span>
                  <span>{film.duration}</span>
                </div>

              </div>

            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="py-20 text-center space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto border border-white/10">
            <SlidersHorizontal className="w-6 h-6 text-brand-gold/60" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-serif font-bold text-white">
              No Films Unlocked
            </h3>
            <p className="text-sm text-white/45">
              We couldn't find any indie selections fitting those specific parameters. Try clearing some filters.
            </p>
          </div>
          <button
            onClick={resetFilters}
            className="px-4 py-2 text-xs font-mono font-bold text-[#0D0D0D] bg-brand-gold rounded-lg hover:bg-brand-gold/90 transition-all cursor-pointer"
          >
            Show All Films
          </button>
        </div>
      )}

    </div>
  );
}
