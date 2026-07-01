import React, { useState, useEffect, useRef } from 'react';
import { Mail, CheckCircle, FileText, Send, HelpCircle, ChevronDown, Award, Sparkles, BookOpen, Clock, Heart, Inbox, Bell, Trash2, ShieldAlert, Sparkle, Eye } from 'lucide-react';
import { Submission, FAQItem } from '../types';
import { MOCK_FAQS } from '../data/mockFilms';

interface SimulatedEmail {
  id: string;
  sender: string;
  recipient: string;
  subject: string;
  sentAt: string;
  status: 'pending' | 'approved' | 'rejected';
  filmTitle: string;
  feedback: string;
  isRead: boolean;
}

interface FilmmakerHubProps {
  mySubmissions: Submission[];
  onNavigateToApply: () => void;
}

export default function FilmmakerHub({ mySubmissions, onNavigateToApply }: FilmmakerHubProps) {
  // Simulated Email & SMTP State
  const [simulatedEmails, setSimulatedEmails] = useState<SimulatedEmail[]>([]);
  const [activeEmail, setActiveEmail] = useState<SimulatedEmail | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [sidebarTab, setSidebarTab] = useState<'submissions' | 'inbox'>('submissions');
  const [showNotificationToast, setShowNotificationToast] = useState<{
    visible: boolean;
    title: string;
    status: 'pending' | 'approved' | 'rejected';
  }>({ visible: false, title: '', status: 'pending' });

  const prevSubsRef = useRef<Submission[]>([]);

  // Track status changes in mySubmissions to trigger realistic SMTP emails
  useEffect(() => {
    if (mySubmissions.length === 0) {
      prevSubsRef.current = [];
      return;
    }

    if (prevSubsRef.current.length > 0) {
      mySubmissions.forEach(curr => {
        const prev = prevSubsRef.current.find(p => p.id === curr.id);
        if (prev && prev.status !== curr.status) {
          const newEmail: SimulatedEmail = {
            id: `email-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
            sender: 'editorial@smtp.tpfcinemas.in',
            recipient: curr.email || 'director@tpfcinemas.in',
            subject: curr.status === 'approved'
              ? `[TPF Cinemas] Screening Selection: "${curr.filmTitle}" Approved!`
              : `[TPF Cinemas] Review Concluded: "${curr.filmTitle}"`,
            sentAt: new Date().toISOString(),
            status: curr.status,
            filmTitle: curr.filmTitle,
            feedback: curr.reviewFeedback || (curr.status === 'approved'
              ? 'Your screening package has passed our raw voice editorial standard and is officially selected for showcase in the main Cinema Hall.'
              : 'Our editorial board appreciates your work, but we are unable to advance this entry to the screening block at this time. We encourage you to refine and submit for our next seasonal showcase.'),
            isRead: false
          };

          setSimulatedEmails(prevEmails => [newEmail, ...prevEmails]);
          setUnreadCount(c => c + 1);
          setActiveEmail(newEmail);
          
          // Trigger a beautiful visual SMTP notification banner
          setShowNotificationToast({
            visible: true,
            title: curr.filmTitle,
            status: curr.status
          });

          // Focus SMTP Inbox tab immediately so the user sees the new email
          setSidebarTab('inbox');
        }
      });
    }

    // Auto welcome email when a NEW film is submitted
    if (mySubmissions.length > prevSubsRef.current.length && prevSubsRef.current.length > 0) {
      const addedSub = mySubmissions.find(curr => !prevSubsRef.current.some(p => p.id === curr.id));
      if (addedSub && addedSub.id !== 'sub-sandbox-demo') {
        const welcomeEmail: SimulatedEmail = {
          id: `email-recv-${Date.now()}`,
          sender: 'smtp-gateway@tpfcinemas.in',
          recipient: addedSub.email,
          subject: `[TPF SMTP] Screening Application for "${addedSub.filmTitle}" Received`,
          sentAt: new Date().toISOString(),
          status: 'pending',
          filmTitle: addedSub.filmTitle,
          feedback: 'Your digital assets have been securely logged in our database. The review board will screen your work within 48-72 hours. You will receive an email notification here immediately upon status changes.',
          isRead: false
        };
        setSimulatedEmails(prevEmails => [welcomeEmail, ...prevEmails]);
        setUnreadCount(c => c + 1);
        setActiveEmail(welcomeEmail);
        setShowNotificationToast({
          visible: true,
          title: addedSub.filmTitle,
          status: 'pending'
        });
        setSidebarTab('inbox');
      }
    }

    prevSubsRef.current = mySubmissions;
  }, [mySubmissions]);

  // Accordion state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
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
        
        {/* Film Apply Portal CTA Panel */}
        <div className="lg:col-span-2 glass-panel p-6 sm:p-10 rounded-2xl flex flex-col justify-between relative overflow-hidden bg-gradient-to-br from-white/[0.01] to-white/[0.04] border border-white/10 space-y-8">
          <div className="absolute top-0 right-0 w-48 h-48 bg-brand-gold/5 rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-gold/10 rounded-full border border-brand-gold/25 text-brand-gold font-mono text-[10px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>Dedicated Submission Space</span>
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-tight">
              Ready to Showcase Your Film on <span className="text-brand-gold">TPF Cinemas</span>?
            </h3>
            
            <p className="text-sm text-white/60 leading-relaxed font-light">
              We have launched a dedicated, full-screen **Film Apply Portal** separate from the Filmmaker Hub to give you a clutter-free, immersive application environment. Submit your metadata, synopsis, unlisted streaming files, and review contact information securely.
            </p>

            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-white/70">
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0"></span>
                <span>Zero Entry Fees / 100% Free</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0"></span>
                <span>48-72 Hour Editorial Review</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0"></span>
                <span>Retain 100% Rights to Your Film</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0"></span>
                <span>Real-Time Simulated SMTP Tracker</span>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="button"
              onClick={onNavigateToApply}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-brand-gold hover:bg-brand-gold/90 text-[#0D0D0D] font-mono font-bold px-8 py-4 rounded-xl transition-all hover:scale-[1.02] shadow-lg shadow-brand-gold/15 cursor-pointer"
            >
              <Send className="w-4 h-4 text-[#0D0D0D]" />
              <span>Go to Film Apply Portal</span>
            </button>
          </div>
        </div>

        {/* My logged submissions list on side */}
        <div className="space-y-6">
          
          <div className="glass-panel p-5 rounded-2xl space-y-4">
            
            {/* Sidebar Tab Switcher */}
            <div className="flex bg-white/[0.02] p-1 rounded-xl border border-white/5 font-mono text-[11px]">
              <button
                type="button"
                onClick={() => setSidebarTab('submissions')}
                className={`flex-1 py-2 text-center rounded-lg font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  sidebarTab === 'submissions' 
                    ? 'bg-brand-gold text-[#0D0D0D]' 
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                Trackers
              </button>
              <button
                type="button"
                onClick={() => setSidebarTab('inbox')}
                className={`flex-1 py-2 text-center rounded-lg font-bold transition-all flex items-center justify-center gap-1.5 relative cursor-pointer ${
                  sidebarTab === 'inbox' 
                    ? 'bg-brand-gold text-[#0D0D0D]' 
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <Mail className="w-3.5 h-3.5" />
                SMTP Inbox
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-red text-white text-[9px] font-sans font-bold rounded-full flex items-center justify-center border border-[#0c0c0c] animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>
            </div>

            {sidebarTab === 'submissions' ? (
              <div className="space-y-4 animate-fade-in">
                <h4 className="text-xs font-mono font-bold text-white/50 uppercase tracking-wider flex items-center gap-2">
                  <FileText className="w-4 h-4 text-brand-gold" />
                  Screener Progress ({mySubmissions.length})
                </h4>

                <div className="space-y-3 max-h-[420px] overflow-y-auto custom-scrollbar pr-1">
                  {mySubmissions.map((sub) => (
                    <div
                      key={sub.id}
                      className="p-3.5 bg-white/[0.02] rounded-xl border border-white/5 space-y-2 text-xs relative group/sub"
                    >
                      {sub.id === 'sub-sandbox-demo' && (
                        <span className="absolute top-3.5 right-3.5 text-[8.5px] font-mono bg-brand-gold/15 text-brand-gold border border-brand-gold/25 px-1.5 py-0.5 rounded uppercase font-semibold">
                          Sandbox Demo
                        </span>
                      )}

                      <div className="flex justify-between items-start gap-2 pr-16">
                        <strong className="text-white block font-serif truncate text-sm">
                          {sub.filmTitle}
                        </strong>
                      </div>

                      <div className="flex items-center gap-2 mt-1">
                        <span className={`px-2 py-0.5 rounded-[4px] text-[10px] font-mono font-semibold uppercase ${
                          sub.status === 'pending' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
                          sub.status === 'approved' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
                          'bg-red-500/10 text-red-500 border border-red-500/20'
                        }`}>
                          {sub.status}
                        </span>
                        <span className="text-white/35">•</span>
                        <span className="text-[10px] font-mono text-white/50">
                          {new Date(sub.submittedAt).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="text-[10.5px] text-white/50 space-y-0.5 pt-1">
                        <p><span className="text-white/30">Director:</span> {sub.directorName}</p>
                        <p><span className="text-white/30">Duration:</span> {sub.duration} ({sub.language})</p>
                      </div>

                      {sub.reviewFeedback && (
                        <div className="mt-2.5 p-2 bg-brand-gold/5 border border-brand-gold/10 rounded text-[10.5px] text-brand-gold leading-normal italic">
                          Feedback: "{sub.reviewFeedback}"
                        </div>
                      )}

                      {/* Informational guide on Review Desk testing */}
                      <div className="mt-3.5 pt-3 border-t border-white/5 space-y-1.5 bg-brand-gold/[0.02] p-2.5 rounded-lg border border-brand-gold/10">
                        <div className="flex items-center gap-1.5 text-[9px] font-mono text-brand-gold font-bold">
                          <ShieldAlert className="w-3.5 h-3.5" />
                          <span>TESTING EDITORIAL DECISIONS:</span>
                        </div>
                        <p className="text-[10px] text-white/50 leading-relaxed font-light">
                          To approve/reject this submission, navigate to the <strong className="text-brand-gold">Review Desk Dashboard</strong> in the top navigation bar. Unlock it using the password <code className="text-brand-gold bg-white/5 px-1 rounded font-mono">admin123</code>.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* SMTP simulated inbox tab */
              <div className="space-y-4 animate-fade-in">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-mono font-bold text-white/50 uppercase tracking-wider flex items-center gap-2">
                    <Inbox className="w-4 h-4 text-brand-gold" />
                    SMTP Server Inbox
                  </h4>
                  {simulatedEmails.length > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        setSimulatedEmails([]);
                        setActiveEmail(null);
                        setUnreadCount(0);
                      }}
                      className="text-[10px] font-mono text-brand-red hover:underline cursor-pointer"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {simulatedEmails.length > 0 ? (
                  <div className="space-y-2.5 max-h-[420px] overflow-y-auto custom-scrollbar pr-1">
                    {simulatedEmails.map((email) => (
                      <div
                        key={email.id}
                        onClick={() => {
                          setActiveEmail(email);
                          // Mark as read
                          setSimulatedEmails(prev => prev.map(em => em.id === email.id ? { ...em, isRead: true } : em));
                          setUnreadCount(c => Math.max(0, c - (email.isRead ? 0 : 1)));
                        }}
                        className={`p-3 bg-white/[0.02] hover:bg-white/[0.05] border rounded-xl transition-all cursor-pointer text-left relative overflow-hidden group/email ${
                          email.isRead ? 'border-white/5' : 'border-brand-gold/30 bg-brand-gold/[0.01]'
                        }`}
                      >
                        {!email.isRead && (
                          <span className="absolute top-3.5 right-3.5 w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
                        )}

                        <div className="text-[10px] font-mono text-white/40 flex justify-between">
                          <span>From: {email.sender.split('@')[0]}</span>
                          <span>{new Date(email.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>

                        <h5 className={`text-xs mt-1 truncate ${!email.isRead ? 'text-brand-gold font-bold' : 'text-white/90'}`}>
                          {email.subject}
                        </h5>

                        <p className="text-[11px] text-white/60 line-clamp-1 mt-0.5 font-light">
                          {email.feedback}
                        </p>

                        <div className="mt-2 text-[10px] font-mono text-brand-gold flex items-center gap-1 opacity-0 group-hover/email:opacity-100 transition-opacity">
                          <Eye className="w-3.5 h-3.5" />
                          <span>Open Simulated Email</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 px-4 space-y-4">
                    <div className="w-12 h-12 rounded-full bg-white/[0.02] border border-white/5 text-white/20 flex items-center justify-center mx-auto">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <h5 className="text-xs font-bold text-white/80">SMTP Inbox Empty</h5>
                      <p className="text-[10px] text-white/40 leading-relaxed font-light">
                        To test, change any film's status inside the <strong className="text-brand-gold">Review Desk Dashboard</strong> (Admin Portal) using password <strong className="text-brand-gold">admin123</strong>.
                      </p>
                    </div>
                  </div>
                )}
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
            <p className="text-xs text-white/65 leading-relaxed font-light">
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
          <p className="text-xs sm:text-sm text-white/45 mt-1 font-light">
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
                  type="button"
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

      {/* 1. Real-time Toast Notification banner */}
      {showNotificationToast.visible && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-[#121212] border border-brand-gold/40 rounded-xl shadow-2xl p-4 animate-slide-up flex items-start gap-3.5 backdrop-blur-lg">
          <div className={`p-2 rounded-lg shrink-0 ${
            showNotificationToast.status === 'approved' ? 'bg-emerald-500/10 text-emerald-500' :
            showNotificationToast.status === 'rejected' ? 'bg-red-500/10 text-red-500' :
            'bg-amber-500/10 text-amber-500'
          }`}>
            <Mail className="w-5 h-5" />
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[9.5px] font-mono font-bold uppercase tracking-wider text-brand-gold">
                SMTP Server Alert
              </span>
              <button
                type="button"
                onClick={() => setShowNotificationToast(prev => ({ ...prev, visible: false }))}
                className="text-white/30 hover:text-white text-xs font-bold"
              >
                ✕
              </button>
            </div>
            <h5 className="text-xs font-bold text-white">
              Status changed: {showNotificationToast.title}
            </h5>
            <p className="text-[10px] text-white/60 leading-relaxed font-light">
              An official email notice was dispatched. Check your SMTP Inbox tab in Filmmaker Hub.
            </p>
          </div>
        </div>
      )}

      {/* 2. Simulated Outbound Email Client Modal */}
      {activeEmail && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-xl bg-[#0F0F0F] rounded-2xl shadow-2xl border border-white/10 overflow-hidden animate-scale-up">
            
            {/* Email Window Header */}
            <div className="flex items-center justify-between px-5 py-4 bg-[#141414] border-b border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                <span className="text-[10.5px] font-mono text-white/40 ml-2">SIMULATED SMTP CLIENT</span>
              </div>
              <button
                type="button"
                onClick={() => setActiveEmail(null)}
                className="text-xs font-mono text-white/50 hover:text-white hover:underline cursor-pointer"
              >
                Close Mail
              </button>
            </div>

            {/* Email Metadata / Headers */}
            <div className="p-5 bg-[#0C0C0C] border-b border-white/5 space-y-1.5 text-[11px] font-mono text-white/70">
              <div>
                <span className="text-white/35">From:</span> <strong className="text-brand-gold">{activeEmail.sender}</strong>
              </div>
              <div>
                <span className="text-white/35">To:</span> <strong className="text-white/90">{activeEmail.recipient}</strong>
              </div>
              <div>
                <span className="text-white/35">Date:</span> <span className="text-white/60">{new Date(activeEmail.sentAt).toUTCString()}</span>
              </div>
              <div>
                <span className="text-white/35">Subject:</span> <strong className="text-white">{activeEmail.subject}</strong>
              </div>
              <div className="pt-1.5 flex gap-1.5">
                <span className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-[8.5px] font-bold px-1.5 py-0.5 rounded uppercase">
                  DKIM-PASS
                </span>
                <span className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-[8.5px] font-bold px-1.5 py-0.5 rounded uppercase">
                  SPF-PASS
                </span>
                <span className="bg-brand-gold/15 text-brand-gold border border-brand-gold/25 text-[8.5px] font-bold px-1.5 py-0.5 rounded uppercase">
                  TLS-SECURE
                </span>
              </div>
            </div>

            {/* Email Body Context */}
            <div className="p-6 sm:p-8 space-y-6 text-sm bg-gradient-to-b from-[#0F0F0F] to-black">
              
              {/* Formal Letterhead Logo */}
              <div className="text-center space-y-1 pb-5 border-b border-white/5">
                <h3 className="font-serif font-black text-white text-lg tracking-widest uppercase">
                  TILAK POPAT FILMS
                </h3>
                <p className="text-[9.5px] font-mono tracking-[0.2em] text-brand-gold uppercase">
                  Mumbai Editorial Board • Screener Desk
                </p>
              </div>

              {/* Message Greetings */}
              <div className="space-y-4 text-white/80 font-sans leading-relaxed text-xs sm:text-sm">
                <p>Dear Independent Filmmaker,</p>
                
                <p>
                  Thank you for submitting your creative assets for theatrical consideration at <strong className="text-white">TPF Cinemas</strong>. Our select review group has successfully analyzed your digital screening package for:
                </p>

                <div className="p-4 bg-white/[0.03] border border-white/5 rounded-xl space-y-1.5 font-mono text-[11px] text-white">
                  <p><span className="text-white/40">FILM ENTRY:</span> "{activeEmail.filmTitle}"</p>
                  <p>
                    <span className="text-white/40">EDITORIAL DECISION:</span>{' '}
                    <span className={`font-bold uppercase ${
                      activeEmail.status === 'approved' ? 'text-emerald-500' :
                      activeEmail.status === 'rejected' ? 'text-brand-red' :
                      'text-amber-500'
                    }`}>
                      {activeEmail.status}
                    </span>
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="font-semibold text-white/90">Review Board Comments:</p>
                  <blockquote className="pl-4 border-l-2 border-brand-gold text-brand-gold/90 italic leading-relaxed py-0.5">
                    "{activeEmail.feedback}"
                  </blockquote>
                </div>

                <p className="pt-2">
                  Should you have further queries or wish to request deep-dive feedback sessions, please contact our support lines at <span className="text-brand-gold underline font-mono">editorial@tpfcinemas.in</span>.
                </p>

                <p className="pt-4 font-serif text-white/60">
                  Best regards,<br />
                  <strong className="text-white font-medium">Tilak Popat</strong><br />
                  <span className="text-xs text-white/40 font-mono">Chief Curator, TPF Cinemas</span>
                </p>
              </div>

              {/* Footer Credentials */}
              <div className="pt-6 border-t border-white/5 text-[9px] font-mono text-white/30 text-center">
                This is a mock outbound transaction generated by the TPF Cinemas Local SMTP simulator.
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
