import React, { useState, useEffect } from 'react';
import { X, Heart, Star, Clock, Globe, User, Eye, Share2, HelpCircle } from 'lucide-react';
import { Film } from '../types';

interface FilmPlayerModalProps {
  film: Film | null;
  onClose: () => void;
  onLike: (filmId: string) => void;
  allFilms: Film[];
  onPlayRelated: (film: Film) => void;
}

export default function FilmPlayerModal({ film, onClose, onLike, allFilms, onPlayRelated }: FilmPlayerModalProps) {
  const [copied, setCopied] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);
  const [liveViewCount, setLiveViewCount] = useState(0);

  useEffect(() => {
    if (film) {
      setHasLiked(false);
      // Simulate slightly updated views when playing
      setLiveViewCount(film.views + 1);
    }
  }, [film]);

  if (!film) return null;

  // Find related films (exclude active, match genre/language)
  const relatedFilms = allFilms
    .filter(f => f.id !== film.id)
    .filter(f => f.genre === film.genre || f.language === film.language)
    .slice(0, 3);

  // Fallback to any other films if list is empty
  const recommendations = relatedFilms.length > 0 
    ? relatedFilms 
    : allFilms.filter(f => f.id !== film.id).slice(0, 3);

  const handleShare = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLikeClick = () => {
    if (!hasLiked) {
      onLike(film.id);
      setLiveViewCount(prev => prev + 1);
      setHasLiked(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="relative w-full max-w-5xl glass-panel rounded-2xl shadow-2xl overflow-hidden my-8 animate-fade-in">
        
        {/* Header Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-black/60 hover:bg-brand-red text-white hover:scale-105 transition-all active:scale-95 cursor-pointer"
          title="Close Theater"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Embedded Video Stage */}
        <div className="relative aspect-video w-full bg-black border-b border-white/5">
          <iframe
            src={`${film.videoUrl}?autoplay=1&modestbranding=1&rel=0&showinfo=0`}
            title={film.title}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Metadata Details Split */}
        <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Film Info (Col 1 & 2) */}
          <div className="lg:col-span-2 space-y-6">
            
            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-brand-gold/10 text-brand-gold text-xs font-mono font-bold tracking-wider px-2.5 py-1 rounded border border-brand-gold/20 uppercase">
                ★ Year {film.releaseYear}
              </span>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
                {film.title}
              </h2>
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-white/50">
                <span className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-brand-gold" />
                  Director: <span className="text-white/80">{film.director}</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-brand-gold" />
                  {film.duration}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-brand-gold" />
                  {film.language}
                </span>
              </div>
            </div>

            {/* Synopsis */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono text-white/40 uppercase tracking-widest">
                Synopsis
              </h4>
              <p className="text-white/80 font-light leading-relaxed text-sm sm:text-base">
                {film.synopsis}
              </p>
            </div>

            {/* Interaction Utility Bar */}
            <div className="flex flex-wrap gap-3 items-center pt-4 border-t border-white/5">
              
              <button
                onClick={handleLikeClick}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-bold border transition-all ${
                  hasLiked 
                    ? 'bg-brand-red/10 border-brand-red text-brand-red' 
                    : 'bg-white/5 border-white/10 hover:border-white/30 text-white/80'
                }`}
              >
                <Heart className={`w-4 h-4 ${hasLiked ? 'fill-brand-red' : ''}`} />
                <span>{hasLiked ? 'Liked!' : 'Appreciate Film'}</span>
              </button>

              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-bold bg-white/5 border border-white/10 hover:border-white/30 text-white/80 transition-all"
              >
                <Share2 className="w-4 h-4" />
                <span>{copied ? 'Copied Link!' : 'Share Film'}</span>
              </button>

              <div className="ml-auto flex items-center gap-4 text-xs font-mono text-white/40">
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4 text-brand-gold/60" />
                  {liveViewCount} Streams
                </span>
              </div>

            </div>

            {/* Director Bio Card */}
            {film.directorBio && (
              <div className="bg-[#1C1C1C] p-4 sm:p-5 rounded-xl border border-white/5 space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-brand-gold/10 text-brand-gold flex items-center justify-center border border-brand-gold/20">
                    <User className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-mono font-bold text-brand-gold uppercase tracking-wider">
                    About the Filmmaker
                  </h4>
                </div>
                <p className="text-xs text-white/70 leading-relaxed italic">
                  "{film.directorBio}"
                </p>
                <div className="text-[10px] text-white/40 font-mono">
                  Supported by Tilak Popat Films indie accelerator network.
                </div>
              </div>
            )}

          </div>

          {/* Side Recommended Queue (Col 3) */}
          <div className="space-y-6 lg:border-l lg:border-white/5 lg:pl-6">
            <div>
              <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <Star className="w-4 h-4 text-brand-gold fill-brand-gold" />
                You May Also Like
              </h3>
              
              <div className="space-y-4">
                {recommendations.map((rec) => (
                  <div
                    key={rec.id}
                    onClick={() => onPlayRelated(rec)}
                    className="flex gap-3 bg-white/5 hover:bg-white/10 p-2.5 rounded-lg border border-white/5 hover:border-brand-gold/20 cursor-pointer transition-all group"
                  >
                    {/* Thumbnail */}
                    <div className="w-16 aspect-[2/3] rounded overflow-hidden flex-none bg-neutral-800">
                      <img
                        src={rec.posterUrl}
                        alt={rec.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    
                    {/* Tiny Metadata */}
                    <div className="flex flex-col justify-between py-1 min-w-0">
                      <div>
                        <h4 className="text-xs font-bold text-white group-hover:text-brand-gold transition-colors truncate">
                          {rec.title}
                        </h4>
                        <p className="text-[10px] text-white/50 truncate">
                          {rec.director}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-1.5 text-[10px] font-mono text-brand-gold">
                        <span>{rec.language}</span>
                        <span className="text-white/20">•</span>
                        <span className="text-white/60">{rec.duration}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Storage Strategy Educational Tip */}
            <div className="bg-[#1C1C1C]/60 p-4 rounded-xl border border-brand-gold/10">
              <div className="flex items-start gap-2.5">
                <HelpCircle className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h5 className="text-xs font-mono font-bold text-brand-gold uppercase">
                    3-Tier Storage Engine
                  </h5>
                  <p className="text-[10.5px] text-white/60 leading-relaxed">
                    This video is loaded directly from a private CDN network utilizing the MVP <strong>YouTube Unlisted</strong> storage architecture. Unlimited delivery with adaptive 4K bandwidth, fully white-labeled.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
