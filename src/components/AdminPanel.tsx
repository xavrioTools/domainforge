import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  Users,
  Search,
  DollarSign,
  TrendingUp,
  Sliders,
  CheckCircle2,
  Clock,
  Server,
  Activity,
  Zap,
  Globe,
  Database
} from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const { showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'analytics' | 'users' | 'requests' | 'settings'>('analytics');
  const [aiModel, setAiModel] = useState('gemini-3.8-flash');
  const [dnsCacheTtl, setDnsCacheTtl] = useState('300');
  const [rateLimitPerMin, setRateLimitPerMin] = useState('60');

  const stats = [
    { title: 'Total Registered Users', value: '18,429', change: '+18.4% this mo', icon: Users, color: 'text-[#11C5A3]' },
    { title: 'Total Domain Searches', value: '412,890', change: '+32.1% this mo', icon: Search, color: 'text-[#4FE6CF]' },
    { title: 'Monthly Recurring Revenue', value: '$38,450', change: '+24.6% this mo', icon: DollarSign, color: 'text-emerald-400' },
    { title: 'DNS Availability Accuracy', value: '99.4%', change: '320ms avg latency', icon: Activity, color: 'text-amber-400' },
  ];

  const recentUsers = [
    { name: 'Elena Rostova', email: 'elena@solarpulse.io', tier: 'Pro', searches: 84, joined: '2 hours ago' },
    { name: 'Marcus Sterling', email: 'marcus@apexcapital.co', tier: 'Pro', searches: 142, joined: '5 hours ago' },
    { name: 'Kai Tanaka', email: 'kai@zenith.ai', tier: 'Free', searches: 9, joined: 'Yesterday' },
    { name: 'Chloe Dubois', email: 'chloe@atelier.store', tier: 'Pro', searches: 62, joined: '2 days ago' },
    { name: 'David Chen', email: 'david@stackforge.dev', tier: 'Free', searches: 8, joined: '3 days ago' },
  ];

  const domainRequests = [
    { id: 'REQ-802', client: 'AeroBio Labs', niche: 'BioTech', budget: '$5,000+', preferredTld: '.ai / .com', status: 'In Review' },
    { id: 'REQ-801', client: 'HyperFlow', niche: 'FinTech', budget: '$10,000+', preferredTld: '.io / .com', status: 'Assigned' },
    { id: 'REQ-800', client: 'Solace Living', niche: 'eCommerce', budget: '$2,500', preferredTld: '.store', status: 'Completed' },
  ];

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Admin system settings updated successfully!', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#11C5A3] mb-1">
            <ShieldCheck className="w-4 h-4 text-[#11C5A3]" />
            <span>OPERATIONS CONTROL CENTER</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">System Admin Dashboard</h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Real-time telemetry, MRR subscription analytics, AI inference monitoring, and user registry.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Cluster Healthy
          </span>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 my-6 pb-2 text-xs font-semibold">
        {[
          { id: 'analytics', label: 'Overview & MRR', icon: TrendingUp },
          { id: 'users', label: 'User Directory', icon: Users },
          { id: 'requests', label: 'Concierge Requests', icon: Search },
          { id: 'settings', label: 'System Configuration', icon: Sliders },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                isActive
                  ? 'bg-[#062B5B] text-white border border-[#11C5A3]/40'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#11C5A3]' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* STATS OVERVIEW CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="glass-card rounded-2xl p-5 border border-slate-700/80">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-slate-400 font-medium">{stat.title}</span>
                <div className={`p-2 rounded-xl bg-[#0D1B2A] border border-slate-800 ${stat.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl font-extrabold text-white">{stat.value}</p>
              <span className="text-[11px] text-[#11C5A3] font-semibold mt-1 block">
                {stat.change}
              </span>
            </div>
          );
        })}
      </div>

      {/* TAB 1: ANALYTICS */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 glass-panel rounded-3xl p-6 border border-slate-700">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-base font-bold text-white">Revenue Growth & Pro Conversions</h3>
                  <p className="text-xs text-slate-400">Monthly recurring income over the last 6 months</p>
                </div>
                <span className="text-xs font-mono font-bold text-[#11C5A3]">+142% YoY</span>
              </div>

              {/* Bar visualization */}
              <div className="h-48 flex items-end justify-between gap-3 pt-6 border-b border-slate-800">
                {[
                  { month: 'Jun', value: 45, mrr: '$16k' },
                  { month: 'Jul', value: 58, mrr: '$21k' },
                  { month: 'Aug', value: 65, mrr: '$24k' },
                  { month: 'Sep', value: 78, mrr: '$29k' },
                  { month: 'Oct', value: 88, mrr: '$33k' },
                  { month: 'Nov', value: 100, mrr: '$38k' },
                ].map((bar, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                    <span className="text-[10px] font-mono text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      {bar.mrr}
                    </span>
                    <div
                      className="w-full rounded-t-xl bg-gradient-to-t from-[#062B5B] to-[#11C5A3] transition-all group-hover:to-[#4FE6CF]"
                      style={{ height: `${bar.value}%` }}
                    />
                    <span className="text-xs font-semibold text-slate-400">{bar.month}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* TLD Registry Breakdown */}
            <div className="glass-panel rounded-3xl p-6 border border-slate-700 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-white mb-1">Most Searched TLDs</h3>
                <p className="text-xs text-slate-400 mb-6">Distribution across user generation sessions</p>

                <div className="space-y-3.5 text-xs">
                  {[
                    { tld: '.ai', pct: 42, color: 'bg-[#11C5A3]' },
                    { tld: '.com', pct: 31, color: 'bg-[#4FE6CF]' },
                    { tld: '.io', pct: 15, color: 'bg-emerald-400' },
                    { tld: '.co', pct: 7, color: 'bg-indigo-400' },
                    { tld: '.tech / others', pct: 5, color: 'bg-slate-400' },
                  ].map((item, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between font-mono font-semibold text-slate-200 mb-1">
                        <span>{item.tld}</span>
                        <span>{item.pct}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                        <div className={`h-full ${item.color}`} style={{ width: `${item.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400">
                Data refreshed every 15 minutes from edge caches.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: USERS */}
      {activeTab === 'users' && (
        <div className="rounded-2xl border border-slate-700 overflow-hidden bg-[#112236]">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0D1B2A] text-slate-400 font-bold border-b border-slate-700">
              <tr>
                <th className="p-3.5">User</th>
                <th className="p-3.5">Subscription Tier</th>
                <th className="p-3.5">Total Generations</th>
                <th className="p-3.5">Joined</th>
                <th className="p-3.5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200">
              {recentUsers.map((u, i) => (
                <tr key={i} className="hover:bg-slate-800/40">
                  <td className="p-3.5">
                    <p className="font-bold text-white">{u.name}</p>
                    <p className="text-[11px] text-slate-400">{u.email}</p>
                  </td>
                  <td className="p-3.5">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        u.tier === 'Pro' ? 'bg-[#11C5A3]/20 text-[#11C5A3]' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {u.tier} Member
                    </span>
                  </td>
                  <td className="p-3.5 font-mono text-slate-300">{u.searches} runs</td>
                  <td className="p-3.5 text-slate-400">{u.joined}</td>
                  <td className="p-3.5 text-right">
                    <span className="text-emerald-400 font-semibold text-[11px]">Active</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 3: CONCIERGE REQUESTS */}
      {activeTab === 'requests' && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-700 overflow-hidden bg-[#112236]">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0D1B2A] text-slate-400 font-bold border-b border-slate-700">
                <tr>
                  <th className="p-3.5">Request ID</th>
                  <th className="p-3.5">Client / Startup</th>
                  <th className="p-3.5">Niche</th>
                  <th className="p-3.5">Target TLD</th>
                  <th className="p-3.5">Budget</th>
                  <th className="p-3.5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-200">
                {domainRequests.map(req => (
                  <tr key={req.id} className="hover:bg-slate-800/40">
                    <td className="p-3.5 font-mono font-bold text-[#11C5A3]">{req.id}</td>
                    <td className="p-3.5 font-bold text-white">{req.client}</td>
                    <td className="p-3.5 text-slate-300">{req.niche}</td>
                    <td className="p-3.5 font-mono text-slate-300">{req.preferredTld}</td>
                    <td className="p-3.5 font-mono text-[#4FE6CF] font-semibold">{req.budget}</td>
                    <td className="p-3.5 text-right">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#062B5B] text-[#4FE6CF]">
                        {req.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: SETTINGS */}
      {activeTab === 'settings' && (
        <form onSubmit={handleSaveSettings} className="glass-panel rounded-3xl p-8 border border-slate-700 max-w-2xl space-y-6">
          <h3 className="text-lg font-bold text-white">System Infrastructure Settings</h3>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Active Gemini AI Model
            </label>
            <select
              value={aiModel}
              onChange={e => setAiModel(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl glass-input text-xs"
            >
              <option value="gemini-3.8-flash">gemini-3.8-flash (Recommended Standard)</option>
              <option value="gemini-3.1-flash-lite">gemini-3.1-flash-lite (Ultra Low Latency)</option>
            </select>
            <p className="text-[11px] text-slate-400 mt-1">Configured for server-side generation via @google/genai.</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                DNS Cache TTL (Seconds)
              </label>
              <input
                type="number"
                value={dnsCacheTtl}
                onChange={e => setDnsCacheTtl(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-xs font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Free Tier Rate Limit (RPM)
              </label>
              <input
                type="number"
                value={rateLimitPerMin}
                onChange={e => setRateLimitPerMin(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-xs font-mono"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#11C5A3] text-[#062B5B] hover:bg-[#4FE6CF]"
            >
              Save Configuration
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
