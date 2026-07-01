import React, { useState } from 'react';
import { Send, CheckCircle, FileText, Sparkles, BookOpen, Clock, AlertCircle } from 'lucide-react';
import { Submission } from '../types';

interface ApplyPortalProps {
  onSubmit: (submission: Omit<Submission, 'id' | 'status' | 'submittedAt'>) => void;
  onNavigateToHub: () => void;
}

export default function ApplyPortal({ onSubmit, onNavigateToHub }: ApplyPortalProps) {
  const [filmTitle, setFilmTitle] = useState('');
  const [synopsis, setSynopsis] = useState('');
  const [directorName, setDirectorName] = useState('');
  const [duration, setDuration] = useState('');
  const [language, setLanguage] = useState('Hindi');
  const [genre, setGenre] = useState('Drama');
  const [videoLink, setVideoLink] = useState('');
  const [email, setEmail] = useState('');
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!filmTitle || !synopsis || !directorName || !duration || !videoLink || !email) {
      alert('Please fill out all required fields.');
      return;
    }

    // Submit up to App state
    onSubmit({
      filmTitle,
      synopsis,
      directorName,
      duration,
      language,
      genre,
      videoLink,
      email,
    });

    // Clear form
    setFilmTitle('');
    setSynopsis('');
    setDirectorName('');
    setDuration('');
    setVideoLink('');
    setEmail('');

    // Trigger success panel
    setSubmittedId('success-sub');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-fade-in">
      
      {/* Page Header */}
      <div className="text-center space-y-3">
        <span className="text-[10px] font-mono font-bold text-brand-gold tracking-[0.3em] uppercase bg-brand-gold/10 px-3 py-1 rounded-full border border-brand-gold/20 inline-block">
          Official Entry Portal
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
          Submit Your <span className="text-brand-gold">Masterpiece</span>
        </h1>
        <p className="text-xs sm:text-sm text-white/50 max-w-2xl mx-auto leading-relaxed font-light">
          Your creative journey deserves an authentic showcase. Fill out the screening package details below. Our editorial board reviews all entries.
        </p>
      </div>

      <div className="glass-panel p-6 sm:p-10 rounded-2xl relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none"></div>
        
        {submittedId ? (
          /* Submission Success View */
          <div className="space-y-8 text-center py-6 animate-fade-in">
            <div className="w-20 h-20 bg-brand-gold/10 text-brand-gold rounded-full flex items-center justify-center mx-auto border border-brand-gold/20 shadow-xl shadow-brand-gold/5">
              <CheckCircle className="w-12 h-12" />
            </div>
            
            <div className="space-y-3">
              <h3 className="text-2xl font-serif font-bold text-white">
                Film Successfully Submitted!
              </h3>
              <p className="text-sm text-white/60 max-w-lg mx-auto leading-relaxed font-light">
                Your screening package has been securely logged. A confirmation email has been dispatched via our simulated SMTP server.
              </p>
            </div>

            {/* Simulated Live Tracker in success pane */}
            <div className="bg-white/[0.02] backdrop-blur-md p-6 rounded-xl border border-white/5 text-left max-w-md mx-auto space-y-4">
              <h4 className="text-[10px] font-mono font-bold text-white/40 uppercase tracking-widest border-b border-white/5 pb-2">
                Live Screening Status Tracker
              </h4>
              
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-5 h-5 rounded-full bg-brand-gold text-[#0D0D0D] text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white">1. Submission Filed</h5>
                    <p className="text-[10px] text-white/50">Logged and queued on TPF review backlog.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-5 h-5 rounded-full bg-white/10 border border-white/20 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 animate-pulse">
                    2
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white/60">2. Review Desk Screening</h5>
                    <p className="text-[10px] text-white/40">Editorial team evaluates narrative, core theme, and aesthetics.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10 text-white/30 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white/30">3. Decision & Dispatch</h5>
                    <p className="text-[10px] text-white/30">Feedback is emailed to your contact address.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6 flex flex-col sm:flex-row justify-center gap-4">
              <button
                type="button"
                onClick={onNavigateToHub}
                className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-xl text-xs font-mono uppercase tracking-wider transition-all cursor-pointer"
              >
                Track Status in Hub
              </button>
              <button
                type="button"
                onClick={() => setSubmittedId(null)}
                className="px-6 py-3 bg-brand-gold text-[#0D0D0D] font-bold rounded-xl text-xs font-mono uppercase tracking-wider hover:bg-brand-gold/90 transition-all cursor-pointer shadow-lg shadow-brand-gold/15"
              >
                Submit Another Film
              </button>
            </div>
          </div>
        ) : (
          /* Submission Form */
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="border-b border-white/5 pb-4">
              <h3 className="text-lg font-serif font-semibold text-white">
                Direct Screening Application
              </h3>
              <p className="text-xs text-white/40 mt-1">
                All fields marked with an asterisk (*) are mandatory.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Title */}
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-white/60 uppercase">
                  Film Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vazhiyoram"
                  value={filmTitle}
                  onChange={(e) => setFilmTitle(e.target.value)}
                  className="w-full bg-white/[0.02] border border-white/10 focus:border-brand-gold text-white text-sm rounded-xl px-4 py-3 focus:outline-none transition-all focus:bg-white/[0.04]"
                />
              </div>

              {/* Director */}
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-white/60 uppercase">
                  Director Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Anandhu Radhakrishnan"
                  value={directorName}
                  onChange={(e) => setDirectorName(e.target.value)}
                  className="w-full bg-white/[0.02] border border-white/10 focus:border-brand-gold text-white text-sm rounded-xl px-4 py-3 focus:outline-none transition-all focus:bg-white/[0.04]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Duration */}
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-white/60 uppercase">
                  Duration *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 24 mins"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full bg-white/[0.02] border border-white/10 focus:border-brand-gold text-white text-sm rounded-xl px-4 py-3 focus:outline-none transition-all focus:bg-white/[0.04]"
                />
              </div>

              {/* Language */}
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-white/60 uppercase">
                  Language *
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full bg-[#0D0D0D] border border-white/10 focus:border-brand-gold text-white text-sm rounded-xl px-4 py-3 focus:outline-none transition-all cursor-pointer"
                >
                  <option value="Hindi">Hindi</option>
                  <option value="Malayalam">Malayalam</option>
                  <option value="Bengali">Bengali</option>
                  <option value="Tamil">Tamil</option>
                  <option value="English">English</option>
                  <option value="Kannada">Kannada</option>
                  <option value="Marathi">Marathi</option>
                </select>
              </div>

              {/* Genre */}
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-white/60 uppercase">
                  Genre *
                </label>
                <select
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  className="w-full bg-[#0D0D0D] border border-white/10 focus:border-brand-gold text-white text-sm rounded-xl px-4 py-3 focus:outline-none transition-all cursor-pointer"
                >
                  <option value="Drama">Drama</option>
                  <option value="Thriller">Thriller</option>
                  <option value="Documentary">Documentary</option>
                  <option value="Experimental">Experimental</option>
                  <option value="Comedy">Comedy</option>
                </select>
              </div>
            </div>

            {/* Video Link */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-white/60 uppercase block">
                Video File / Streaming link *
              </label>
              <input
                type="url"
                required
                placeholder="Paste YouTube Unlisted, Google Drive, or WeTransfer URL"
                value={videoLink}
                onChange={(e) => setVideoLink(e.target.value)}
                className="w-full bg-white/[0.02] border border-white/10 focus:border-brand-gold text-white text-sm rounded-xl px-4 py-3 focus:outline-none transition-all focus:bg-white/[0.04]"
              />
              <span className="text-[10px] text-white/30 italic font-mono block">
                ★ Pro Tip: YouTube Unlisted is highly recommended for stable review screening.
              </span>
            </div>

            {/* Synopsis */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-white/60 uppercase">
                Synopsis *
              </label>
              <textarea
                required
                rows={5}
                placeholder="Describe your film's narrative core, creative theme, and character motivation..."
                value={synopsis}
                onChange={(e) => setSynopsis(e.target.value)}
                className="w-full bg-white/[0.02] border border-white/10 focus:border-brand-gold text-white text-sm rounded-xl px-4 py-3 focus:outline-none resize-none transition-all focus:bg-white/[0.04]"
              />
            </div>

            {/* Contact Email */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-white/60 uppercase">
                Contact Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="director@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/[0.02] border border-white/10 focus:border-brand-gold text-white text-sm rounded-xl px-4 py-3 focus:outline-none transition-all focus:bg-white/[0.04]"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2.5 bg-brand-gold hover:bg-brand-gold/90 text-[#0D0D0D] font-mono font-bold py-4 rounded-xl transition-all transform hover:scale-[1.01] cursor-pointer shadow-lg shadow-brand-gold/15 active:scale-95"
              >
                <Send className="w-5 h-5 text-[#0D0D0D]" />
                <span>Submit Screening Package</span>
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Helpful Hint banner */}
      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex gap-3 text-xs text-white/60 items-center">
        <BookOpen className="w-5 h-5 text-brand-gold shrink-0" />
        <p className="leading-relaxed">
          Need details on resolution, formatting guidelines, copyright agreements, or legal terms? Navigate to the <span onClick={onNavigateToHub} className="text-brand-gold underline cursor-pointer hover:text-brand-gold/80">Filmmaker Hub</span> page for the full documentation.
        </p>
      </div>

    </div>
  );
}
