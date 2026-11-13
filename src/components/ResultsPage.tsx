import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { DomainSuggestion } from '../types';
import {
  Sparkles,
  Copy,
  Check,
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  Info,
  Scale,
  Download,
  Share2,
  FileSpreadsheet,
  Printer,
  Filter,
  ArrowUpDown,
  RefreshCw,
  Search,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Globe,
  Award,
  Zap,
  SlidersHorizontal
} from 'lucide-react';
import { exportToCSV, exportToJSON, triggerPrintReport, getRegistrarUrl } from '../utils/export';

export const ResultsPage: React.FC = () => {
  const {
    results,
    isGenerating,
    runGeneration,
    wizardData,
    toggleSaveDomain,
    isDomainSaved,
    setActiveBrandingDomain,
    comparedDomains,
    toggleCompareDomain,
    setView,
    showToast,
  } = useApp();

  const [copiedDomain, setCopiedDomain] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExtension, setSelectedExtension] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'brand' | 'memorability' | 'seo' | 'length' | 'alpha'>('brand');
  const [registrarModalDomain, setRegistrarModalDomain] = useState<string | null>(null);

  const handleCopy = (domain: string) => {
    navigator.clipboard.writeText(domain);
    setCopiedDomain(domain);
    showToast(`Copied ${domain} to clipboard!`, 'success');
    setTimeout(() => {
      setCopiedDomain(null);
    }, 2000);
  };

  const handleShareLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    showToast('Shareable link copied to clipboard!', 'success');
  };

  // Filtered and sorted results
  const filteredResults = useMemo(() => {
    return results
      .filter(item => {
        if (selectedExtension !== 'all' && item.extension !== selectedExtension) return false;
        if (selectedStatus !== 'all' && item.status !== selectedStatus) return false;
        if (searchTerm && !item.domain.toLowerCase().includes(searchTerm.toLowerCase())) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'brand') return b.brandScore - a.brandScore;
        if (sortBy === 'memorability') return b.memorabilityScore - a.memorabilityScore;
        if (sortBy === 'seo') return b.seoPotentialScore - a.seoPotentialScore;
        if (sortBy === 'length') return a.domain.length - b.domain.length;
        if (sortBy === 'alpha') return a.domain.localeCompare(b.domain);
        return 0;
      });
  }, [results, selectedExtension, selectedStatus, searchTerm, sortBy]);

  // Loading Skeleton State
  if (isGenerating) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#062B5B] to-[#11C5A3] p-[2px] mx-auto mb-4 animate-spin">
            <div className="w-full h-full bg-[#0D1B2A] rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-[#11C5A3]" />
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Forging Brandable Domains...
          </h2>
          <p className="text-sm text-slate-300 mt-2">
            AI is analyzing linguistic resonance for <span className="text-[#11C5A3] font-semibold">{wizardData.niche}</span>, querying DNS over HTTPS, and calculating multi-factor brand scores.
          </p>
        </div>

        {/* Skeleton Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="glass-card rounded-2xl p-6 border border-slate-800 animate-pulse space-y-4"
            >
              <div className="flex justify-between items-center">
                <div className="h-6 w-36 bg-slate-700/60 rounded-md" />
                <div className="h-5 w-20 bg-slate-700/50 rounded-full" />
              </div>
              <div className="h-4 w-48 bg-slate-800/80 rounded" />
              <div className="grid grid-cols-3 gap-2 pt-2">
                <div className="h-10 bg-slate-800/60 rounded-lg" />
                <div className="h-10 bg-slate-800/60 rounded-lg" />
                <div className="h-10 bg-slate-800/60 rounded-lg" />
              </div>
              <div className="flex gap-2 pt-2">
                <div className="h-9 w-full bg-slate-700/40 rounded-xl" />
                <div className="h-9 w-9 bg-slate-700/40 rounded-xl shrink-0" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Empty State
  if (results.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="w-16 h-16 rounded-2xl bg-[#112236] border border-slate-700 flex items-center justify-center mx-auto mb-4 text-[#11C5A3]">
          <Globe className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-extrabold text-white">No Domains Generated Yet</h2>
        <p className="text-slate-300 text-sm mt-2 mb-6">
          Step into our 7-step guided domain wizard or choose an instant template to discover 20+ available domain recommendations.
        </p>
        <button
          onClick={() => setView('wizard')}
          className="px-6 py-3 rounded-xl font-bold text-sm bg-[#11C5A3] text-[#062B5B] hover:bg-[#4FE6CF] shadow-lg shadow-[#11C5A3]/20"
        >
          Launch Wizard →
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Top Header & Re-forge Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#11C5A3] mb-1">
            <span className="w-2 h-2 rounded-full bg-[#11C5A3] animate-pulse" />
            <span>AI DOMAIN RESULTS FOR "{wizardData.niche.toUpperCase()}"</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">
            {filteredResults.length} Domain Names Discovered
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            Real-time DNS status verified. Click <strong className="text-white">Check Details</strong> to view complete AI branding blueprints, social handles, logo concepts, and SEO keywords.
          </p>
        </div>

        {/* Global Toolbar: Export, Share, Compare, Re-run */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => runGeneration()}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#112236] text-white border border-slate-700 hover:border-[#11C5A3]/40 transition-all"
            title="Re-run AI generation with current parameters"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#11C5A3]" />
            <span>Re-Generate</span>
          </button>

          <button
            onClick={() => exportToCSV(results)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#112236] text-white border border-slate-700 hover:border-[#11C5A3]/40 transition-all"
            title="Export results to CSV"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-[#4FE6CF]" />
            <span>Excel / CSV</span>
          </button>

          <button
            onClick={() => triggerPrintReport()}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#112236] text-white border border-slate-700 hover:border-[#11C5A3]/40 transition-all"
            title="Print or Save as PDF"
          >
            <Printer className="w-3.5 h-3.5 text-slate-300" />
            <span>PDF Export</span>
          </button>

          <button
            onClick={handleShareLink}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#112236] text-white border border-slate-700 hover:border-[#11C5A3]/40 transition-all"
            title="Share this list"
          >
            <Share2 className="w-3.5 h-3.5 text-[#11C5A3]" />
            <span>Share</span>
          </button>

          {comparedDomains.length > 0 && (
            <button
              onClick={() => setView('compare')}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#062B5B] text-white border border-[#11C5A3]/50 shadow-md animate-bounce"
            >
              <Scale className="w-3.5 h-3.5 text-[#11C5A3]" />
              <span>Compare ({comparedDomains.length})</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter and Controls Strip */}
      <div className="my-6 p-4 rounded-2xl bg-[#112236]/80 border border-slate-800 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search within domains */}
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search within generated names..."
            className="w-full pl-9 pr-3 py-2 rounded-xl glass-input text-xs"
          />
        </div>

        {/* Extension Filter */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Filter className="w-3.5 h-3.5 text-[#11C5A3]" />
            <span>TLD:</span>
          </div>
          <select
            value={selectedExtension}
            onChange={e => setSelectedExtension(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-[#0D1B2A] border border-slate-700 text-xs text-white focus:outline-none focus:border-[#11C5A3]"
          >
            <option value="all">All Extensions</option>
            <option value=".com">.com</option>
            <option value=".io">.io</option>
            <option value=".ai">.ai</option>
            <option value=".co">.co</option>
            <option value=".tech">.tech</option>
            <option value=".store">.store</option>
            <option value=".app">.app</option>
          </select>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400 ml-2">
            <span>Status:</span>
          </div>
          <select
            value={selectedStatus}
            onChange={e => setSelectedStatus(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-[#0D1B2A] border border-slate-700 text-xs text-white focus:outline-none focus:border-[#11C5A3]"
          >
            <option value="all">All Statuses</option>
            <option value="available">🟢 Available Only</option>
            <option value="premium">🟡 Premium</option>
            <option value="taken">🔴 Taken</option>
          </select>

          {/* Sort By */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400 ml-2">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#4FE6CF]" />
            <span>Sort:</span>
          </div>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as any)}
            className="px-3 py-1.5 rounded-xl bg-[#0D1B2A] border border-slate-700 text-xs text-white focus:outline-none focus:border-[#11C5A3]"
          >
            <option value="brand">Highest Brand Score</option>
            <option value="memorability">Highest Memorability</option>
            <option value="seo">Highest SEO Potential</option>
            <option value="length">Shortest Name First</option>
            <option value="alpha">Alphabetical (A-Z)</option>
          </select>
        </div>
      </div>

      {/* 20 DOMAIN SUGGESTIONS CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResults.map((item, idx) => {
          const isSaved = isDomainSaved(item.domain);
          const isCompared = comparedDomains.some(d => d.domain === item.domain);

          // Status styling: Green = Available, Red = Taken, Yellow = Premium
          const statusBadge =
            item.status === 'available' ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-[#11C5A3]/15 text-[#11C5A3] border border-[#11C5A3]/30">
                <span className="w-2 h-2 rounded-full bg-[#11C5A3] animate-pulse" />
                Available
              </span>
            ) : item.status === 'premium' ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                Premium
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-500/15 text-rose-300 border border-rose-500/30">
                <span className="w-2 h-2 rounded-full bg-rose-400" />
                Taken
              </span>
            );

          return (
            <div
              key={idx}
              className={`glass-card rounded-2xl p-6 flex flex-col justify-between transition-all duration-200 border relative group ${
                isSaved ? 'ring-1 ring-[#11C5A3]/40 bg-[#162C47]/80' : ''
              }`}
            >
              <div>
                {/* Top Header: Domain name + Status Badge */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="truncate">
                    <h3 className="font-mono text-xl font-extrabold text-white tracking-tight group-hover:text-[#4FE6CF] transition-colors truncate">
                      {item.domain}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5 line-clamp-1 italic">
                      {item.tagline || 'Modern startup brand'}
                    </p>
                  </div>
                  <div className="shrink-0">{statusBadge}</div>
                </div>

                {/* Score Showcase */}
                <div className="my-4 p-3 rounded-xl bg-[#0D1B2A]/70 border border-slate-800 grid grid-cols-4 gap-2 text-center">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider">
                      Brand
                    </span>
                    <span className="text-base font-extrabold text-[#11C5A3]">
                      {item.brandScore}
                      <span className="text-[10px] text-slate-400 font-normal">/100</span>
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider">
                      Recall
                    </span>
                    <span className="text-sm font-bold text-slate-200">
                      {item.memorabilityScore}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider">
                      Phonics
                    </span>
                    <span className="text-sm font-bold text-slate-200">
                      {item.pronunciationScore}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider">
                      SEO
                    </span>
                    <span className="text-sm font-bold text-[#4FE6CF]">
                      {item.seoPotentialScore}
                    </span>
                  </div>
                </div>

                {/* Valuation / Info strip */}
                <div className="flex items-center justify-between text-xs text-slate-400 mb-4 px-1">
                  <span>
                    Est. Value: <strong className="text-white font-mono">{item.estimatedValue || '$12/yr'}</strong>
                  </span>
                  <span className="capitalize text-slate-400">
                    {item.styleCategory || wizardData.style}
                  </span>
                </div>
              </div>

              {/* CARD ACTION BUTTONS: Save, Copy, Check Details, Register Domain */}
              <div className="pt-3 border-t border-slate-800/80 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  {/* Save Button */}
                  <button
                    onClick={() => toggleSaveDomain(item)}
                    className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                      isSaved
                        ? 'bg-[#11C5A3]/20 border-[#11C5A3] text-[#11C5A3]'
                        : 'bg-[#112236] border-slate-700 text-slate-200 hover:text-white hover:border-[#11C5A3]/40'
                    }`}
                  >
                    {isSaved ? (
                      <>
                        <BookmarkCheck className="w-3.5 h-3.5 fill-[#11C5A3]" />
                        <span>Saved</span>
                      </>
                    ) : (
                      <>
                        <Bookmark className="w-3.5 h-3.5" />
                        <span>Save</span>
                      </>
                    )}
                  </button>

                  {/* One-Click Copy */}
                  <button
                    onClick={() => handleCopy(item.domain)}
                    className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold bg-[#112236] border border-slate-700 text-slate-200 hover:text-white hover:border-[#11C5A3]/40 transition-all"
                  >
                    {copiedDomain === item.domain ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#11C5A3]" />
                        <span className="text-[#11C5A3]">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-400" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {/* Check Details (AI Branding Assistant) */}
                  <button
                    onClick={() => setActiveBrandingDomain(item)}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold bg-[#062B5B] text-white border border-[#11C5A3]/40 hover:bg-[#0B3D7B] hover:border-[#11C5A3] transition-all"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#11C5A3]" />
                    <span>Check Details</span>
                  </button>

                  {/* Register Domain Button */}
                  <button
                    onClick={() => setRegistrarModalDomain(item.domain)}
                    className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold transition-all shadow-md ${
                      item.status === 'taken'
                        ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                        : 'bg-gradient-to-r from-[#11C5A3] to-[#0CA588] text-[#062B5B] hover:from-[#4FE6CF] hover:to-[#11C5A3]'
                    }`}
                  >
                    <span>{item.status === 'taken' ? 'Whois / Buy' : 'Register'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>

                {/* Compare Checkbox Toggle */}
                <div className="pt-1 flex items-center justify-between text-[11px] text-slate-400 px-1">
                  <label className="flex items-center gap-1.5 cursor-pointer hover:text-slate-200">
                    <input
                      type="checkbox"
                      checked={isCompared}
                      onChange={() => toggleCompareDomain(item)}
                      className="rounded border-slate-700 text-[#11C5A3] focus:ring-[#11C5A3] w-3.5 h-3.5 bg-slate-900"
                    />
                    <span>Compare domain</span>
                  </label>
                  <span className="text-[10px] text-slate-500">{item.domain.length} chars</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Registrar Chooser Modal */}
      {registrarModalDomain && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="glass-panel w-full max-w-md rounded-3xl p-6 border border-slate-700 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-[#11C5A3]" />
                <h3 className="text-lg font-bold text-white">Register Domain</h3>
              </div>
              <button
                onClick={() => setRegistrarModalDomain(null)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-300">
              Select your preferred domain registrar to register or query <strong className="text-[#11C5A3] font-mono">{registrarModalDomain}</strong>:
            </p>

            <div className="space-y-2.5">
              {[
                { id: 'namecheap', name: 'Namecheap', tag: 'Most Popular', rate: 'From $9.98/yr' },
                { id: 'porkbun', name: 'Porkbun', tag: 'Lowest Renewal Rates', rate: 'From $10.12/yr' },
                { id: 'godaddy', name: 'GoDaddy', tag: 'Fast Checkout', rate: 'From $11.99/yr' },
                { id: 'squarespace', name: 'Squarespace Domains', tag: 'Simple DNS', rate: 'From $12.00/yr' },
              ].map(reg => (
                <a
                  key={reg.id}
                  href={getRegistrarUrl(registrarModalDomain, reg.id as any)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-[#112236] border border-slate-700/80 hover:border-[#11C5A3] hover:bg-[#162C47] transition-all text-xs group"
                >
                  <div>
                    <span className="font-bold text-white group-hover:text-[#4FE6CF]">
                      {reg.name}
                    </span>
                    <span className="text-[10px] text-slate-400 ml-2">({reg.rate})</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#11C5A3] font-semibold">
                    <span>{reg.tag}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </a>
              ))}
            </div>

            <button
              onClick={() => setRegistrarModalDomain(null)}
              className="w-full py-2.5 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
