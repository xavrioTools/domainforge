import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  ArrowRight,
  Play,
  Search,
  CheckCircle,
  ShieldCheck,
  TrendingUp,
  Cpu,
  Layers,
  Star,
  Zap,
  Globe
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { setView, runGeneration, setWizardData, setIsDemoOpen, quickCheckDomain, showToast } = useApp();
  const [quickInput, setQuickInput] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [quickCheckResult, setQuickCheckResult] = useState<any>(null);

  const samplePopularDomains = [
    { domain: 'neuralpulse.ai', status: 'available', score: 98, ext: '.ai' },
    { domain: 'hypercraft.io', status: 'available', score: 94, ext: '.io' },
    { domain: 'apexvault.com', status: 'premium', score: 99, ext: '.com' },
    { domain: 'zenithflow.tech', status: 'available', score: 91, ext: '.tech' },
  ];

  const handleQuickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickInput.trim()) {
      setView('wizard');
      return;
    }

    const term = quickInput.trim();
    if (term.includes('.')) {
      // Direct live domain check
      setIsChecking(true);
      try {
        const res = await quickCheckDomain(term);
        setQuickCheckResult(res);
        showToast(`Checked ${res.domain}: Status is ${res.status.toUpperCase()}`, 'info');
      } catch (err) {
        showToast('Check failed, starting wizard', 'info');
        setView('wizard');
      } finally {
        setIsChecking(false);
      }
    } else {
      // Launch generation with this keyword as idea / niche
      setWizardData(prev => ({
        ...prev,
        idea: `A modern platform centered around ${term} delivering exceptional user experience`,
        niche: term.length <= 4 ? 'Tech' : term.charAt(0).toUpperCase() + term.slice(1),
      }));
      await runGeneration({
        idea: `A modern platform centered around ${term} delivering exceptional user experience`,
      });
    }
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
      {/* Background Glows and Atmospheric Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-[#062B5B]/50 via-[#11C5A3]/20 to-[#4FE6CF]/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute -top-24 right-10 w-96 h-96 bg-[#062B5B]/40 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Top AI badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#112236]/80 border border-[#11C5A3]/30 text-xs font-semibold text-[#4FE6CF] mb-8 shadow-inner shadow-[#11C5A3]/10">
            <Sparkles className="w-4 h-4 text-[#11C5A3] animate-pulse" />
            <span>DomainForge AI 2.4 — Powered by Gemini 3.8 & Real-Time DNS</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#11C5A3] animate-ping" />
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] sm:leading-[1.15]">
            Find the{' '}
            <span className="bg-gradient-to-r from-white via-[#4FE6CF] to-[#11C5A3] bg-clip-text text-transparent">
              Perfect Domain Name
            </span>{' '}
            for Your Next Big Idea
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed">
            Generate unique and available domain names instantly using AI. Combine semantic brand scoring, phonetic memorability, and live DNS availability.
          </p>

          {/* Quick Search & Check Input */}
          <form
            onSubmit={handleQuickSubmit}
            className="w-full max-w-2xl mt-9 relative"
          >
            <div className="relative flex items-center rounded-2xl bg-[#112236]/90 border border-slate-700/80 p-2 shadow-2xl focus-within:border-[#11C5A3] focus-within:ring-2 focus-within:ring-[#11C5A3]/20 transition-all">
              <div className="pl-3 pr-2 text-slate-400">
                <Search className="w-5 h-5 text-[#11C5A3]" />
              </div>
              <input
                type="text"
                value={quickInput}
                onChange={e => setQuickInput(e.target.value)}
                placeholder="Enter keyword, idea, or domain (e.g. 'cortex' or 'neuralflow.ai')..."
                className="w-full bg-transparent text-white placeholder-slate-400 text-sm sm:text-base focus:outline-none py-2 px-1"
              />
              <button
                type="submit"
                disabled={isChecking}
                className="shrink-0 flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#11C5A3] to-[#0CA588] text-[#062B5B] font-bold text-sm shadow-lg shadow-[#11C5A3]/25 hover:from-[#4FE6CF] hover:to-[#11C5A3] transition-all transform active:scale-95 disabled:opacity-50"
              >
                {isChecking ? (
                  <>
                    <div className="w-4 h-4 border-2 border-[#062B5B] border-t-transparent rounded-full animate-spin" />
                    <span>Checking...</span>
                  </>
                ) : (
                  <>
                    <span>{quickInput.includes('.') ? 'Check DNS' : 'Forge Domain'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            {/* Quick check result overlay if checked direct domain */}
            {quickCheckResult && (
              <div className="mt-3 p-3 rounded-xl bg-[#062B5B]/80 border border-[#11C5A3]/40 flex items-center justify-between text-xs text-left animate-in fade-in">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-white text-sm">{quickCheckResult.domain}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full font-bold uppercase tracking-wider text-[10px] ${
                      quickCheckResult.status === 'available'
                        ? 'bg-[#11C5A3]/20 text-[#11C5A3] border border-[#11C5A3]/40'
                        : quickCheckResult.status === 'premium'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    }`}
                  >
                    {quickCheckResult.status}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-300">Brand Score: {quickCheckResult.brandScore}/100</span>
                  <button
                    type="button"
                    onClick={() => {
                      setWizardData(prev => ({ ...prev, idea: `Platform based on ${quickCheckResult.domain}` }));
                      setView('wizard');
                    }}
                    className="text-[#4FE6CF] hover:underline font-bold"
                  >
                    Open in Wizard →
                  </button>
                </div>
              </div>
            )}
          </form>

          {/* Primary CTA Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setView('wizard')}
              className="flex items-center gap-2 px-8 py-4 rounded-xl text-base font-extrabold bg-gradient-to-r from-[#11C5A3] to-[#0CA588] text-[#062B5B] shadow-xl shadow-[#11C5A3]/30 hover:shadow-[#11C5A3]/50 hover:from-[#4FE6CF] hover:to-[#11C5A3] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Sparkles className="w-5 h-5 fill-[#062B5B]" />
              <span>Generate Domain</span>
              <ArrowRight className="w-5 h-5 ml-1" />
            </button>

            <button
              onClick={() => setIsDemoOpen(true)}
              className="flex items-center gap-2.5 px-6 py-4 rounded-xl text-base font-bold bg-[#112236] border border-slate-700/80 text-white hover:bg-[#162C47] hover:border-[#11C5A3]/40 shadow-lg transition-all"
            >
              <div className="w-7 h-7 rounded-full bg-[#062B5B] border border-[#11C5A3]/40 flex items-center justify-center">
                <Play className="w-3.5 h-3.5 text-[#11C5A3] fill-[#11C5A3] ml-0.5" />
              </div>
              <span>Watch Demo</span>
            </button>
          </div>

          {/* Popular Trending Suggestions preview ticker */}
          <div className="mt-12 w-full max-w-3xl">
            <p className="text-xs font-semibold text-slate-400 tracking-wider uppercase mb-3">
              Live AI Generation Stream
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {samplePopularDomains.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setWizardData(prev => ({ ...prev, idea: `AI solution around ${item.domain}` }));
                    setView('wizard');
                  }}
                  className="glass-card p-3 rounded-xl cursor-pointer text-left group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs font-bold text-white group-hover:text-[#4FE6CF] transition-colors truncate">
                      {item.domain}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span
                      className={`font-semibold capitalize ${
                        item.status === 'available'
                          ? 'text-[#11C5A3]'
                          : item.status === 'premium'
                          ? 'text-amber-400'
                          : 'text-rose-400'
                      }`}
                    >
                      {item.status}
                    </span>
                    <span className="text-slate-400">Score {item.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trust Highlights */}
          <div className="mt-14 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-left w-full max-w-4xl">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#062B5B]/80 text-[#11C5A3] border border-[#11C5A3]/20">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <p className="text-lg font-bold text-white">180+ TLDs</p>
                <p className="text-xs text-slate-400">Full TLD coverage</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#062B5B]/80 text-[#11C5A3] border border-[#11C5A3]/20">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div>
                <p className="text-lg font-bold text-white">99.4%</p>
                <p className="text-xs text-slate-400">Availability accuracy</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#062B5B]/80 text-[#11C5A3] border border-[#11C5A3]/20">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <p className="text-lg font-bold text-white">&lt; 350ms</p>
                <p className="text-xs text-slate-400">Live DNS latency</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#062B5B]/80 text-[#11C5A3] border border-[#11C5A3]/20">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-lg font-bold text-white">48,000+</p>
                <p className="text-xs text-slate-400">Startups launched</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
