import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Bookmark,
  History,
  Activity,
  Trash2,
  ExternalLink,
  Copy,
  Check,
  Sparkles,
  Search,
  Bell,
  ArrowRight,
  Download,
  Calendar,
  Edit3,
  Globe,
  Zap,
  TrendingUp,
  ShieldCheck,
  Plus
} from 'lucide-react';
import { exportToCSV, getRegistrarUrl } from '../utils/export';

export const UserDashboard: React.FC = () => {
  const {
    savedDomains,
    removeSavedDomain,
    updateSavedNote,
    searchHistory,
    runGeneration,
    setWizardData,
    setView,
    user,
    monitoredDomains,
    addMonitoredDomain,
    removeMonitoredDomain,
    setActiveBrandingDomain,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'saved' | 'history' | 'monitoring'>('saved');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingNoteDomain, setEditingNoteDomain] = useState<string | null>(null);
  const [tempNote, setTempNote] = useState('');
  const [copiedDomain, setCopiedDomain] = useState<string | null>(null);
  const [newMonitorInput, setNewMonitorInput] = useState('');

  const handleCopy = (domain: string) => {
    navigator.clipboard.writeText(domain);
    setCopiedDomain(domain);
    showToast(`Copied ${domain}`, 'success');
    setTimeout(() => setCopiedDomain(null), 2000);
  };

  const filteredSaved = savedDomains.filter(d =>
    d.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (d.tag && d.tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAddMonitor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMonitorInput.trim()) return;
    addMonitoredDomain(newMonitorInput.trim());
    setNewMonitorInput('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Top Welcome Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-[#062B5B] via-[#0B3D7B] to-[#112236] border border-[#11C5A3]/30 shadow-2xl mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
            alt={user.name}
            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-[#11C5A3]"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-white">{user.name}'s Dashboard</h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#11C5A3]/20 text-[#11C5A3] border border-[#11C5A3]/30">
                {user.tier} Plan
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Manage saved domain shortlists, evaluate valuation metrics, and monitor high-value registrations.
            </p>
          </div>
        </div>

        {/* Plan & Quota Widget */}
        <div className="p-4 rounded-2xl bg-[#0D1B2A]/70 border border-slate-700/80 flex items-center gap-6 shrink-0 text-xs">
          <div>
            <span className="text-slate-400 block">Daily Quota:</span>
            <span className="text-sm font-bold text-white">
              {user.tier === 'pro' ? 'Unlimited' : `${user.generationsToday} / ${user.maxDailyGenerations} used`}
            </span>
          </div>
          {user.tier === 'free' ? (
            <button
              onClick={() => setView('pricing')}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-[#11C5A3] text-[#062B5B] hover:bg-[#4FE6CF] transition-all shadow-md shadow-[#11C5A3]/20"
            >
              Upgrade to Pro
            </button>
          ) : (
            <span className="px-3 py-1.5 rounded-xl bg-[#062B5B] text-[#4FE6CF] font-bold">
              ✓ Pro Active
            </span>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 mb-6 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('saved')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
            activeTab === 'saved'
              ? 'bg-[#062B5B] text-white border border-[#11C5A3]/40'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Bookmark className="w-3.5 h-3.5 text-[#11C5A3]" />
          <span>Saved Domains ({savedDomains.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
            activeTab === 'history'
              ? 'bg-[#062B5B] text-white border border-[#11C5A3]/40'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <History className="w-3.5 h-3.5 text-[#4FE6CF]" />
          <span>Search History ({searchHistory.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('monitoring')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
            activeTab === 'monitoring'
              ? 'bg-[#062B5B] text-white border border-[#11C5A3]/40'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Activity className="w-3.5 h-3.5 text-amber-400" />
          <span>Domain Monitoring ({monitoredDomains.length})</span>
        </button>
      </div>

      {/* TAB 1: SAVED DOMAINS */}
      {activeTab === 'saved' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Filter saved domains or tags..."
                className="w-full pl-9 pr-3 py-2 rounded-xl glass-input text-xs"
              />
            </div>

            {savedDomains.length > 0 && (
              <button
                onClick={() => exportToCSV(savedDomains, 'my-saved-domains.csv')}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-[#112236] text-white border border-slate-700 hover:border-[#11C5A3]"
              >
                <Download className="w-3.5 h-3.5 text-[#11C5A3]" />
                <span>Export CSV</span>
              </button>
            )}
          </div>

          {filteredSaved.length === 0 ? (
            <div className="py-20 text-center glass-panel rounded-3xl p-8 border border-slate-800">
              <Bookmark className="w-12 h-12 text-slate-500 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white">No Saved Domains Yet</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto mb-5">
                Generate new names or check availability, then click the "Save" button to build your portfolio shortlist.
              </p>
              <button
                onClick={() => setView('wizard')}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#11C5A3] text-[#062B5B]"
              >
                Launch Domain Wizard →
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredSaved.map(item => (
                <div
                  key={item.domain}
                  className="glass-card rounded-2xl p-5 border border-slate-700 flex flex-col justify-between space-y-4"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-mono text-lg font-extrabold text-white">
                          {item.domain}
                        </h4>
                        <span className="text-[10px] text-slate-400 block mt-0.5">
                          Saved: {new Date(item.savedAt).toLocaleDateString()}
                        </span>
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          item.status === 'available'
                            ? 'bg-[#11C5A3]/20 text-[#11C5A3]'
                            : item.status === 'premium'
                            ? 'bg-amber-500/20 text-amber-300'
                            : 'bg-rose-500/20 text-rose-300'
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>

                    <div className="mt-3 p-2.5 rounded-xl bg-[#0D1B2A]/70 border border-slate-800 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-slate-400 block text-[10px]">Brand Score</span>
                        <span className="font-bold text-[#11C5A3]">{item.brandScore}/100</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Valuation</span>
                        <span className="font-mono text-white">{item.estimatedValue || '$12/yr'}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Tag</span>
                        <span className="text-[#4FE6CF] font-semibold">{item.tag || 'Favorite'}</span>
                      </div>
                    </div>

                    {/* Notes area */}
                    <div className="mt-3">
                      {editingNoteDomain === item.domain ? (
                        <div className="space-y-2">
                          <textarea
                            rows={2}
                            value={tempNote}
                            onChange={e => setTempNote(e.target.value)}
                            className="w-full p-2 rounded-lg glass-input text-xs"
                            placeholder="Add evaluation note..."
                          />
                          <div className="flex justify-end gap-1.5">
                            <button
                              onClick={() => setEditingNoteDomain(null)}
                              className="px-2 py-1 text-[11px] text-slate-400"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => {
                                updateSavedNote(item.domain, tempNote);
                                setEditingNoteDomain(null);
                              }}
                              className="px-2.5 py-1 text-[11px] font-bold bg-[#11C5A3] text-[#062B5B] rounded-md"
                            >
                              Save Note
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div
                          onClick={() => {
                            setEditingNoteDomain(item.domain);
                            setTempNote(item.notes || '');
                          }}
                          className="p-2 rounded-lg bg-[#112236] border border-slate-800 text-[11px] text-slate-300 hover:border-slate-700 cursor-pointer flex items-center justify-between"
                        >
                          <span className="italic truncate">
                            {item.notes || 'Click to add notes/tags...'}
                          </span>
                          <Edit3 className="w-3 h-3 text-slate-500 shrink-0" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleCopy(item.domain)}
                      className="p-2 rounded-xl bg-[#112236] text-slate-300 hover:text-white"
                      title="Copy domain"
                    >
                      {copiedDomain === item.domain ? <Check className="w-3.5 h-3.5 text-[#11C5A3]" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>

                    <button
                      onClick={() => setActiveBrandingDomain(item)}
                      className="px-3 py-2 rounded-xl text-xs font-semibold bg-[#062B5B] text-[#4FE6CF] hover:bg-[#0B3D7B]"
                    >
                      AI Assistant
                    </button>

                    <a
                      href={getRegistrarUrl(item.domain, 'namecheap')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 rounded-xl text-xs font-bold bg-[#11C5A3] text-[#062B5B] flex items-center gap-1"
                    >
                      <span>Register</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>

                    <button
                      onClick={() => removeSavedDomain(item.domain)}
                      className="p-2 rounded-xl text-slate-400 hover:text-rose-400"
                      title="Remove domain"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: SEARCH HISTORY */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          {searchHistory.length === 0 ? (
            <div className="py-20 text-center glass-panel rounded-3xl p-8 border border-slate-800">
              <History className="w-12 h-12 text-slate-500 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white">No Search History</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto mb-5">
                Every time you run the AI generator, your parameters and top domain matches are preserved here for 1-click re-runs.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {searchHistory.map(hist => (
                <div
                  key={hist.id}
                  className="glass-card rounded-2xl p-4 border border-slate-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">
                        {hist.niche} • {hist.category}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {new Date(hist.timestamp).toLocaleDateString()} at{' '}
                        {new Date(hist.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1 italic line-clamp-1">
                      "{hist.idea}"
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Generated <strong className="text-[#11C5A3]">{hist.resultCount} domains</strong> • Top Match: <span className="font-mono text-white font-semibold">{hist.topDomain}</span>
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setWizardData(prev => ({
                        ...prev,
                        niche: hist.niche,
                        category: hist.category,
                        idea: hist.idea,
                      }));
                      runGeneration({
                        niche: hist.niche,
                        category: hist.category,
                        idea: hist.idea,
                      });
                    }}
                    className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#062B5B] text-white border border-[#11C5A3]/40 hover:bg-[#0B3D7B]"
                  >
                    <span>Re-Run Query</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: DOMAIN MONITORING */}
      {activeTab === 'monitoring' && (
        <div className="space-y-6">
          {/* Add to watchlist */}
          <form
            onSubmit={handleAddMonitor}
            className="p-5 rounded-2xl bg-[#112236] border border-slate-700 flex flex-col sm:flex-row items-center gap-3"
          >
            <div className="flex-1 w-full">
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Monitor a Taken or High-Value Domain:
              </label>
              <input
                type="text"
                placeholder="e.g. quantumflow.ai or cloudcraft.com"
                value={newMonitorInput}
                onChange={e => setNewMonitorInput(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-xs"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto mt-2 sm:mt-5 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#11C5A3] text-[#062B5B] hover:bg-[#4FE6CF] flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add to Watchlist</span>
            </button>
          </form>

          {/* Watchlist Table */}
          <div className="rounded-2xl border border-slate-700 overflow-hidden bg-[#112236]">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0D1B2A] text-slate-400 font-bold border-b border-slate-700">
                <tr>
                  <th className="p-3.5">Monitored Domain</th>
                  <th className="p-3.5">Current Status</th>
                  <th className="p-3.5">Estimated Expiry</th>
                  <th className="p-3.5">Alerts</th>
                  <th className="p-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-200">
                {monitoredDomains.map(item => (
                  <tr key={item.domain} className="hover:bg-slate-800/40">
                    <td className="p-3.5 font-mono font-bold text-white text-sm">
                      {item.domain}
                    </td>
                    <td className="p-3.5">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          item.status === 'available'
                            ? 'bg-[#11C5A3]/20 text-[#11C5A3]'
                            : item.status === 'premium'
                            ? 'bg-amber-500/20 text-amber-300'
                            : 'bg-rose-500/20 text-rose-300'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-slate-400 font-mono">
                      {item.expiryDate || '2026-11-20'}
                    </td>
                    <td className="p-3.5">
                      <span className="flex items-center gap-1 text-[#11C5A3] text-[11px] font-semibold">
                        <Bell className="w-3 h-3" /> Email on Drop
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => removeMonitoredDomain(item.domain)}
                        className="text-slate-400 hover:text-rose-400 p-1"
                        title="Remove from monitoring"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
