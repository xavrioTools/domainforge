import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Scale,
  X,
  Sparkles,
  ExternalLink,
  BookmarkCheck,
  CheckCircle2,
  Award,
  ArrowRight
} from 'lucide-react';
import { getRegistrarUrl } from '../utils/export';

export const DomainComparisonModal: React.FC = () => {
  const {
    comparedDomains,
    toggleCompareDomain,
    clearComparison,
    setView,
    setActiveBrandingDomain,
    toggleSaveDomain,
    isDomainSaved,
  } = useApp();

  if (comparedDomains.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-2xl bg-[#112236] border border-slate-700 flex items-center justify-center mx-auto mb-4 text-[#11C5A3]">
          <Scale className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-extrabold text-white">No Domains in Comparison</h2>
        <p className="text-sm text-slate-300 mt-2 mb-6">
          Check the "Compare domain" box on any domain card in the results to contrast up to 3 domains side-by-side.
        </p>
        <button
          onClick={() => setView('results')}
          className="px-6 py-2.5 rounded-xl font-bold text-xs bg-[#11C5A3] text-[#062B5B] hover:bg-[#4FE6CF]"
        >
          View Results →
        </button>
      </div>
    );
  }

  // Determine top contender
  const sortedByBrand = [...comparedDomains].sort((a, b) => b.brandScore - a.brandScore);
  const bestDomain = sortedByBrand[0]?.domain;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#11C5A3] mb-1">
            <Scale className="w-4 h-4 text-[#11C5A3]" />
            <span>SIDE-BY-SIDE MATRIX</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Domain Comparison Tool</h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Comparing {comparedDomains.length} candidate domains on brandability, phonetics, and SEO velocity.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={clearComparison}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#112236] border border-slate-700 text-slate-300 hover:text-white"
          >
            Clear All
          </button>
          <button
            onClick={() => setView('results')}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-[#11C5A3] text-[#062B5B] hover:bg-[#4FE6CF]"
          >
            Back to Results
          </button>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className={`mt-8 grid grid-cols-1 md:grid-cols-${comparedDomains.length} gap-6`}>
        {comparedDomains.map(item => {
          const isWinner = item.domain === bestDomain && comparedDomains.length > 1;
          const isSaved = isDomainSaved(item.domain);

          return (
            <div
              key={item.domain}
              className={`glass-panel rounded-3xl p-6 sm:p-7 relative border flex flex-col justify-between ${
                isWinner ? 'border-[#11C5A3] ring-2 ring-[#11C5A3]/30 bg-[#062B5B]/30' : 'border-slate-700'
              }`}
            >
              {isWinner && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#11C5A3] text-[#062B5B] text-[10px] font-extrabold uppercase tracking-widest flex items-center gap-1 shadow-md">
                  <Award className="w-3.5 h-3.5" />
                  <span>Top AI Recommendation</span>
                </div>
              )}

              <div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-mono text-2xl font-extrabold text-white">
                      {item.domain}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">{item.tagline}</p>
                  </div>
                  <button
                    onClick={() => toggleCompareDomain(item)}
                    className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                    title="Remove from comparison"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Status pill */}
                <div className="mb-6">
                  <span
                    className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold uppercase ${
                      item.status === 'available'
                        ? 'bg-[#11C5A3]/15 text-[#11C5A3] border border-[#11C5A3]/30'
                        : item.status === 'premium'
                        ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                        : 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                {/* Metrics Matrix Table */}
                <div className="space-y-3 py-4 border-t border-b border-slate-800 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Brand Score:</span>
                    <span className="font-extrabold text-base text-[#11C5A3]">
                      {item.brandScore}/100
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Memorability:</span>
                    <span className="font-bold text-white">{item.memorabilityScore}/100</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Pronunciation Ease:</span>
                    <span className="font-bold text-white">{item.pronunciationScore}/100</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">SEO Potential:</span>
                    <span className="font-bold text-[#4FE6CF]">{item.seoPotentialScore}/100</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Character Count:</span>
                    <span className="font-mono text-white">{item.domain.length} characters</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Estimated Value:</span>
                    <span className="font-mono text-[#11C5A3]">{item.estimatedValue || '$12/yr'}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">TLD Power:</span>
                    <span className="font-bold text-slate-300">
                      {item.extension === '.com'
                        ? 'Tier 1 (Universal)'
                        : item.extension === '.ai'
                        ? 'Tier 1 (AI Tech)'
                        : item.extension === '.io'
                        ? 'Tier 1 (Developer)'
                        : 'Tier 2 (Modern)'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-6 space-y-2">
                <button
                  onClick={() => setActiveBrandingDomain(item)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold bg-[#062B5B] text-white border border-[#11C5A3]/40 hover:bg-[#0B3D7B] transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#11C5A3]" />
                  <span>View Branding Blueprint</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => toggleSaveDomain(item)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border ${
                      isSaved ? 'bg-[#11C5A3]/20 border-[#11C5A3] text-[#11C5A3]' : 'bg-[#112236] border-slate-700 text-slate-300'
                    }`}
                  >
                    {isSaved ? 'Saved' : 'Save'}
                  </button>

                  <a
                    href={getRegistrarUrl(item.domain, 'namecheap')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1 py-2 px-3 rounded-xl text-xs font-bold bg-[#11C5A3] text-[#062B5B] hover:bg-[#4FE6CF]"
                  >
                    <span>Register</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
