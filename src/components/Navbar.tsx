import React, { useState } from 'react';
import { Film, Search, Compass, FileVideo, User, Info, ShieldCheck, Menu, X, Bell } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  pendingCount: number;
}

export default function Navbar({ activeTab, setActiveTab, pendingCount }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  interface NavItem {
    id: string;
    label: string;
    icon: React.ComponentType<any>;
    badge?: number;
  }

  const navItems: NavItem[] = [
    { id: 'home', label: 'Cinema Hall', icon: Film },
    { id: 'browse', label: 'Browse', icon: Compass },
    { id: 'hub', label: 'Filmmaker Hub', icon: FileVideo },
    { id: 'profile', label: 'My Watchlist', icon: User },
    { id: 'about', label: 'Our Story', icon: Info },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/[0.03] backdrop-blur-2xl border-b border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand Group */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}>
            <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-[#8B1A1A] to-[#C9A84C] text-white shadow-lg shadow-brand-red/20">
              <Film className="w-5 h-5 text-white animate-pulse" />
              <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-brand-gold to-brand-red opacity-30 blur"></div>
            </div>
            
            <div className="flex flex-col">
              <span className="text-xl font-serif font-bold tracking-wider text-white">
                TPF <span className="text-brand-gold">CINEMAS</span>
              </span>
              <span className="text-[9px] font-mono tracking-widest text-white/50 uppercase leading-none">
                Tilak Popat Films
              </span>
            </div>
          </div>

          {/* Desktop Navigation Items */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-tab-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium tracking-wide transition-all duration-200 relative ${
                    isActive 
                      ? 'text-brand-gold bg-white/5' 
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-brand-gold' : 'text-white/60'}`} />
                  <span>{item.label}</span>
                  
                  {/* Pending Approvals Badge */}
                  {item.badge !== undefined && (
                    <span className="absolute -top-1.5 -right-1.5 bg-brand-red text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-[#0D0D0D] animate-bounce">
                      {item.badge}
                    </span>
                  )}

                  {/* Active Indicator Underline */}
                  {isActive && (
                    <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-brand-gold rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Utilities (Upgrade, Profile info) */}
          <div className="hidden md:flex items-center gap-4">
            <button className="text-white/60 hover:text-brand-gold transition-colors p-2 rounded-full relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-gold rounded-full" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white/80 hover:text-white rounded-md hover:bg-white/5 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#050505]/85 backdrop-blur-3xl border-b border-white/10 py-4 px-2 space-y-1 animate-fade-in">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`mobile-nav-tab-${item.id}`}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center justify-between w-full px-4 py-3 rounded-md text-base font-medium tracking-wide transition-all ${
                  isActive 
                    ? 'text-brand-gold bg-white/5' 
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-brand-gold' : 'text-white/60'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className="bg-brand-red text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
}
