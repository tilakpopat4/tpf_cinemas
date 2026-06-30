import React, { useState } from 'react';
import { ShieldCheck, Mail, Check, X, Film as FilmIcon, Eye, Users, Clock, Award, Star, ExternalLink, MessageSquare } from 'lucide-react';
import { Submission, Film } from '../types';

interface AdminPanelProps {
  submissions: Submission[];
  films: Film[];
  onApprove: (submissionId: string, feedback: string) => void;
  onReject: (submissionId: string, feedback: string) => void;
  onSetFeatured: (filmId: string) => void;
  featuredFilmId: string;
}

export default function AdminPanel({ 
  submissions, 
  films, 
  onApprove, 
  onReject, 
  onSetFeatured,
  featuredFilmId
}: AdminPanelProps) {
  const [selectedSubId, setSelectedSubId] = useState<string | null>(
    submissions.length > 0 ? submissions[0].id : null
  );
  const [reviewFeedback, setReviewFeedback] = useState('');

  const activeSub = submissions.find(s => s.id === selectedSubId);

  // Compute stats dynamically
  const pendingCount = submissions.filter(s => s.status === 'pending').length;
  const approvedCount = films.length;
  const totalViews = films.reduce((sum, f) => sum + f.views, 0);
  const simulatedWatchTime = Math.round(totalViews * 0.4); // ~24 mins per view average

  const handleApproveClick = () => {
    if (!activeSub) return;
    onApprove(activeSub.id, reviewFeedback || 'Outstanding storytelling and direction. Your film is officially approved to stream on TPF Cinemas.');
    setReviewFeedback('');
  };

  const handleRejectClick = () => {
    if (!activeSub) return;
    onReject(activeSub.id, reviewFeedback || 'Thank you for your submission. While the storytelling was engaging, the sound quality or pacing didn\'t meet our curated criteria at this time.');
    setReviewFeedback('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-fade-in">
      
      {/* Title group */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-serif font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-8 h-8 text-brand-gold" />
            Review Desk <span className="text-brand-gold">Dashboard</span>
          </h1>
          <p className="text-xs text-white/50">
            Internal evaluation platform for Tilak Popat Films. Screen entries, send critique, and approve to stream live.
          </p>
        </div>

        <span className="bg-brand-gold/10 text-brand-gold font-mono text-[11px] px-3.5 py-1.5 rounded-full border border-brand-gold/15">
          EDITORIAL CONSOLE
        </span>
      </div>

      {/* Analytics widgets row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Metric 1 */}
        <div className="glass-panel p-5 rounded-2xl flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-brand-gold/10 text-brand-gold flex items-center justify-center border border-brand-gold/15">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider block">Pending Applications</span>
            <span className="text-xl sm:text-2xl font-bold text-white block">{pendingCount} Inbox</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="glass-panel p-5 rounded-2xl flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/15">
            <FilmIcon className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider block">Live Catalog</span>
            <span className="text-xl sm:text-2xl font-bold text-white block">{approvedCount} Movies</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="glass-panel p-5 rounded-2xl flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-brand-red/10 text-brand-red flex items-center justify-center border border-brand-red/15">
            <Eye className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider block">Total Streams</span>
            <span className="text-xl sm:text-2xl font-bold text-white block">{totalViews.toLocaleString()} Views</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="glass-panel p-5 rounded-2xl flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center border border-sky-500/15">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider block">Watch Time</span>
            <span className="text-xl sm:text-2xl font-bold text-white block">{simulatedWatchTime} Hours</span>
          </div>
        </div>

      </div>

      {/* Main split: Submissions inbox (left 1/3) vs Detail Review (right 2/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Mail inbox list */}
        <div className="glass-panel rounded-2xl overflow-hidden space-y-3.5">
          <div className="p-4 bg-white/[0.04] border-b border-white/5 flex justify-between items-center">
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Screening Mailbox
            </h3>
            <span className="bg-[#050505]/40 text-[10px] font-mono px-2 py-0.5 rounded text-white/40">
              Inbox size: {submissions.length}
            </span>
          </div>

          <div className="divide-y divide-white/5 max-h-[500px] overflow-y-auto custom-scrollbar">
            {submissions.map((sub) => {
              const isSelected = selectedSubId === sub.id;
              return (
                <button
                  key={sub.id}
                  onClick={() => {
                    setSelectedSubId(sub.id);
                    setReviewFeedback(sub.reviewFeedback || '');
                  }}
                  className={`w-full text-left p-4 flex flex-col gap-1 transition-all ${
                    isSelected ? 'bg-brand-gold/10 border-l-4 border-brand-gold' : 'hover:bg-white/[2%]'
                  }`}
                >
                  <div className="flex justify-between items-start gap-2">
                    <span className="font-serif font-bold text-white text-sm truncate block">
                      {sub.filmTitle}
                    </span>
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase shrink-0 ${
                      sub.status === 'pending' ? 'bg-amber-500/10 text-amber-500' :
                      sub.status === 'approved' ? 'bg-emerald-500/10 text-emerald-500' :
                      'bg-red-500/10 text-red-500'
                    }`}>
                      {sub.status}
                    </span>
                  </div>

                  <span className="text-xs text-white/60 font-light block">
                    Dir: {sub.directorName}
                  </span>

                  <div className="flex justify-between text-[10px] font-mono text-white/30 pt-1 mt-1 border-t border-white/[3%]">
                    <span>{sub.language} • {sub.duration}</span>
                    <span>{new Date(sub.submittedAt).toLocaleDateString()}</span>
                  </div>
                </button>
              );
            })}

            {submissions.length === 0 && (
              <div className="py-20 text-center text-xs text-white/40 font-mono italic">
                No submissions logged in mailbox.
              </div>
            )}
          </div>
        </div>

        {/* Detailed submission reviewer */}
        <div className="lg:col-span-2 glass-panel rounded-2xl p-6 sm:p-8 space-y-6">
          {activeSub ? (
            <div className="space-y-6 animate-fade-in">
              
              {/* Heading */}
              <div className="flex justify-between items-start gap-4 flex-wrap pb-4 border-b border-white/5">
                <div>
                  <span className="text-[10px] font-mono text-brand-gold uppercase tracking-wider block">Selected Application</span>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-white pt-1">
                    {activeSub.filmTitle}
                  </h3>
                  <p className="text-xs text-white/60 font-mono">
                    Submitted by: <a href={`mailto:${activeSub.email}`} className="text-brand-gold underline">{activeSub.email}</a>
                  </p>
                </div>

                <div className="flex gap-2">
                  <span className="bg-white/5 border border-white/10 text-white font-mono text-xs px-2.5 py-1 rounded">
                    {activeSub.genre}
                  </span>
                  <span className="bg-white/5 border border-white/10 text-white font-mono text-xs px-2.5 py-1 rounded">
                    {activeSub.language}
                  </span>
                  <span className="bg-white/5 border border-white/10 text-white font-mono text-xs px-2.5 py-1 rounded">
                    {activeSub.duration}
                  </span>
                </div>
              </div>

              {/* Synopsis */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono font-bold text-white/40 uppercase tracking-widest">
                  Story Synopsis & Narrative Drive
                </h4>
                <p className="text-sm sm:text-base text-white/80 font-light leading-relaxed">
                  {activeSub.synopsis}
                </p>
              </div>

              {/* Video Link verification stage */}
              <div className="p-4 bg-white/[0.03] backdrop-blur-md rounded-xl border border-white/5 space-y-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono text-brand-gold uppercase font-bold block">
                    Verify Filmmaker Master File
                  </span>
                  <span className="text-xs text-white/45 truncate max-w-sm block">
                    {activeSub.videoLink}
                  </span>
                </div>

                <a
                  href={activeSub.videoLink}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-brand-gold/10 hover:bg-brand-gold/20 text-brand-gold font-mono text-xs font-bold rounded-lg border border-brand-gold/20 flex items-center justify-center gap-1.5 shrink-0 transition-colors cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Stream File</span>
                </a>
              </div>

              {/* Status and Action Panel */}
              <div className="space-y-4 pt-4 border-t border-white/5">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-brand-gold" />
                  <h4 className="text-xs font-mono font-bold text-white uppercase tracking-widest">
                    Review Editorial Critiques & Decisions
                  </h4>
                </div>

                <textarea
                  rows={4}
                  placeholder="Write clear, supportive editorial critiques or feedback for the filmmaker here..."
                  value={reviewFeedback}
                  onChange={(e) => setReviewFeedback(e.target.value)}
                  className="w-full bg-white/[0.03] backdrop-blur-md border border-white/10 focus:border-brand-gold text-white text-sm rounded-xl px-4 py-3 focus:outline-none resize-none"
                />

                {activeSub.status === 'pending' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Reject Button */}
                    <button
                      onClick={handleRejectClick}
                      className="w-full flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 font-bold py-3.5 rounded-xl border border-red-500/25 transition-all cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                      <span>Send Disapproval Feedback</span>
                    </button>

                    {/* Approve Button */}
                    <button
                      onClick={handleApproveClick}
                      className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-500/90 text-[#0D0D0D] font-extrabold py-3.5 rounded-xl transition-all transform hover:scale-[1.01] cursor-pointer animate-pulse"
                    >
                      <Check className="w-5 h-5 text-[#0D0D0D]" />
                      <span>Approve to Stream Live!</span>
                    </button>

                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-xs">
                    <span className="text-white/40">Decision logged:</span>
                    <span className={`font-mono font-bold uppercase ${
                      activeSub.status === 'approved' ? 'text-emerald-500' : 'text-red-500'
                    }`}>
                      {activeSub.status}
                    </span>
                  </div>
                )}
              </div>

            </div>
          ) : (
            <div className="py-20 text-center text-white/30 font-mono italic">
              Please select an active screening application from the mailbox on the left.
            </div>
          )}
        </div>

      </div>

      {/* Featured Film Administration (Set spotlight homepage hero) */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-6">
        <div className="space-y-1">
          <h3 className="text-lg font-serif font-semibold text-white flex items-center gap-2">
            <Star className="w-5 h-5 text-brand-gold fill-brand-gold" />
            Home Spotlight Controller
          </h3>
          <p className="text-xs text-white/40">
            Set the primary featured movie to show on the main homepage Hero Banner. Spotlight highlights are managed below.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {films.map((f) => {
            const isFeatured = f.id === featuredFilmId;
            return (
              <div
                key={f.id}
                className={`p-4 rounded-xl border flex items-center justify-between gap-4 transition-all ${
                  isFeatured 
                    ? 'bg-brand-gold/15 border-brand-gold' 
                    : 'bg-white/[0.03] border-white/5 hover:border-white/15'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-14 bg-neutral-800 rounded overflow-hidden flex-none">
                    <img src={f.posterUrl} alt={f.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-white truncate">{f.title}</h4>
                    <p className="text-[10px] text-white/40">{f.director} • {f.language}</p>
                  </div>
                </div>

                {isFeatured ? (
                  <span className="bg-brand-gold text-[#0D0D0D] text-[9px] font-mono font-bold uppercase px-2 py-1 rounded">
                    ACTIVE
                  </span>
                ) : (
                  <button
                    onClick={() => onSetFeatured(f.id)}
                    className="text-[9px] font-mono font-bold bg-white/5 text-white/80 border border-white/10 hover:border-white hover:bg-white/10 px-2 py-1 rounded transition-colors cursor-pointer"
                  >
                    SELECT
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
