import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Check,
  Zap,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  HelpCircle,
  CreditCard
} from 'lucide-react';

export const PricingSection: React.FC = () => {
  const { user, upgradeToPro, setView } = useApp();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  const freeFeatures = [
    '10 domain generations per day',
    'Standard brand scoring (Brand, Recall, Phonics)',
    'Real-time DNS availability check',
    'Save up to 10 favorite domains',
    'Basic search history'
  ];

  const proFeatures = [
    'Unlimited daily domain generations',
    'Advanced AI Branding Assistant & Blueprint',
    'Business name, tagline & customer slogans',
    'Live social media handle checker (X, IG, TikTok, etc.)',
    'AI Logo Concepts with typography & palettes',
    'Organic SEO Keyword suggestions with search volume',
    'Smart Brand Protection & defensive TLD alerts',
    'Instant Export to CSV, JSON, and PDF reports',
    'Side-by-side Domain Comparison Matrix',
    'Domain Monitoring Watchlist with drop alerts'
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#112236] border border-[#11C5A3]/30 text-xs font-semibold text-[#11C5A3] mb-4">
          <Zap className="w-3.5 h-3.5 fill-[#11C5A3]" />
          <span>Transparent Founder Pricing</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Simple Plans for Visionary Builders
        </h2>
        <p className="mt-4 text-base text-slate-300">
          Start for free to test ideas or upgrade to Pro for unrestricted AI naming intelligence, brand protection, and instant exports.
        </p>

        {/* Monthly / Yearly Toggle */}
        <div className="mt-8 inline-flex items-center p-1.5 rounded-2xl bg-[#112236] border border-slate-700">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              billingCycle === 'monthly'
                ? 'bg-[#062B5B] text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              billingCycle === 'yearly'
                ? 'bg-[#11C5A3] text-[#062B5B] shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>Yearly (Save 35%)</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#062B5B] text-[#4FE6CF]">
              Popular
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
        {/* FREE PLAN */}
        <div className="glass-card rounded-3xl p-8 border border-slate-700/80 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">Starter</h3>
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300">
                Free Forever
              </span>
            </div>
            <p className="text-xs text-slate-400 mb-6">
              Ideal for exploring early product ideas and checking domain availability.
            </p>

            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-4xl font-extrabold text-white">$0</span>
              <span className="text-xs text-slate-400">/ forever</span>
            </div>

            <div className="space-y-3 pt-6 border-t border-slate-800 text-xs">
              {freeFeatures.map((feat, i) => (
                <div key={i} className="flex items-center gap-2.5 text-slate-300">
                  <Check className="w-4 h-4 text-[#11C5A3] shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800">
            <button
              onClick={() => setView('wizard')}
              className="w-full py-3.5 rounded-xl text-xs font-bold bg-[#112236] border border-slate-700 text-slate-200 hover:text-white hover:border-[#11C5A3]/40 transition-all"
            >
              Current Plan • Launch Generator
            </button>
          </div>
        </div>

        {/* PRO PLAN */}
        <div className="glass-panel rounded-3xl p-8 border-2 border-[#11C5A3] relative flex flex-col justify-between shadow-2xl shadow-[#11C5A3]/10 bg-[#062B5B]/30">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#11C5A3] text-[#062B5B] text-xs font-extrabold uppercase tracking-wider shadow-lg flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 fill-[#062B5B]" />
            <span>Recommended for Founders</span>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">DomainForge Pro</h3>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#11C5A3]/20 text-[#11C5A3] border border-[#11C5A3]/40">
                All Access
              </span>
            </div>
            <p className="text-xs text-slate-300 mb-6">
              Full AI branding suite, unlimited domain generations, export tools, and trademark defense.
            </p>

            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-5xl font-extrabold text-white">
                {billingCycle === 'yearly' ? '$14' : '$22'}
              </span>
              <span className="text-xs text-slate-300">
                / month {billingCycle === 'yearly' && '(billed annually)'}
              </span>
            </div>

            <div className="space-y-3 pt-6 border-t border-slate-700/80 text-xs">
              {proFeatures.map((feat, i) => (
                <div key={i} className="flex items-center gap-2.5 text-white font-medium">
                  <Check className="w-4 h-4 text-[#11C5A3] shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-700/80">
            {user.tier === 'pro' ? (
              <div className="w-full py-3.5 rounded-xl text-center text-xs font-bold bg-[#11C5A3] text-[#062B5B]">
                ✓ You Are on the Pro Plan!
              </div>
            ) : (
              <button
                onClick={upgradeToPro}
                className="w-full py-3.5 rounded-xl text-xs font-extrabold bg-gradient-to-r from-[#11C5A3] to-[#0CA588] text-[#062B5B] hover:from-[#4FE6CF] hover:to-[#11C5A3] shadow-lg shadow-[#11C5A3]/30 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
              >
                <Sparkles className="w-4 h-4 fill-[#062B5B]" />
                <span>Upgrade to Pro Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
