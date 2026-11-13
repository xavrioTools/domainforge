import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  Bookmark,
  TrendingUp,
  Scale,
  CreditCard,
  ShieldCheck,
  Menu,
  X,
  Zap,
  User,
  LogOut,
  ChevronDown
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    view,
    setView,
    savedDomains,
    comparedDomains,
    user,
    logout,
    setIsAuthModalOpen,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const navItems = [
    { id: 'wizard', label: 'Domain Wizard', icon: Sparkles },
    { id: 'trends', label: 'AI Trends', icon: TrendingUp },
    {
      id: 'compare',
      label: 'Compare',
      icon: Scale,
      badge: comparedDomains.length > 0 ? comparedDomains.length : undefined
    },
    { id: 'pricing', label: 'Pricing', icon: CreditCard },
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Bookmark,
      badge: savedDomains.length > 0 ? savedDomains.length : undefined
    },
    { id: 'admin', label: 'Admin', icon: ShieldCheck },
  ];

  const handleNavClick = (id: any) => {
    setView(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#0D1B2A]/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div
          onClick={() => setView('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#062B5B] via-[#0B3D7B] to-[#11C5A3] p-[2px] shadow-lg shadow-[#11C5A3]/20 group-hover:shadow-[#11C5A3]/40 transition-all duration-300">
            <div className="w-full h-full bg-[#0D1B2A] rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#11C5A3] group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight text-white">
                Domain<span className="text-[#11C5A3]">Forge</span>
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold tracking-wider bg-[#11C5A3]/15 text-[#4FE6CF] border border-[#11C5A3]/30">
                AI
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium tracking-wide hidden sm:block">
              Intelligent Naming Engine
            </p>
          </div>
        </div>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-1.5 bg-[#112236]/70 p-1.5 rounded-2xl border border-slate-800/90">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = view === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                  isActive
                    ? 'bg-[#062B5B] text-white shadow-md border border-[#11C5A3]/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#11C5A3]' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {item.badge !== undefined && (
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-[#11C5A3] text-[#062B5B] font-bold">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Action / User Tier Section */}
        <div className="hidden md:flex items-center gap-3">
          {/* Daily Quota Pill */}
          <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#112236] border border-slate-800 text-xs">
            {user.tier === 'pro' ? (
              <span className="flex items-center gap-1 text-[#11C5A3] font-semibold">
                <Zap className="w-3.5 h-3.5 fill-[#11C5A3]" /> Pro Unlimited
              </span>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Daily:</span>
                <span className="font-semibold text-slate-200">
                  {user.generationsToday}/{user.maxDailyGenerations}
                </span>
                <button
                  onClick={() => setView('pricing')}
                  className="text-[11px] text-[#4FE6CF] hover:underline font-bold ml-1"
                >
                  Upgrade
                </button>
              </div>
            )}
          </div>

          {/* Quick CTA */}
          <button
            onClick={() => setView('wizard')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#11C5A3] to-[#0CA588] text-[#062B5B] shadow-md shadow-[#11C5A3]/20 hover:shadow-[#11C5A3]/40 hover:from-[#4FE6CF] hover:to-[#11C5A3] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generate Domain</span>
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            {user.email ? (
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 p-1.5 pr-2.5 rounded-xl bg-[#112236] border border-slate-700/70 hover:border-slate-600 transition-all text-xs text-left"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-7 h-7 rounded-lg object-cover ring-1 ring-[#11C5A3]/40"
                />
                <span className="font-semibold text-slate-200 max-w-[80px] truncate hidden sm:inline-block">
                  {user.name.split(' ')[0]}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#112236] border border-slate-700 text-xs font-semibold text-slate-200 hover:text-white hover:border-[#11C5A3]/40 transition-all"
              >
                <User className="w-3.5 h-3.5 text-[#11C5A3]" />
                <span>Sign In</span>
              </button>
            )}

            {/* Profile Dropdown Menu */}
            {profileDropdownOpen && user.email && (
              <div
                className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#112236] border border-slate-700/90 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2"
                onMouseLeave={() => setProfileDropdownOpen(false)}
              >
                <div className="px-3 py-2 border-b border-slate-700/60 mb-1">
                  <p className="text-xs font-bold text-white truncate">{user.name}</p>
                  <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#062B5B] text-[#4FE6CF]">
                      {user.tier} Tier
                    </span>
                    {user.tier === 'free' && (
                      <button
                        onClick={() => {
                          setView('pricing');
                          setProfileDropdownOpen(false);
                        }}
                        className="text-[10px] font-bold text-[#11C5A3] hover:underline"
                      >
                        Go Pro →
                      </button>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setView('dashboard');
                    setProfileDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/80 transition-all"
                >
                  <Bookmark className="w-3.5 h-3.5 text-[#11C5A3]" />
                  <span>Saved Domains ({savedDomains.length})</span>
                </button>

                <button
                  onClick={() => {
                    logout();
                    setProfileDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 transition-all mt-1 border-t border-slate-700/50"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-[#112236] border border-slate-800 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-[#0D1B2A] p-4 space-y-2 animate-in slide-in-from-top-3">
          <div className="grid grid-cols-2 gap-2 mb-3">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = view === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center justify-between p-3 rounded-xl text-xs font-semibold ${
                    isActive
                      ? 'bg-[#062B5B] text-white border border-[#11C5A3]/40'
                      : 'bg-[#112236] text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-[#11C5A3]" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-[#11C5A3] text-[#062B5B] font-bold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
            {user.email ? (
              <div className="flex items-center gap-2 text-xs">
                <img src={user.avatar} className="w-6 h-6 rounded-full" />
                <span className="text-slate-200 font-semibold">{user.name}</span>
                <button onClick={logout} className="text-rose-400 text-[11px] underline ml-2">
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setIsAuthModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="text-xs text-[#11C5A3] font-bold underline"
              >
                Sign In / Sign Up
              </button>
            )}

            <button
              onClick={() => {
                setView('wizard');
                setMobileMenuOpen(false);
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-[#11C5A3] text-[#062B5B]"
            >
              Start Wizard
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
