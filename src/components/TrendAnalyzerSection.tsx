import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  TrendingUp,
  Sparkles,
  ArrowUpRight,
  Flame,
  Globe,
  Zap,
  BarChart2,
  Layers,
  ArrowRight
} from 'lucide-react';

export const TrendAnalyzerSection: React.FC = () => {
  const { setWizardData, runGeneration, setView } = useApp();

  const trends = [
    {
      category: 'Autonomous Agents & Cognitive Workflows',
      suffix: '.ai',
      growth: '+284%',
      searchVol: '2.4M searches/mo',
      heat: 'Explosive',
      description: 'Massive surge in domain registrations featuring "agent", "neural", "task", and "flow".',
      examples: ['agentflow.ai', 'neuralpulse.ai', 'cortexforge.ai']
    },
    {
      category: 'Minimalist 4-5 Letter Brandables',
      suffix: '.io / .co',
      growth: '+142%',
      searchVol: '1.8M searches/mo',
      heat: 'High Liquidity',
      description: 'Acoustically crisp, low-syllable consonant-vowel combinations highly coveted by Series-A founders.',
      examples: ['kuro.io', 'zivo.co', 'viva.app']
    },
    {
      category: 'Curated D2C & Creator Commerce',
      suffix: '.store',
      growth: '+89%',
      searchVol: '920K searches/mo',
      heat: 'Rising',
      description: 'Clean boutique retailers shifting away from crowded .com variations to dedicated .store storefronts.',
      examples: ['haven.store', 'solace.store', 'craft.store']
    },
    {
      category: 'Developer Platforms & Cloud DevOps',
      suffix: '.dev / .tech',
      growth: '+118%',
      searchVol: '1.5M searches/mo',
      heat: 'Steady',
      description: 'API-first companies, CLI packages, and infrastructure tooling driving technical extensions.',
      examples: ['stackpulse.dev', 'synthetix.tech', 'axon.dev']
    }
  ];

  const handleApplyTrend = (trend: typeof trends[0]) => {
    setWizardData(prev => ({
      ...prev,
      niche: trend.category.split('&')[0].trim(),
      idea: `A high-growth venture in ${trend.category} focusing on speed and modern user experience`,
      extensions: [trend.suffix.split(' ')[0], '.com'],
    }));
    runGeneration({
      niche: trend.category.split('&')[0].trim(),
      idea: `A high-growth venture in ${trend.category} focusing on speed and modern user experience`,
      extensions: [trend.suffix.split(' ')[0], '.com'],
    });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#112236] border border-[#11C5A3]/30 text-xs font-semibold text-[#11C5A3] mb-3">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>AI Industry Trend Radar</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Emerging Domain & Naming Trends
          </h2>
          <p className="text-sm text-slate-300 mt-2 max-w-2xl">
            Real-time registry intelligence tracking registration volume, average sale valuations, and semantic keyword velocity.
          </p>
        </div>

        {/* Global Registry Barometer */}
        <div className="p-4 rounded-2xl bg-[#112236] border border-slate-700/80 flex items-center gap-6 shrink-0 text-xs">
          <div>
            <span className="text-slate-400 block text-[11px]">Fastest Growing TLD:</span>
            <span className="font-mono text-base font-extrabold text-[#11C5A3]">.ai (+284%)</span>
          </div>
          <div className="border-l border-slate-700 pl-6">
            <span className="text-slate-400 block text-[11px]">Global .com Availability:</span>
            <span className="font-mono text-base font-extrabold text-amber-300">14.2%</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {trends.map((trend, idx) => (
          <div
            key={idx}
            className="glass-card rounded-3xl p-7 border border-slate-700/80 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#062B5B] text-[#4FE6CF] border border-[#11C5A3]/30 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-[#11C5A3]" />
                  {trend.heat}
                </span>
                <span className="font-mono text-sm font-bold text-[#11C5A3] flex items-center gap-0.5">
                  <ArrowUpRight className="w-4 h-4" />
                  {trend.growth}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white group-hover:text-[#4FE6CF] transition-colors">
                {trend.category}
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                {trend.description}
              </p>

              {/* Sample names pills */}
              <div className="mt-5">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-2">
                  High-Scoring Pattern Examples:
                </span>
                <div className="flex flex-wrap gap-2">
                  {trend.examples.map((ex, i) => (
                    <span
                      key={i}
                      className="font-mono text-xs px-2.5 py-1 rounded-lg bg-[#0D1B2A] border border-slate-700 text-slate-200"
                    >
                      {ex}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400">{trend.searchVol}</span>
              <button
                onClick={() => handleApplyTrend(trend)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#062B5B] text-white border border-[#11C5A3]/40 hover:bg-[#11C5A3] hover:text-[#062B5B] transition-all"
              >
                <span>Generate in this Trend</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
