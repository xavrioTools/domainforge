import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Star,
  Quote,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe,
  Award,
  Users,
  CheckCircle2,
  Mail
} from 'lucide-react';

export const StatisticsSection: React.FC = () => {
  return (
    <section className="py-16 border-t border-b border-slate-800/80 bg-[#062B5B]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-4xl sm:text-5xl font-extrabold text-white font-mono tracking-tight">
              1.2M+
            </p>
            <p className="text-xs sm:text-sm font-semibold text-[#11C5A3] mt-1">
              Domains Evaluated
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">Across 180+ global registries</p>
          </div>

          <div>
            <p className="text-4xl sm:text-5xl font-extrabold text-white font-mono tracking-tight">
              99.4%
            </p>
            <p className="text-xs sm:text-sm font-semibold text-[#11C5A3] mt-1">
              Availability Accuracy
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">Authoritative DNS-over-HTTPS</p>
          </div>

          <div>
            <p className="text-4xl sm:text-5xl font-extrabold text-white font-mono tracking-tight">
              48,000+
            </p>
            <p className="text-xs sm:text-sm font-semibold text-[#11C5A3] mt-1">
              Startups Launched
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">Backed by YC, a16z, and bootstrappers</p>
          </div>

          <div>
            <p className="text-4xl sm:text-5xl font-extrabold text-white font-mono tracking-tight">
              &lt; 350ms
            </p>
            <p className="text-xs sm:text-sm font-semibold text-[#11C5A3] mt-1">
              Generation Latency
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">Edge-accelerated AI inference</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      quote:
        'DomainForge AI helped us find "synapseflow.ai" in less than 2 minutes after our agency spent 3 weeks brainstorming hyphenated variations. The brand score and SEO breakdown were spot on.',
      author: 'Sophia Chen',
      role: 'Co-Founder & CEO, SynapseFlow',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
      rating: 5,
      domainFound: 'synapseflow.ai'
    },
    {
      quote:
        'The real-time DNS checker is lightning fast. No more falling in love with a name only to find it has been parked since 2004. DomainForge gave us an available 6-letter winner on .io!',
      author: 'David Vance',
      role: 'Managing Partner, HyperVentures',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      rating: 5,
      domainFound: 'kuro.io'
    },
    {
      quote:
        'The AI Branding Assistant alone is worth 10x the price of Pro. Having the social handle availability, tagline ideas, and text logo concepts ready in one click saved us hours in pitch preparation.',
      author: 'Amara Diallo',
      role: 'Head of Brand, Atelier Labs',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      rating: 5,
      domainFound: 'atelier.store'
    }
  ];

  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#112236] border border-[#11C5A3]/30 text-xs font-semibold text-[#11C5A3] mb-4">
          <Star className="w-3.5 h-3.5 fill-[#11C5A3]" />
          <span>Founder Stories</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
          Loved by High-Growth Founders & Agencies
        </h2>
        <p className="text-sm sm:text-base text-slate-300 mt-2">
          Discover how modern teams used DomainForge to secure memorable, high-converting domains.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, idx) => (
          <div
            key={idx}
            className="glass-card rounded-3xl p-7 border border-slate-700/80 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-1 text-amber-400 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
                "{t.quote}"
              </p>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={t.avatar} alt={t.author} className="w-10 h-10 rounded-full object-cover ring-1 ring-[#11C5A3]" />
                <div>
                  <h4 className="text-xs font-bold text-white">{t.author}</h4>
                  <p className="text-[11px] text-slate-400">{t.role}</p>
                </div>
              </div>
              <span className="font-mono text-[11px] font-bold text-[#11C5A3] bg-[#062B5B] px-2 py-1 rounded-lg">
                {t.domainFound}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does DomainForge AI check real-time domain availability?',
      a: 'We query live authoritative DNS-over-HTTPS (DoH) servers across Cloudflare and Google DNS endpoints. We check A, AAAA, MX, and NS records to immediately confirm if a domain has active DNS or returns NXDOMAIN (indicating it is available to register).'
    },
    {
      q: 'How is the Brand Score calculated?',
      a: 'Our proprietary brandability algorithm inspects 5 core vectors: (1) Syllable count & consonant-vowel transitions for easy pronunciation, (2) Character length brevity, (3) Cognitive recall and semantic association with your niche, (4) Organic search keyword authority, and (5) Top-level domain authority (.com, .io, .ai prestige weighting).'
    },
    {
      q: 'Can I register the domain directly through DomainForge AI?',
      a: 'Yes! When you click "Register", we provide direct 1-click links to leading registrars like Namecheap, Porkbun, GoDaddy, and Squarespace with your exact selected domain pre-filled for immediate registration at official wholesale rates.'
    },
    {
      q: 'What is included in the AI Branding Assistant?',
      a: 'For each generated domain, you can inspect a complete brand blueprint: why the name fits your niche, marketing and advertising potential, company entity naming suggestions, brand taglines, customer slogans, social media username availability (X, Instagram, TikTok, etc.), 3 text-based logo concepts, and primary SEO keywords.'
    },
    {
      q: 'What are the limits on the Free Plan versus Pro?',
      a: 'The Free Plan includes 10 AI domain generations per day with full brand scoring and live availability checks. DomainForge Pro unlocks unlimited daily generations, full AI branding blueprints, social handle checking, one-click CSV and PDF reports, side-by-side comparison matrix, and domain monitoring alerts.'
    }
  ];

  return (
    <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-white">Frequently Asked Questions</h2>
        <p className="text-sm text-slate-300 mt-2">
          Everything you need to know about AI domain generation, pricing, and availability checking.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="glass-card rounded-2xl border border-slate-700/80 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-white hover:text-[#4FE6CF] transition-colors"
              >
                <span>{faq.q}</span>
                {isOpen ? <ChevronUp className="w-4 h-4 text-[#11C5A3] shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
              </button>
              {isOpen && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 pt-3 animate-in fade-in">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export const Footer: React.FC = () => {
  const { setView } = useApp();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="border-t border-slate-800 bg-[#061524] text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#062B5B] to-[#11C5A3] flex items-center justify-center p-[1px]">
                <div className="w-full h-full bg-[#0D1B2A] rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-[#11C5A3]" />
                </div>
              </div>
              <span className="text-lg font-extrabold text-white">
                Domain<span className="text-[#11C5A3]">Forge</span> AI
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              The premier AI-powered domain name generator and real-time DNS availability engine. Built for entrepreneurs, startups, and high-growth innovators.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] text-slate-300 font-mono">
                Registries operational • 99.4% uptime
              </span>
            </div>
          </div>

          {/* Product links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Features</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setView('wizard')} className="hover:text-white transition-colors">
                  Domain Wizard
                </button>
              </li>
              <li>
                <button onClick={() => setView('trends')} className="hover:text-white transition-colors">
                  AI Trend Analyzer
                </button>
              </li>
              <li>
                <button onClick={() => setView('compare')} className="hover:text-white transition-colors">
                  Domain Comparison
                </button>
              </li>
              <li>
                <button onClick={() => setView('dashboard')} className="hover:text-white transition-colors">
                  Watchlist & Monitoring
                </button>
              </li>
              <li>
                <button onClick={() => setView('pricing')} className="hover:text-white transition-colors">
                  Pro Pricing
                </button>
              </li>
            </ul>
          </div>

          {/* Registrars */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Supported Registrars</h4>
            <ul className="space-y-2">
              <li className="hover:text-white">Namecheap</li>
              <li className="hover:text-white">Porkbun</li>
              <li className="hover:text-white">GoDaddy</li>
              <li className="hover:text-white">Squarespace Domains</li>
              <li className="hover:text-white">Google Cloud DNS</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Domain Drop Radar</h4>
            <p className="text-[11px] text-slate-400">
              Get weekly alerts on newly dropped 4-letter and high-value AI domains.
            </p>
            {subscribed ? (
              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Subscribed! Check your inbox.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  placeholder="founder@venture.com"
                  value={newsletterEmail}
                  onChange={e => setNewsletterEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                />
                <button
                  type="submit"
                  className="w-full py-2 rounded-xl bg-[#11C5A3] text-[#062B5B] font-bold text-xs hover:bg-[#4FE6CF]"
                >
                  Subscribe to Radar
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} DomainForge AI. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Security Standards</span>
            <span className="hover:text-slate-400 cursor-pointer">API Documentation</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
