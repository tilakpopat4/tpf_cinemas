import React, { useState } from 'react';
import { Send, FileVideo } from 'lucide-react';
import ApplyPortal from './ApplyPortal';
import FilmmakerHub from './FilmmakerHub';
import { Submission } from '../types';

interface SubmissionsPageProps {
  onSubmit: (submission: Omit<Submission, 'id' | 'status' | 'submittedAt'>) => void;
  mySubmissions: Submission[];
}

export default function SubmissionsPage({ onSubmit, mySubmissions }: SubmissionsPageProps) {
  const [activeSubTab, setActiveSubTab] = useState<'apply' | 'hub'>('apply');

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white">
      {/* Immersive Submissions Header */}
      <div className="relative py-12 border-b border-white/5 bg-gradient-to-b from-[#141414] to-[#0D0D0D]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-brand-gold/5 via-transparent to-transparent pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold tracking-tight">
            Filmmaker <span className="text-brand-gold">Submissions</span>
          </h1>
          <p className="text-sm sm:text-base text-white/60 max-w-2xl mx-auto leading-relaxed font-light">
            Empowering independent storytellers. Apply to stream your film on TPF Cinemas or track your review queue status in real time.
          </p>

          {/* Premium Sub-Navigation Pills */}
          <div className="pt-6 flex justify-center">
            <div className="inline-flex p-1 bg-white/[0.03] backdrop-blur-md rounded-xl border border-white/10 shadow-inner">
              <button
                type="button"
                id="sub-tab-apply"
                onClick={() => setActiveSubTab('apply')}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg text-xs font-mono uppercase tracking-wider font-bold transition-all duration-300 cursor-pointer ${
                  activeSubTab === 'apply'
                    ? 'bg-brand-gold text-[#0D0D0D] shadow-lg shadow-brand-gold/15'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <Send className="w-4 h-4" />
                <span>Submit Your Film</span>
              </button>

              <button
                type="button"
                id="sub-tab-hub"
                onClick={() => setActiveSubTab('hub')}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg text-xs font-mono uppercase tracking-wider font-bold transition-all duration-300 cursor-pointer ${
                  activeSubTab === 'hub'
                    ? 'bg-brand-gold text-[#0D0D0D] shadow-lg shadow-brand-gold/15'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <FileVideo className="w-4 h-4" />
                <span>Filmmaker Hub & Status</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Render selected Portal/Hub */}
      <div className="py-6">
        {activeSubTab === 'apply' ? (
          <ApplyPortal
            onSubmit={onSubmit}
            onNavigateToHub={() => setActiveSubTab('hub')}
          />
        ) : (
          <FilmmakerHub
            mySubmissions={mySubmissions}
            onNavigateToApply={() => setActiveSubTab('apply')}
          />
        )}
      </div>
    </div>
  );
}
