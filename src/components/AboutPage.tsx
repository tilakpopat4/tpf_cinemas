import React from 'react';
import { Film, Award, Shield, Target, Heart, Sparkles, Flame, Users, Tv } from 'lucide-react';

export default function AboutPage() {
  
  const pillars = [
    { 
      title: 'Curated Curation', 
      desc: 'Every film on TPF Cinemas is handpicked by our editorial board, celebrating raw, honest regional perspectives and courageous visual storytelling.' 
    },
    { 
      title: 'Filmmaker-First Ecosystem', 
      desc: 'We partner directly with emerging and independent filmmakers, providing a clean premium stage without intermediate distributors.' 
    },
    { 
      title: 'State-of-the-Art Exhibition', 
      desc: 'Indie masterpieces deserve beautiful presentation. We deliver pristine video performance, adaptive streaming, and standard widescreen scaling.' 
    },
    { 
      title: 'Support Alternative Art', 
      desc: 'By championing alternative narratives, non-traditional genres, and regional micro-budget projects, we help sustain a diverse cinematic ecosystem.' 
    },
    { 
      title: 'Transparent Collaboration', 
      desc: 'Our administrative board reviews submitted screeners individually, providing supportive editorial critiques to nurture raw creative voices.' 
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 animate-fade-in">
      
      {/* Brand Identity / Tagline Showcase */}
      <div className="text-center space-y-4 max-w-3xl mx-auto py-8">
        <span className="font-mono text-xs text-brand-gold tracking-[0.4em] uppercase block">
          THE TILAK POPAT FILMS EXHIBITION PLATFORM
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-semibold italic text-white tracking-tight leading-tight">
          "Every Story <span className="text-brand-gold">Deserves</span> a Screen."
        </h1>
        <p className="text-sm sm:text-base text-white/50 leading-relaxed font-light">
          TPF Cinemas is the premium exhibition digital platform of <strong>Tilak Popat Films</strong> — a curated, beautifully constructed OTT sanctuary built specifically to spotlight emerging and independent cinema across India.
        </p>
      </div>

      {/* Brand Pillars Grid */}
      <div className="space-y-6">
        <div className="border-b border-white/10 pb-4">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-brand-gold" />
            Exhibition Standards
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((p, idx) => (
            <div
              key={idx}
              className="glass-panel glass-card-hover p-6 rounded-2xl space-y-3"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-brand-gold/10 text-brand-gold flex items-center justify-center font-mono font-bold text-xs border border-brand-gold/15">
                  0{idx + 1}
                </div>
                <h3 className="text-base font-bold text-white font-serif">{p.title}</h3>
              </div>
              <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-light">
                {p.desc}
              </p>
            </div>
          ))}
          
          {/* Sixth block decorative quote */}
          <div className="bg-gradient-to-br from-[#8B1A1A]/30 to-white/[0.03] backdrop-blur-2xl p-6 rounded-2xl border border-[#8B1A1A]/45 flex flex-col justify-between text-white space-y-4">
            <Flame className="w-8 h-8 text-brand-gold" />
            <p className="text-sm italic font-serif leading-relaxed">
              "We believe regional indie cinema represents some of the most courageous, visually striking storytelling on the planet. Our mission is to build its theater."
            </p>
            <span className="text-xs font-mono font-bold tracking-widest text-brand-gold uppercase">
              — TILAK POPAT, FOUNDER
            </span>
          </div>
        </div>
      </div>

      {/* Artistic Charter Section */}
      <div className="glass-panel p-8 sm:p-10 rounded-3xl space-y-6 bg-gradient-to-tr from-white/[0.01] to-white/[0.03]">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="space-y-4 flex-1">
            <span className="text-[10px] font-mono tracking-widest uppercase text-brand-gold bg-brand-gold/10 px-2.5 py-1 rounded">
              ARTISTIC CHARTER
            </span>
            <h3 className="text-2xl font-serif font-bold text-white">
              Sustaining Indie Cinema
            </h3>
            <p className="text-sm text-white/60 leading-relaxed font-light">
              We seek work that challenges conventions, offers raw regional authenticity, and pushes aesthetic limits. TPF Cinemas maintains an independent curated theater space accessible to cinephiles worldwide. We believe in absolute creative ownership: our partner filmmakers retain 100% of their copyrights and master privileges.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 w-full md:w-80">
            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl text-center">
              <div className="text-2xl font-serif font-bold text-brand-gold mb-1">100%</div>
              <div className="text-[10px] font-mono text-white/40 uppercase">Rights Retained</div>
            </div>
            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl text-center">
              <div className="text-2xl font-serif font-bold text-brand-gold mb-1">Raw</div>
              <div className="text-[10px] font-mono text-white/40 uppercase">Voice Priority</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
