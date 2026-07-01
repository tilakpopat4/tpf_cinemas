import React, { useState } from 'react';
import { Film, Search, Compass, FileVideo, User, Info, ShieldCheck, Menu, X, Bell, Send } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  pendingCount: number;
  firebaseUser?: any;
  onSignInWithGoogle?: () => void;
  onSignOut?: () => void;
}

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  pendingCount, 
  firebaseUser, 
  onSignInWithGoogle, 
  onSignOut 
}: NavbarProps) {
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

            {firebaseUser ? (
              <div className="flex items-center gap-3 pl-2 border-l border-white/10">
                <button
                  type="button"
                  onClick={() => setActiveTab('profile')}
                  className="w-9 h-9 rounded-full border border-brand-gold/30 hover:border-brand-gold overflow-hidden transition-all duration-200 cursor-pointer"
                  title="View Profile / Watchlist"
                >
                  {firebaseUser.photoURL ? (
                    <img
                      src={firebaseUser.photoURL}
                      alt={firebaseUser.displayName || 'Google User'}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full bg-brand-gold/10 text-brand-gold flex items-center justify-center font-serif text-sm font-bold">
                      {(firebaseUser.displayName || firebaseUser.email || 'U').charAt(0).toUpperCase()}
                    </div>
                  )}
                </button>
                <div className="hidden lg:flex flex-col text-left">
                  <span className="text-xs font-medium text-white max-w-[120px] truncate">
                    {firebaseUser.displayName || 'Google Viewer'}
                  </span>
                  <button 
                    type="button"
                    onClick={onSignOut}
                    className="text-[10px] text-brand-gold hover:underline font-mono text-left"
                  >
                    Disconnect
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={onSignInWithGoogle}
                className="flex items-center gap-2 px-3.5 py-1.5 bg-brand-gold hover:bg-brand-gold/90 text-[#0D0D0D] font-mono font-bold text-[11px] uppercase tracking-wider rounded-lg transition-all hover:scale-[1.02] shadow-md shadow-brand-gold/5 cursor-pointer ml-2 animate-fade-in"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.24 10.285V13.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.859-3.578-7.859-8s3.53-8 7.859-8c2.46 0 4.105 1.025 5.047 1.926l2.427-2.334C17.955 2.192 15.34 1 12.24 1 5.466 1 0 6.466 0 13.24S5.466 25.48 12.24 25.48c7.073 0 11.79-4.974 11.79-12 0-.814-.08-1.432-.191-2.195H12.24z"/>
                </svg>
                <span>Google Sign In</span>
              </button>
            )}
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
        <div className="md:hidden bg-[#050505]/95 backdrop-blur-3xl border-b border-white/10 py-4 px-2 space-y-1 animate-fade-in">
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

          {/* Mobile Auth Indicator */}
          <div className="border-t border-white/5 pt-3 mt-3 px-2">
            {firebaseUser ? (
              <div className="flex items-center justify-between gap-3 p-2 bg-white/[0.02] rounded-xl border border-white/5">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-full border border-brand-gold/25 overflow-hidden">
                    {firebaseUser.photoURL ? (
                      <img src={firebaseUser.photoURL} alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    ) : (
                      <div className="w-full h-full bg-brand-gold/15 text-brand-gold flex items-center justify-center font-bold text-xs font-serif">
                        {(firebaseUser.displayName || firebaseUser.email || 'U').charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-white truncate">{firebaseUser.displayName || 'Google Viewer'}</p>
                    <p className="text-[10px] text-white/40 truncate">{firebaseUser.email}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onSignOut?.();
                    setMobileMenuOpen(false);
                  }}
                  className="px-2.5 py-1 bg-white/5 border border-white/10 text-white/70 hover:text-white rounded-md text-[10px] font-mono uppercase cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  onSignInWithGoogle?.();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2.5 py-3 bg-brand-gold hover:bg-brand-gold/90 text-[#0D0D0D] font-mono font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.24 10.285V13.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.859-3.578-7.859-8s3.53-8 7.859-8c2.46 0 4.105 1.025 5.047 1.926l2.427-2.334C17.955 2.192 15.34 1 12.24 1 5.466 1 0 6.466 0 13.24S5.466 25.48 12.24 25.48c7.073 0 11.79-4.974 11.79-12 0-.814-.08-1.432-.191-2.195H12.24z"/>
                </svg>
                <span>Google Sign In</span>
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
