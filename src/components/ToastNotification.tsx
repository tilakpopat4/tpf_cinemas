import React, { useState, useEffect } from 'react';
import { Mail, CheckCircle2, XCircle, X, ExternalLink, Send, ArrowRight, Eye } from 'lucide-react';

export interface Toast {
  id: string;
  title: string;
  message: string;
  status: 'approved' | 'rejected' | 'pending';
  recipient: string;
  filmTitle: string;
  feedback: string;
  subject: string;
}

interface ToastNotificationProps {
  toasts: Toast[];
  onClose: (id: string) => void;
}

export default function ToastNotification({ toasts, onClose }: ToastNotificationProps) {
  const [selectedEmail, setSelectedEmail] = useState<Toast | null>(null);

  return (
    <>
      {/* Toast Stack in Bottom Right */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto w-full bg-[#121212]/95 border border-brand-gold/30 hover:border-brand-gold rounded-xl shadow-2xl p-4 flex flex-col gap-3 backdrop-blur-lg animate-slide-up transition-all duration-300 group"
          >
            {/* Header / SMTP Icon */}
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg shrink-0 ${
                toast.status === 'approved' ? 'bg-emerald-500/10 text-emerald-500' :
                toast.status === 'rejected' ? 'bg-red-500/10 text-red-500' :
                'bg-amber-500/10 text-amber-500'
              }`}>
                <Mail className="w-5 h-5 animate-bounce" />
              </div>

              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-brand-gold bg-brand-gold/10 px-2 py-0.5 rounded border border-brand-gold/10">
                    SMTP Mail Outbox
                  </span>
                  <button
                    type="button"
                    onClick={() => onClose(toast.id)}
                    className="text-white/30 hover:text-white transition-colors p-0.5 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <h5 className="text-xs font-bold text-white font-serif truncate">
                  {toast.title}
                </h5>
                <p className="text-[10.5px] text-white/70 leading-relaxed font-light">
                  {toast.message}
                </p>
              </div>
            </div>

            {/* Quick Details & Interactive Action */}
            <div className="pt-2 border-t border-white/5 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 font-mono text-[9px] text-white/40">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse shrink-0"></span>
                <span className="truncate max-w-[130px]">{toast.recipient}</span>
              </div>
              
              <button
                type="button"
                onClick={() => setSelectedEmail(toast)}
                className="flex items-center gap-1 text-[10px] font-mono font-bold text-brand-gold hover:text-brand-gold/80 transition-colors uppercase cursor-pointer"
              >
                <span>Read Mail</span>
                <Eye className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Simulated Outbound Email Client Modal */}
      {selectedEmail && (
        <div className="fixed inset-0 z-[100] overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-xl bg-[#0F0F0F] rounded-2xl shadow-2xl border border-white/10 overflow-hidden animate-scale-up">
            
            {/* Header Accent */}
            <div className="h-1 bg-gradient-to-r from-brand-gold via-yellow-500 to-brand-gold"></div>

            {/* Email Window Title Bar */}
            <div className="flex items-center justify-between px-5 py-4 bg-[#141414] border-b border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                <span className="text-[10px] font-mono text-white/40 ml-2">SIMULATEDSMTP_OUTBOX_DAEMON</span>
              </div>
              
              <button
                type="button"
                onClick={() => setSelectedEmail(null)}
                className="text-white/40 hover:text-white bg-white/5 hover:bg-white/10 p-1.5 rounded-lg transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Email Form Metadata */}
            <div className="p-5 bg-[#0A0A0A] border-b border-white/5 space-y-2.5">
              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="text-white/30 w-12 text-right">FROM:</span>
                <span className="text-brand-gold font-bold">editorial@smtp.tpfcinemas.in</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="text-white/30 w-12 text-right">TO:</span>
                <span className="text-white/80 font-bold bg-white/5 px-2 py-0.5 rounded border border-white/5">{selectedEmail.recipient}</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="text-white/30 w-12 text-right">SUBJECT:</span>
                <span className="text-white font-semibold line-clamp-1">{selectedEmail.subject}</span>
              </div>
              <div className="flex items-center gap-3 text-[10px] font-mono text-white/30">
                <span className="w-12 text-right">GATEWAY:</span>
                <span>TPF-SMTP v2.4 (tls-secured-relay)</span>
              </div>
            </div>

            {/* Email Core Body */}
            <div className="p-6 space-y-6 bg-[#0D0D0D] min-h-[180px] text-sm leading-relaxed text-white/80 font-light font-sans">
              <div className="space-y-4">
                <p>Dear Director,</p>
                
                <p>
                  This is an automated notification from the **Tilak Popat Films Review Board** concerning your film submission package for <span className="text-white font-semibold">"{selectedEmail.filmTitle}"</span>.
                </p>

                <div className="my-5 p-4 rounded-xl border border-white/5 bg-white/[0.02] space-y-2 font-serif text-sm italic text-white">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-gold not-italic block mb-1">
                    Editorial Board Critique & Notes:
                  </span>
                  "{selectedEmail.feedback}"
                </div>

                {selectedEmail.status === 'approved' ? (
                  <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-xs text-emerald-400 space-y-1">
                    <strong className="font-bold block text-emerald-300">✓ NEXT STEPS FOR STREAMING:</strong>
                    <p>Your film is now fully live in our Cinema Hall! The master metadata, poster artwork, and synopsis are published and ready for direct community viewing.</p>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01] text-xs text-white/50">
                    <p>Although this entry is not selected for this term, your profile remains in our active directory. We heavily encourage submitting your future projects or alternative versions.</p>
                  </div>
                )}
              </div>

              <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[11px] text-white/40 font-mono">
                <span>Dispatched: {new Date().toLocaleTimeString()} (Local Node MST)</span>
                <div className="flex items-center gap-1.5 text-brand-gold">
                  <Send className="w-3 h-3" />
                  <span>DISPATCH_SUCCESS</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-4 bg-[#141414] border-t border-white/5 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedEmail(null)}
                className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white font-mono font-bold text-xs rounded-xl uppercase transition-all cursor-pointer"
              >
                Dismiss Reader
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
