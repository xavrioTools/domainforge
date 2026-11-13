import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  Zap,
  BarChart3,
  Sliders,
  Globe,
  BookmarkCheck,
  ArrowRight
} from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const { setView } = useApp();

  const features = [
    {
      icon: Sparkles,
      title: '1. AI Domain Generation',
      description:
        'Uses advanced LLM reasoning to invent brandable, category-defining names matched to your exact business niche, vision, and semantic intent.',
      badge: 'Gemini 3.8 Powered',
      color: 'from-[#062B5B] to-[#11C5A3]'
    },
    {
      icon: Zap,
      title: '2. Real Time Availability Checker',
      description:
        'Instantaneous DNS-over-HTTPS queries inspect authoritative A, AAAA, and NS records in milliseconds so you never waste time on taken names.',
      badge: 'Live DNS Sync',
      color: 'from-[#11C5A3] to-[#4FE6CF]'
    },
    {
      icon: BarChart3,
      title: '3. Brand Score Analysis',
      description:
        'Multi-factor evaluation computes memorability, phonetic pronunciation velocity, syllable cadence, and organic search SEO potential out of 100.',
      badge: 'Proprietary Algorithm',
      color: 'from-[#062B5B] to-[#4FE6CF]'
    },
    {
      icon: Sliders,
      title: '4. Domain Length Control',
      description:
        'Surgically filter between ultra-short (3-6 characters), standard startup (6-10 characters), or descriptive compound names (10-15 characters).',
      badge: 'Custom Filters',
      color: 'from-[#112236] to-[#11C5A3]'
    },
    {
      icon: Globe,
      title: '5. Multiple Extensions',
      description:
        'Simultaneously generate and contrast names across top-tier TLDs including .com, .io, .ai, .co, .tech, .store, .app, and .dev.',
      badge: '180+ TLDs',
      color: 'from-[#062B5B] to-[#11C5A3]'
    },
    {
      icon: BookmarkCheck,
      title: '6. Save Favorites & Monitoring',
      description:
        'Curate your personal shortlist, add private evaluation notes, export directly to CSV/PDF, and monitor taken domains for expiration.',
      badge: 'Shortlist Sync',
      color: 'from-[#11C5A3] to-[#0CA588]'
    }
  ];

  return (
    <section className="py-20 relative border-t border-slate-800/80 bg-[#0D1B2A]/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#112236] border border-[#11C5A3]/30 text-xs font-semibold text-[#11C5A3] mb-4">
            <span>Built for Modern Founders</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Everything You Need to Claim a{' '}
            <span className="gradient-ocean-text">World-Class Brand</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Stop settling for hyphenated domains or awkward compromises. DomainForge combines linguistic science with real-time domain registries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="glass-card rounded-2xl p-7 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Glow accent */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#11C5A3]/10 rounded-full blur-2xl group-hover:bg-[#11C5A3]/20 transition-all" />

                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#062B5B] to-[#112236] border border-[#11C5A3]/30 flex items-center justify-center text-[#11C5A3] shadow-md group-hover:scale-110 group-hover:border-[#11C5A3] transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#112236] text-[#4FE6CF] border border-slate-700">
                      {feature.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2.5 group-hover:text-[#4FE6CF] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-[#11C5A3]">
                  <span>Explore feature</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Action strip */}
        <div className="mt-14 p-8 rounded-2xl bg-gradient-to-r from-[#062B5B] via-[#0B3D7B] to-[#112236] border border-[#11C5A3]/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div>
            <h4 className="text-xl font-bold text-white">Ready to test the Domain Generation Wizard?</h4>
            <p className="text-sm text-slate-300 mt-1">
              7-step guided process tailored to your niche, business category, and branding taste.
            </p>
          </div>
          <button
            onClick={() => setView('wizard')}
            className="shrink-0 px-6 py-3.5 rounded-xl font-bold text-sm bg-[#11C5A3] text-[#062B5B] hover:bg-[#4FE6CF] transition-all shadow-lg shadow-[#11C5A3]/25"
          >
            Launch 7-Step Wizard →
          </button>
        </div>
      </div>
    </section>
  );
};
