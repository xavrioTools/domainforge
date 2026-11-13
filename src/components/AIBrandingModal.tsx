import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { AIBrandingBlueprint } from '../types';
import { getAIBranding } from '../services/api';
import {
  Sparkles,
  X,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  ShieldAlert,
  Search,
  Layers,
  Palette,
  Hash,
  Share2,
  ExternalLink,
  Target,
  BookmarkCheck,
  Globe,
  Award,
  Zap,
  TrendingUp
} from 'lucide-react';

export const AIBrandingModal: React.FC = () => {
  const { activeBrandingDomain, setActiveBrandingDomain, wizardData, showToast, toggleSaveDomain, isDomainSaved } = useApp();
  const [data, setData] = useState<AIBrandingBlueprint | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'assistant' | 'business' | 'social' | 'logo' | 'keywords' | 'protection'>('assistant');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    if (!activeBrandingDomain) {
      setData(null);
      return;
    }

    let isMounted = true;
    setLoading(true);

    getAIBranding(activeBrandingDomain.domain, wizardData.niche, wizardData.idea)
      .then(res => {
        if (isMounted) {
          setData(res);
          setLoading(false);
        }
      })
      .catch(err => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [activeBrandingDomain, wizardData.niche, wizardData.idea]);

  if (!activeBrandingDomain) return null;

  const handleCopyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    showToast(`Copied "${text}"!`, 'success');
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const isSaved = isDomainSaved(activeBrandingDomain.domain);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl glass-panel border border-slate-700 shadow-2xl overflow-hidden my-auto">
        {/* Top Header */}
        <div className="p-6 border-b border-slate-800/90 bg-[#0D1B2A]/90 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 truncate">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#062B5B] to-[#11C5A3] p-[2px] shrink-0">
              <div className="w-full h-full bg-[#0D1B2A] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#11C5A3]" />
              </div>
            </div>
            <div className="truncate">
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-mono font-extrabold text-white truncate">
                  {activeBrandingDomain.domain}
                </h2>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    activeBrandingDomain.status === 'available'
                      ? 'bg-[#11C5A3]/20 text-[#11C5A3]'
                      : activeBrandingDomain.status === 'premium'
                      ? 'bg-amber-500/20 text-amber-300'
                      : 'bg-rose-500/20 text-rose-300'
                  }`}
                >
                  {activeBrandingDomain.status}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                AI Brand Intelligence & Comprehensive Startup Blueprint
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => toggleSaveDomain(activeBrandingDomain)}
              className="p-2 rounded-xl bg-[#112236] border border-slate-700 text-slate-300 hover:text-white"
              title="Save Domain"
            >
              <BookmarkCheck className={`w-4 h-4 ${isSaved ? 'text-[#11C5A3] fill-[#11C5A3]' : ''}`} />
            </button>
            <button
              onClick={() => setActiveBrandingDomain(null)}
              className="p-2 rounded-xl bg-[#112236] border border-slate-700 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Feature Tab Navigation */}
        <div className="px-6 py-2.5 bg-[#112236]/70 border-b border-slate-800 flex items-center gap-2 overflow-x-auto text-xs font-semibold">
          {[
            { id: 'assistant', label: '1. AI Branding Assistant', icon: Target },
            { id: 'business', label: '2. Names & Slogans', icon: Sparkles },
            { id: 'social', label: '3. Social Usernames', icon: Globe },
            { id: 'logo', label: '4. AI Logo Concepts', icon: Palette },
            { id: 'keywords', label: '5. SEO Keywords', icon: Hash },
            { id: 'protection', label: '6. Brand Protection', icon: ShieldAlert },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl shrink-0 transition-all ${
                  isActive
                    ? 'bg-[#062B5B] text-white border border-[#11C5A3]/40 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#11C5A3]' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {loading ? (
            <div className="py-20 text-center space-y-4">
              <div className="w-12 h-12 border-3 border-[#11C5A3] border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-sm font-semibold text-white">
                Synthesizing AI Branding Blueprint...
              </p>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Analyzing phonetics, market resonance, trademark protection, and cross-platform handles.
              </p>
            </div>
          ) : !data ? (
            <div className="py-12 text-center text-slate-400 text-sm">
              Failed to load brand data. Please try again.
            </div>
          ) : (
            <div className="space-y-6">
              {/* TAB 1: AI Branding Assistant */}
              {activeTab === 'assistant' && (
                <div className="space-y-6 animate-in fade-in">
                  <div className="p-5 rounded-2xl bg-[#062B5B]/40 border border-[#11C5A3]/30">
                    <span className="text-xs font-bold text-[#11C5A3] uppercase tracking-wider block mb-1">
                      Niche Fit Analysis
                    </span>
                    <p className="text-sm text-slate-200 leading-relaxed">
                      {data.nicheFitExplanation}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                      <Target className="w-4 h-4 text-[#11C5A3]" />
                      Branding & Market Opportunities
                    </h3>
                    <div className="space-y-2.5">
                      {data.brandingOpportunities.map((opp, i) => (
                        <div
                          key={i}
                          className="p-3.5 rounded-xl bg-[#112236] border border-slate-700/80 flex items-start gap-3"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#11C5A3] shrink-0 mt-0.5" />
                          <p className="text-xs sm:text-sm text-slate-300">{opp}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#112236]/90 border border-slate-700/80">
                    <h4 className="text-xs font-bold text-[#4FE6CF] uppercase tracking-wider mb-2">
                      Marketing & Organic Growth Potential
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {data.marketingPotential}
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 2: Business Name Suggestions */}
              {activeTab === 'business' && (
                <div className="space-y-5 animate-in fade-in">
                  <div className="p-5 rounded-2xl bg-[#112236] border border-slate-700 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                        Recommended Startup Entity Name
                      </span>
                      <p className="text-xl font-extrabold text-white mt-1">{data.companyName}</p>
                    </div>
                    <button
                      onClick={() => handleCopyText(data.companyName, 'companyName')}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#062B5B] border border-[#11C5A3]/40 text-xs font-semibold text-slate-200 hover:text-white"
                    >
                      {copiedKey === 'companyName' ? <Check className="w-3.5 h-3.5 text-[#11C5A3]" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>Copy</span>
                    </button>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#112236] border border-slate-700 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                        Brand Tagline
                      </span>
                      <p className="text-base font-semibold text-[#4FE6CF] mt-1">"{data.tagline}"</p>
                    </div>
                    <button
                      onClick={() => handleCopyText(data.tagline, 'tagline')}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#062B5B] border border-[#11C5A3]/40 text-xs font-semibold text-slate-200 hover:text-white"
                    >
                      {copiedKey === 'tagline' ? <Check className="w-3.5 h-3.5 text-[#11C5A3]" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>Copy</span>
                    </button>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#112236] border border-slate-700 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                        Customer Slogan
                      </span>
                      <p className="text-base font-semibold text-slate-200 mt-1">"{data.slogan}"</p>
                    </div>
                    <button
                      onClick={() => handleCopyText(data.slogan, 'slogan')}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#062B5B] border border-[#11C5A3]/40 text-xs font-semibold text-slate-200 hover:text-white"
                    >
                      {copiedKey === 'slogan' ? <Check className="w-3.5 h-3.5 text-[#11C5A3]" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>Copy</span>
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 3: Social Media Username Checker */}
              {activeTab === 'social' && (
                <div className="space-y-4 animate-in fade-in">
                  <p className="text-xs text-slate-300">
                    Cross-platform social media handle availability estimates for this brand:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {data.socialUsernames.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl bg-[#112236] border border-slate-700/80 flex items-center justify-between"
                      >
                        <div>
                          <p className="text-xs font-bold text-white">{item.platform}</p>
                          <p className="font-mono text-xs text-[#4FE6CF] mt-0.5">{item.handle}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#11C5A3]/15 text-[#11C5A3] border border-[#11C5A3]/30 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            Likely Available
                          </span>
                          <button
                            onClick={() => handleCopyText(item.handle, `social_${idx}`)}
                            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                            title="Copy handle"
                          >
                            {copiedKey === `social_${idx}` ? (
                              <Check className="w-3.5 h-3.5 text-[#11C5A3]" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: AI Logo Concepts */}
              {activeTab === 'logo' && (
                <div className="space-y-6 animate-in fade-in">
                  <p className="text-xs text-slate-300">
                    Text-based AI visual identity designs & typographic art direction:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {data.logoConcepts.map((logo, idx) => (
                      <div
                        key={idx}
                        className="glass-card rounded-2xl p-5 border border-slate-700/80 flex flex-col justify-between space-y-4"
                      >
                        {/* Visual Identity Preview Box */}
                        <div className="w-full h-32 rounded-xl bg-gradient-to-br from-[#062B5B] via-[#0D1B2A] to-[#112236] border border-slate-700 flex flex-col items-center justify-center p-3 text-center shadow-inner">
                          <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">
                            {logo.symbol}
                          </span>
                          <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white via-[#4FE6CF] to-[#11C5A3] bg-clip-text text-transparent">
                            {activeBrandingDomain.name.toUpperCase()}
                          </span>
                          <span className="text-[10px] text-slate-400 tracking-wider uppercase mt-1">
                            {logo.fontRecommendation}
                          </span>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="text-sm font-bold text-white">{logo.style}</h4>
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            {logo.description}
                          </p>
                        </div>

                        {/* Color Swatches */}
                        <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                          <span className="text-slate-400">Palette:</span>
                          <div className="flex items-center gap-1.5">
                            {logo.colors.map((c, i) => (
                              <div
                                key={i}
                                className="w-4 h-4 rounded-full border border-white/20 shadow-sm"
                                style={{ backgroundColor: c }}
                                title={c}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: Keyword Suggestions */}
              {activeTab === 'keywords' && (
                <div className="space-y-4 animate-in fade-in">
                  <p className="text-xs text-slate-300">
                    High-value organic search terms to target for this domain:
                  </p>
                  <div className="overflow-hidden rounded-2xl border border-slate-700/80 bg-[#112236]">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#0D1B2A] text-slate-400 font-bold border-b border-slate-700">
                        <tr>
                          <th className="p-3">Target Keyword</th>
                          <th className="p-3">Search Volume</th>
                          <th className="p-3">SEO Difficulty</th>
                          <th className="p-3 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 text-slate-200">
                        {data.seoKeywords.map((kw, i) => (
                          <tr key={i} className="hover:bg-slate-800/50">
                            <td className="p-3 font-semibold text-white">{kw.keyword}</td>
                            <td className="p-3">
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#11C5A3]/15 text-[#11C5A3]">
                                {kw.volume}
                              </span>
                            </td>
                            <td className="p-3">
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                  kw.difficulty === 'Low'
                                    ? 'bg-emerald-500/15 text-emerald-300'
                                    : kw.difficulty === 'Medium'
                                    ? 'bg-amber-500/15 text-amber-300'
                                    : 'bg-rose-500/15 text-rose-300'
                                }`}
                              >
                                {kw.difficulty}
                              </span>
                            </td>
                            <td className="p-3 text-right">
                              <button
                                onClick={() => handleCopyText(kw.keyword, `kw_${i}`)}
                                className="text-slate-400 hover:text-white text-xs font-semibold"
                              >
                                {copiedKey === `kw_${i}` ? 'Copied' : 'Copy'}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 6: Brand Protection */}
              {activeTab === 'protection' && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
                    <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                        Smart Brand Protection Plan
                      </h4>
                      <p className="text-xs text-slate-300 mt-1">
                        Secure key defensive variants, TLD offshoots, and typosquatting vectors before launching marketing campaigns.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    {data.brandProtection.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-[#112236] border border-slate-700/80 flex items-center justify-between"
                      >
                        <p className="text-xs sm:text-sm text-slate-200">{item}</p>
                        <span className="shrink-0 text-xs font-bold text-[#11C5A3] px-2.5 py-1 rounded-xl bg-[#062B5B]">
                          Action Item
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 border-t border-slate-800 bg-[#0D1B2A] flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-400">
            Domain: <strong className="text-white font-mono">{activeBrandingDomain.domain}</strong>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveBrandingDomain(null)}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#112236] border border-slate-700 text-slate-200 hover:text-white"
            >
              Close
            </button>
            <a
              href={`https://www.namecheap.com/domains/registration/results/?domain=${encodeURIComponent(activeBrandingDomain.domain)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#11C5A3] text-[#062B5B] hover:bg-[#4FE6CF] flex items-center gap-1.5 shadow-md shadow-[#11C5A3]/20"
            >
              <span>Register This Domain</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
