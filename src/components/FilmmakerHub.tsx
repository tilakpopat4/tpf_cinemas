import React, { useState } from 'react';
import { Mail, CheckCircle, FileText, Send, HelpCircle, ChevronDown, Award, Sparkles, BookOpen, Clock, Heart } from 'lucide-react';
import { Submission, FAQItem } from '../types';
import { MOCK_FAQS } from '../data/mockFilms';

interface FilmmakerHubProps {
  onSubmit: (submission: Omit<Submission, 'id' | 'status' | 'submittedAt'>) => void;
  mySubmissions: Submission[];
}

export default function FilmmakerHub({ onSubmit, mySubmissions }: FilmmakerHubProps) {
  const [filmTitle, setFilmTitle] = useState('');
  const [synopsis, setSynopsis] = useState('');
  const [directorName, setDirectorName] = useState('');
  const [duration, setDuration] = useState('');
  const [language, setLanguage] = useState('Hindi');
  const [genre, setGenre] = useState('Drama');
  const [videoLink, setVideoLink] = useState('');
  const [email, setEmail] = useState('');
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  // Accordion state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 animate-fade-in">
      
      {/* Visual Header Banner */}
      <div className="relative rounded-3xl overflow-hidden glass-panel bg-gradient-to-r from-white/[0.01] to-white/[0.05] p-8 sm:p-12 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="space-y-4 max-w-2xl text-center md:text-left">
          <span className="text-[11px] font-mono font-bold text-brand-gold tracking-[0.3em] uppercase bg-brand-gold/10 px-3 py-1 rounded-full border border-brand-gold/20 inline-block">
            Filmmaker First
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
            Apply by Email.<br />
            Get Reviewed. <span className="text-brand-gold">Get Screened.</span>
          </h1>
          <p className="text-sm sm:text-base text-white/60 leading-relaxed font-light">
            TPF Cinemas operates on absolute transparency. No agents, no closed-door selection boards, no exorbitant entry fees. We screen raw, honest, imperfect masterpieces.
          </p>
        </div>
        <div className="relative flex-none w-48 h-48 rounded-full bg-brand-gold/5 flex items-center justify-center border border-brand-gold/15">
          <Award className="w-20 h-20 text-brand-gold animate-bounce" />
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-brand-gold to-brand-red opacity-10 blur"></div>
        </div>
      </div>

      {/* Guidelines and Criteria Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Guidelines Card */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-6">
          <h3 className="text-lg font-serif font-semibold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-brand-gold" />
            Submission Requirements
          </h3>

          <ul className="space-y-4 text-sm text-white/70">
            <li className="flex gap-3">
              <span className="font-mono text-brand-gold font-bold">01.</span>
              <div>
                <strong className="text-white block">Format & Resolution</strong>
                <span>Standard professional master container (MP4 or MOV files). Full HD (1080p) minimum, with Ultra HD (4K) highly preferred.</span>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="font-mono text-brand-gold font-bold">02.</span>
              <div>
                <strong className="text-white block">Duration Brackets</strong>
                <span>Shorts (3 to 40 mins). Features (60+ mins). Quality of thought decides, not length.</span>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="font-mono text-brand-gold font-bold">03.</span>
              <div>
                <strong className="text-white block">Languages Accepted</strong>
                <span>Any Indian language + English. English subtitles are mandatory for non-English/non-Hindi films.</span>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="font-mono text-brand-gold font-bold">04.</span>
              <div>
                <strong className="text-white block">Intellectual Property</strong>
                <span>Must be entirely original work. You retain 100% of rights. TPF only takes non-exclusive streaming rights.</span>
              </div>
            </li>
          </ul>
        </div>

        {/* Review Criteria Card */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-6 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-serif font-semibold text-white flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-brand-gold" />
              Honest Review Criteria
            </h3>

            <div className="space-y-4">
              <div className="p-3 bg-white/[0.03] rounded-xl border border-white/5">
                <span className="text-xs font-mono font-bold text-brand-gold">CRITERION A</span>
                <h4 className="text-sm font-semibold text-white mb-1">Storytelling & Intention</h4>
                <p className="text-xs text-white/60">Is there a clear narrative drive, raw emotion, or structural idea behind the film?</p>
              </div>

              <div className="p-3 bg-white/[0.03] rounded-xl border border-white/5">
                <span className="text-xs font-mono font-bold text-brand-gold">CRITERION B</span>
                <h4 className="text-sm font-semibold text-white mb-1">Originality & Raw Voice</h4>
                <p className="text-xs text-white/60">Does the director offer a fresh lens, unique regional perspective, or bold aesthetics?</p>
              </div>

              <div className="p-3 bg-white/[0.03] rounded-xl border border-white/5">
                <span className="text-xs font-mono font-bold text-brand-gold">CRITERION C</span>
                <h4 className="text-sm font-semibold text-white mb-1">Filmmaker Commitment</h4>
                <p className="text-xs text-white/60">Has the team put their heart into utilizing their limited budget resources effectively?</p>
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 rounded-xl bg-brand-red/10 border border-brand-red/20 text-xs text-white/80 italic leading-relaxed">
            "Technical perfection is NOT required. A rough film with a spectacular story will always defeat a polished high-budget film with nothing to communicate."
          </div>
        </div>

      </div>

      {/* Submission Interaction Block */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Form panel */}
        <div className="lg:col-span-2 glass-panel p-6 sm:p-8 rounded-2xl space-y-6">
          {submittedId ? (
            /* Submission Success Simulator */
            <div className="space-y-6 text-center py-8 animate-fade-in">
              <div className="w-16 h-16 bg-brand-gold/10 text-brand-gold rounded-full flex items-center justify-center mx-auto border border-brand-gold/20">
                <CheckCircle className="w-10 h-10 animate-spin" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-2xl font-serif font-bold text-white">
                  Film Received via Sandbox SMTP!
                </h3>
                <p className="text-sm text-white/60 max-w-md mx-auto">
                  Your application has been logged on the Tilak Popat Films server and added to our review backlog. An automated acknowledgment is on its way to your inbox.
                </p>
              </div>

              {/* Interactive Submission Tracker */}
              <div className="bg-white/[0.02] backdrop-blur-md p-5 rounded-xl border border-white/5 text-left max-w-lg mx-auto space-y-5">
                <h4 className="text-xs font-mono font-bold text-white/40 uppercase tracking-widest">
                  Live Screening Status Tracker
                </h4>
                
                <div className="space-y-4">
                  {/* Step 1 */}
                  <div className="flex gap-3">
                    <div className="w-5 h-5 rounded-full bg-brand-gold text-[#0D0D0D] text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      ✓
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-white">1. Submission Filed</h5>
                      <p className="text-[10px] text-white/55">Logged and queued on TPF Admin Panel.</p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex gap-3">
                    <div className="w-5 h-5 rounded-full bg-white/10 border border-white/20 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 animate-pulse">
                      2
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-white/60">2. Review Desk Screening</h5>
                      <p className="text-[10px] text-white/40">Review team reviews synopsis and stream file.</p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex gap-3">
                    <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10 text-white/40 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      3
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-white/30">3. Decision & Feedback Dispatch</h5>
                      <p className="text-[10px] text-white/30">Email notification dispatched with feedback.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-center gap-4">
                <button
                  onClick={() => setSubmittedId(null)}
                  className="px-5 py-2.5 bg-brand-gold text-[#0D0D0D] font-bold rounded-lg text-xs font-mono hover:bg-brand-gold/90 transition-all cursor-pointer"
                >
                  Submit Another Film
                </button>
              </div>
            </div>
          ) : (
            /* Actual Submission Form */
            <form onSubmit={handleFormSubmit} className="space-y-5">
              <div className="space-y-1">
                <h3 className="text-xl font-serif font-semibold text-white">
                  Direct Screening Application
                </h3>
                <p className="text-xs text-white/45">
                  Your entry is routed to the TPF Review dashboard. Fill out details accurately.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Title */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-white/60 uppercase">
                    Film Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vazhiyoram"
                    value={filmTitle}
                    onChange={(e) => setFilmTitle(e.target.value)}
                    className="w-full bg-white/[0.03] backdrop-blur-md border border-white/10 focus:border-brand-gold text-white text-sm rounded-lg px-4 py-3 focus:outline-none"
                  />
                </div>

                {/* Director */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-white/60 uppercase">
                    Director Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anandhu Radhakrishnan"
                    value={directorName}
                    onChange={(e) => setDirectorName(e.target.value)}
                    className="w-full bg-white/[0.03] backdrop-blur-md border border-white/10 focus:border-brand-gold text-white text-sm rounded-lg px-4 py-3 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {/* Duration */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-white/60 uppercase">
                    Duration (e.g. 24 mins) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="24 mins"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full bg-white/[0.03] backdrop-blur-md border border-white/10 focus:border-brand-gold text-white text-sm rounded-lg px-4 py-3 focus:outline-none"
                  />
                </div>

                {/* Language */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-white/60 uppercase">
                    Language *
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full bg-neutral-900 border border-white/10 focus:border-brand-gold text-white text-sm rounded-lg px-4 py-3 focus:outline-none cursor-pointer"
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
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-white/60 uppercase">
                    Genre *
                  </label>
                  <select
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    className="w-full bg-neutral-900 border border-white/10 focus:border-brand-gold text-white text-sm rounded-lg px-4 py-3 focus:outline-none cursor-pointer"
                  >
                    <option value="Drama">Drama</option>
                    <option value="Thriller">Thriller</option>
                    <option value="Documentary">Documentary</option>
                    <option value="Experimental">Experimental</option>
                    <option value="Comedy">Comedy</option>
                  </select>
                </div>
              </div>

              {/* Video URL link */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-white/60 uppercase block">
                  Video File / YouTube Link *
                </label>
                <input
                  type="url"
                  required
                  placeholder="Paste YouTube Unlisted, Google Drive, or WeTransfer URL"
                  value={videoLink}
                  onChange={(e) => setVideoLink(e.target.value)}
                  className="w-full bg-white/[0.03] backdrop-blur-md border border-white/10 focus:border-brand-gold text-white text-sm rounded-lg px-4 py-3 focus:outline-none"
                />
                <span className="text-[10px] text-white/30 italic font-mono block">
                  ★ Pro Tip: YouTube Unlisted is free, offers unlimited storage and global edge CDN!
                </span>
              </div>

              {/* Synopsis */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-white/60 uppercase">
                  Brief Synopsis (Max 300 words) *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your film's narrative core, theme, and character drive..."
                  value={synopsis}
                  onChange={(e) => setSynopsis(e.target.value)}
                  className="w-full bg-white/[0.03] backdrop-blur-md border border-white/10 focus:border-brand-gold text-white text-sm rounded-lg px-4 py-3 focus:outline-none resize-none"
                />
              </div>

              {/* Contact Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-white/60 uppercase">
                  Contact Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="director@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/[0.03] backdrop-blur-md border border-white/10 focus:border-brand-gold text-white text-sm rounded-lg px-4 py-3 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-brand-gold hover:bg-brand-gold/90 text-[#0D0D0D] font-bold py-4 rounded-xl transition-all transform hover:scale-[1.01] cursor-pointer"
              >
                <Send className="w-5 h-5 text-[#0D0D0D]" />
                <span>Submit Screening Package</span>
              </button>
            </form>
          )}
        </div>

        {/* My logged submissions list on side */}
        <div className="space-y-6">
          
          <div className="glass-panel p-5 rounded-2xl space-y-4">
            <h4 className="text-sm font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4 text-brand-gold" />
              My Submissions ({mySubmissions.length})
            </h4>

            {mySubmissions.length > 0 ? (
              <div className="space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar pr-1">
                {mySubmissions.map((sub) => (
                  <div
                    key={sub.id}
                    className="p-3 bg-white/[0.03] rounded-xl border border-white/5 space-y-2 text-xs"
                  >
                    <div className="flex justify-between items-center">
                      <strong className="text-white block font-serif truncate max-w-[130px]">
                        {sub.filmTitle}
                      </strong>
                      <span className={`px-2 py-0.5 rounded-[4px] text-[10px] font-mono font-semibold uppercase ${
                        sub.status === 'pending' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
                        sub.status === 'approved' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
                        'bg-red-500/10 text-red-500 border border-red-500/20'
                      }`}>
                        {sub.status}
                      </span>
                    </div>

                    <div className="text-[11px] text-white/50 space-y-0.5">
                      <p>Director: {sub.directorName}</p>
                      <p>Filed: {new Date(sub.submittedAt).toLocaleDateString()}</p>
                    </div>

                    {sub.reviewFeedback && (
                      <div className="mt-2 pt-2 border-t border-white/5 text-[10px] text-brand-gold leading-normal italic">
                        Feedback: "{sub.reviewFeedback}"
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-xs text-white/40">
                You haven't filed any screen packages in this session.
              </div>
            )}
          </div>

          {/* Quick email alternative widget */}
          <div className="glass-panel p-5 rounded-2xl space-y-3">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-brand-gold" />
              <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                Direct Submission Address
              </h4>
            </div>
            <p className="text-xs text-white/65 leading-relaxed">
              Prefer classic email? Dispatch your screener files directly to:
            </p>
            <div className="bg-white/[0.03] backdrop-blur-md p-2.5 rounded-lg border border-white/5 text-center">
              <span className="font-mono text-xs text-brand-gold select-all font-bold">
                submit@tpfcinemas.in
              </span>
            </div>
          </div>

        </div>

      </div>

      {/* Accordion FAQ Area */}
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-serif font-semibold text-white">
            Submission & Screening <span className="text-brand-gold">FAQ</span>
          </h3>
          <p className="text-xs sm:text-sm text-white/45 mt-1">
            Answers to crucial legal, financial, and hosting questions.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3.5">
          {MOCK_FAQS.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="glass-panel glass-card-hover rounded-xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex justify-between items-center px-5 py-4 text-left font-medium text-white hover:text-brand-gold transition-colors text-sm sm:text-base cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`w-4 h-4 text-white/50 transition-transform duration-300 ${isOpen ? 'rotate-180 text-brand-gold' : ''}`} />
                </button>
                
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 border-t border-white/5 animate-fade-in">
                    <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-light">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
