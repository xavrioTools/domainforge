import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  Bot,
  Dumbbell,
  HeartPulse,
  Cloud,
  FileText,
  GraduationCap,
  ShoppingCart,
  Server,
  Building2,
  Compass,
  Gamepad2,
  Sliders,
  CheckCircle2,
  Wand2,
  Layers,
  HelpCircle
} from 'lucide-react';

export const DomainWizard: React.FC = () => {
  const { wizardData, setWizardData, runGeneration, isGenerating, setView } = useApp();
  const [currentStep, setCurrentStep] = useState(1);
  const [customNiche, setCustomNiche] = useState('');
  const [customCategory, setCustomCategory] = useState('');

  const NICHES = [
    { id: 'AI', label: 'AI & Machine Learning', icon: Bot, popular: true },
    { id: 'Fitness', label: 'Fitness & Gym', icon: Dumbbell },
    { id: 'Health', label: 'Health & Wellness', icon: HeartPulse },
    { id: 'SaaS', label: 'SaaS & B2B Software', icon: Cloud, popular: true },
    { id: 'Blogging', label: 'Blogging & Media', icon: FileText },
    { id: 'Education', label: 'Education & EdTech', icon: GraduationCap },
    { id: 'eCommerce', label: 'eCommerce & Retail', icon: ShoppingCart, popular: true },
    { id: 'Hosting', label: 'Hosting & Cloud Infra', icon: Server },
    { id: 'Real Estate', label: 'Real Estate & PropTech', icon: Building2 },
    { id: 'Travel', label: 'Travel & Tourism', icon: Compass },
    { id: 'Gaming', label: 'Gaming & Esports', icon: Gamepad2 }
  ];

  const CATEGORIES = [
    'Store', 'Agency', 'Software', 'Marketplace',
    'Portfolio', 'Blog', 'Community', 'Service', 'Tool'
  ];

  const STYLES = [
    { id: 'Professional', desc: 'Trustworthy, balanced & enterprise-ready' },
    { id: 'Premium', desc: 'Elite single or dual syllable power words' },
    { id: 'Luxury', desc: 'High-end, elegant & prestigious tone' },
    { id: 'Short', desc: 'Punchy 4-7 characters easy to type on mobile' },
    { id: 'Brandable', desc: 'Inventive, modern startup feel (like Spotify/Slack)' },
    { id: 'Creative', desc: 'Evocative metaphors and blended concepts' },
    { id: 'Corporate', desc: 'Authoritative B2B industry resonance' },
    { id: 'AI Generated', desc: 'Futuristic algorithmic synthesis (.ai native)' }
  ];

  const LENGTHS = [
    { id: 'Very Short (3-6 letters)', label: 'Very Short', detail: '3 - 6 letters (Rare, high recall)' },
    { id: 'Short (6-10 letters)', label: 'Short', detail: '6 - 10 letters (Optimal startup standard)' },
    { id: 'Medium (10-15 letters)', label: 'Medium', detail: '10 - 15 letters (Descriptive & accessible)' },
    { id: 'Any Length', label: 'Any Length', detail: 'Let AI choose the ideal balance' }
  ];

  const EXTENSIONS = [
    { ext: '.com', desc: 'Gold Standard, Universal Trust' },
    { ext: '.io', desc: 'Tech, SaaS & Developer Darling' },
    { ext: '.ai', desc: 'Artificial Intelligence & Future Tech' },
    { ext: '.co', desc: 'Agile Company & Modern Startups' },
    { ext: '.net', desc: 'Network, Infrastructure & Tools' },
    { ext: '.tech', desc: 'Engineering & Hardware Pioneers' },
    { ext: '.store', desc: 'Direct-to-Consumer & Retail' },
    { ext: '.app', desc: 'Mobile & Web Applications' }
  ];

  const IDEA_PROMPT_PRESETS = [
    'An automated customer support agent that resolves enterprise tickets in seconds.',
    'A high-protein nutrition supplement brand for busy endurance athletes.',
    'A collaborative visual canvas for remote product engineering teams.',
    'A curated marketplace connecting sustainable fashion designers with global buyers.',
    'An AI copilot that audits smart contracts and prevents DeFi exploits.'
  ];

  const handleExtensionToggle = (ext: string) => {
    setWizardData(prev => {
      const exists = prev.extensions.includes(ext);
      if (exists) {
        if (prev.extensions.length === 1) return prev; // Keep at least one
        return { ...prev, extensions: prev.extensions.filter(e => e !== ext) };
      } else {
        return { ...prev, extensions: [...prev.extensions, ext] };
      }
    });
  };

  const handleNext = () => {
    if (currentStep < 7) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    } else {
      runGeneration();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      setView('home');
    }
  };

  return (
    <div className="min-h-[85vh] py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Step Progress Tracker */}
      <div className="mb-10">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2">
          <span>STEP {currentStep} OF 7</span>
          <span className="text-[#11C5A3] font-bold">
            {Math.round((currentStep / 7) * 100)}% Completed
          </span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#062B5B] via-[#11C5A3] to-[#4FE6CF] transition-all duration-300"
            style={{ width: `${(currentStep / 7) * 100}%` }}
          />
        </div>

        {/* Step dots */}
        <div className="hidden sm:flex justify-between items-center mt-3 text-[11px] font-medium text-slate-400">
          <span className={currentStep >= 1 ? 'text-[#11C5A3] font-bold' : ''}>1. Niche</span>
          <span className={currentStep >= 2 ? 'text-[#11C5A3] font-bold' : ''}>2. Category</span>
          <span className={currentStep >= 3 ? 'text-[#11C5A3] font-bold' : ''}>3. Idea</span>
          <span className={currentStep >= 4 ? 'text-[#11C5A3] font-bold' : ''}>4. Style</span>
          <span className={currentStep >= 5 ? 'text-[#11C5A3] font-bold' : ''}>5. Length</span>
          <span className={currentStep >= 6 ? 'text-[#11C5A3] font-bold' : ''}>6. Extensions</span>
          <span className={currentStep >= 7 ? 'text-[#11C5A3] font-bold' : ''}>7. Generate</span>
        </div>
      </div>

      {/* Main Wizard Card */}
      <div className="glass-panel rounded-3xl p-6 sm:p-10 shadow-2xl relative border border-slate-700/80">
        {/* STEP 1: What is your niche? */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-in fade-in">
            <div>
              <span className="text-xs font-bold text-[#11C5A3] uppercase tracking-wider">
                Step 1 of 7
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                What is your niche?
              </h2>
              <p className="text-sm text-slate-300 mt-1">
                Select your industry vertical or type a custom niche below.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {NICHES.map(item => {
                const Icon = item.icon;
                const isSelected = wizardData.niche.toLowerCase() === item.id.toLowerCase();
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setWizardData(prev => ({ ...prev, niche: item.id }))}
                    className={`p-3.5 rounded-2xl text-left border flex items-center gap-3 transition-all ${
                      isSelected
                        ? 'bg-[#062B5B] border-[#11C5A3] text-white shadow-lg shadow-[#11C5A3]/20 ring-1 ring-[#11C5A3]'
                        : 'bg-[#112236]/70 border-slate-700/70 text-slate-300 hover:bg-[#162C47] hover:border-slate-600'
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-[#11C5A3] text-[#062B5B]' : 'bg-[#0D1B2A] text-[#4FE6CF]'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="truncate">
                      <p className="text-xs font-bold truncate">{item.id}</p>
                      <p className="text-[10px] text-slate-400 truncate">{item.label.split('&')[1] || item.label}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Custom write-in */}
            <div className="pt-2">
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                Or enter custom niche:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. BioTech, CleanEnergy, LegalTech..."
                  value={customNiche}
                  onChange={e => {
                    setCustomNiche(e.target.value);
                    if (e.target.value.trim()) {
                      setWizardData(prev => ({ ...prev, niche: e.target.value.trim() }));
                    }
                  }}
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: What category describes your business? */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-in fade-in">
            <div>
              <span className="text-xs font-bold text-[#11C5A3] uppercase tracking-wider">
                Step 2 of 7
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                What category describes your business?
              </h2>
              <p className="text-sm text-slate-300 mt-1">
                This dictates whether the domain should sound like an agency, a SaaS product, a store, or a community.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {CATEGORIES.map(cat => {
                const isSelected = wizardData.category.toLowerCase() === cat.toLowerCase();
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setWizardData(prev => ({ ...prev, category: cat }))}
                    className={`p-4 rounded-2xl text-left border flex items-center justify-between transition-all ${
                      isSelected
                        ? 'bg-[#062B5B] border-[#11C5A3] text-white shadow-lg shadow-[#11C5A3]/20 ring-1 ring-[#11C5A3]'
                        : 'bg-[#112236]/70 border-slate-700/70 text-slate-300 hover:bg-[#162C47] hover:border-slate-600'
                    }`}
                  >
                    <span className="text-sm font-bold">{cat}</span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-[#11C5A3]" />}
                  </button>
                );
              })}
            </div>

            <div className="pt-2">
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                Or enter custom category:
              </label>
              <input
                type="text"
                placeholder="e.g. Protocol, Incubator, Studio, Newsletter..."
                value={customCategory}
                onChange={e => {
                  setCustomCategory(e.target.value);
                  if (e.target.value.trim()) {
                    setWizardData(prev => ({ ...prev, category: e.target.value.trim() }));
                  }
                }}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
              />
            </div>
          </div>
        )}

        {/* STEP 3: Describe your business idea */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-in fade-in">
            <div>
              <span className="text-xs font-bold text-[#11C5A3] uppercase tracking-wider">
                Step 3 of 7
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Describe your business idea
              </h2>
              <p className="text-sm text-slate-300 mt-1">
                The more color you give, the deeper the AI can extract root words, synonyms, metaphors, and brand angles.
              </p>
            </div>

            <div className="relative">
              <textarea
                rows={5}
                value={wizardData.idea}
                onChange={e => setWizardData(prev => ({ ...prev, idea: e.target.value }))}
                placeholder="Describe what your product does, who your target audience is, and the core transformation you deliver..."
                className="w-full p-4 rounded-2xl glass-input text-sm text-white resize-none leading-relaxed placeholder-slate-500"
              />
              <div className="flex justify-between items-center text-xs text-slate-400 mt-1.5 px-1">
                <span>Tip: Mention key adjectives or feelings you want the brand to evoke.</span>
                <span>{wizardData.idea.length} characters</span>
              </div>
            </div>

            {/* Presets to click */}
            <div>
              <p className="text-xs font-semibold text-slate-400 mb-2 flex items-center gap-1.5">
                <Wand2 className="w-3.5 h-3.5 text-[#11C5A3]" />
                Click an example to autofill:
              </p>
              <div className="flex flex-wrap gap-2">
                {IDEA_PROMPT_PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setWizardData(prev => ({ ...prev, idea: preset }))}
                    className="text-left text-xs px-3 py-1.5 rounded-xl bg-[#112236] border border-slate-700/60 text-slate-300 hover:text-white hover:border-[#11C5A3]/40 transition-colors"
                  >
                    {preset.slice(0, 48)}...
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Preferred domain style */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-in fade-in">
            <div>
              <span className="text-xs font-bold text-[#11C5A3] uppercase tracking-wider">
                Step 4 of 7
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Preferred domain style
              </h2>
              <p className="text-sm text-slate-300 mt-1">
                Choose the brand persona and acoustic resonance for your domain.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {STYLES.map(style => {
                const isSelected = wizardData.style === style.id;
                return (
                  <button
                    key={style.id}
                    type="button"
                    onClick={() => setWizardData(prev => ({ ...prev, style: style.id }))}
                    className={`p-4 rounded-2xl text-left border transition-all ${
                      isSelected
                        ? 'bg-[#062B5B] border-[#11C5A3] text-white shadow-lg shadow-[#11C5A3]/20 ring-1 ring-[#11C5A3]'
                        : 'bg-[#112236]/70 border-slate-700/70 text-slate-300 hover:bg-[#162C47] hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-bold">{style.id}</span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-[#11C5A3]" />}
                    </div>
                    <p className="text-xs text-slate-400">{style.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 5: Word Length Preference */}
        {currentStep === 5 && (
          <div className="space-y-6 animate-in fade-in">
            <div>
              <span className="text-xs font-bold text-[#11C5A3] uppercase tracking-wider">
                Step 5 of 7
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Word Length Preference
              </h2>
              <p className="text-sm text-slate-300 mt-1">
                Filter by letter count to hit your ideal brevity vs descriptiveness ratio.
              </p>
            </div>

            <div className="space-y-3">
              {LENGTHS.map(len => {
                const isSelected = wizardData.lengthPref === len.id;
                return (
                  <button
                    key={len.id}
                    type="button"
                    onClick={() => setWizardData(prev => ({ ...prev, lengthPref: len.id }))}
                    className={`w-full p-4 rounded-2xl text-left border flex items-center justify-between transition-all ${
                      isSelected
                        ? 'bg-[#062B5B] border-[#11C5A3] text-white shadow-lg shadow-[#11C5A3]/20 ring-1 ring-[#11C5A3]'
                        : 'bg-[#112236]/70 border-slate-700/70 text-slate-300 hover:bg-[#162C47] hover:border-slate-600'
                    }`}
                  >
                    <div>
                      <span className="text-sm font-bold text-white">{len.label}</span>
                      <p className="text-xs text-slate-400 mt-0.5">{len.detail}</p>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        isSelected ? 'border-[#11C5A3] bg-[#11C5A3]' : 'border-slate-600'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 text-[#062B5B] stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 6: Choose Domain Extensions */}
        {currentStep === 6 && (
          <div className="space-y-6 animate-in fade-in">
            <div>
              <span className="text-xs font-bold text-[#11C5A3] uppercase tracking-wider">
                Step 6 of 7
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Choose Domain Extensions
              </h2>
              <p className="text-sm text-slate-300 mt-1">
                Select one or more top-level domains to prioritize in generation and availability checking.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {EXTENSIONS.map(ext => {
                const isSelected = wizardData.extensions.includes(ext.ext);
                return (
                  <button
                    key={ext.ext}
                    type="button"
                    onClick={() => handleExtensionToggle(ext.ext)}
                    className={`p-3.5 rounded-2xl text-left border transition-all relative ${
                      isSelected
                        ? 'bg-[#062B5B] border-[#11C5A3] text-white shadow-lg shadow-[#11C5A3]/20 ring-1 ring-[#11C5A3]'
                        : 'bg-[#112236]/70 border-slate-700/70 text-slate-300 hover:bg-[#162C47] hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-base font-bold text-[#4FE6CF]">
                        {ext.ext}
                      </span>
                      <div
                        className={`w-4 h-4 rounded-md border flex items-center justify-center ${
                          isSelected ? 'border-[#11C5A3] bg-[#11C5A3]' : 'border-slate-600'
                        }`}
                      >
                        {isSelected && <Check className="w-2.5 h-2.5 text-[#062B5B] stroke-[3]" />}
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-1">{ext.desc}</p>
                  </button>
                );
              })}
            </div>

            <p className="text-xs text-slate-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#11C5A3]" />
              Selected: <span className="text-white font-mono font-semibold">{wizardData.extensions.join(', ')}</span>
            </p>
          </div>
        )}

        {/* STEP 7: Generate Results Review & Launch */}
        {currentStep === 7 && (
          <div className="space-y-6 animate-in fade-in">
            <div>
              <span className="text-xs font-bold text-[#11C5A3] uppercase tracking-wider">
                Step 7 of 7
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Ready to Forge Your Domains
              </h2>
              <p className="text-sm text-slate-300 mt-1">
                Review your parameters before launching our multi-layer AI generation and live DNS verification.
              </p>
            </div>

            {/* Summary Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-[#0D1B2A]/90 border border-slate-700/60 text-xs">
              <div>
                <span className="text-slate-400">Niche:</span>
                <p className="font-bold text-white text-sm mt-0.5">{wizardData.niche}</p>
              </div>
              <div>
                <span className="text-slate-400">Category:</span>
                <p className="font-bold text-white text-sm mt-0.5">{wizardData.category}</p>
              </div>
              <div>
                <span className="text-slate-400">Style:</span>
                <p className="font-bold text-[#4FE6CF] text-sm mt-0.5">{wizardData.style}</p>
              </div>
              <div>
                <span className="text-slate-400">Length:</span>
                <p className="font-bold text-white text-sm mt-0.5">{wizardData.lengthPref}</p>
              </div>
              <div className="col-span-2">
                <span className="text-slate-400">Extensions:</span>
                <p className="font-bold font-mono text-[#11C5A3] text-sm mt-0.5">
                  {wizardData.extensions.join('  ')}
                </p>
              </div>
              <div className="col-span-2 sm:col-span-3 pt-2 border-t border-slate-800">
                <span className="text-slate-400">Concept summary:</span>
                <p className="text-slate-300 italic text-xs mt-0.5 line-clamp-2">
                  "{wizardData.idea}"
                </p>
              </div>
            </div>

            {/* Generation CTA Banner */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-[#062B5B] via-[#0B3D7B] to-[#112236] border border-[#11C5A3]/40 text-center">
              <Sparkles className="w-8 h-8 text-[#11C5A3] mx-auto mb-2 animate-bounce" />
              <h3 className="text-lg font-bold text-white">Generate 20+ Tailored AI Domains</h3>
              <p className="text-xs text-slate-300 mt-1 max-w-md mx-auto">
                Each domain will be scored for Brandability, Memorability, Pronunciation, and SEO potential, accompanied by live DNS check results.
              </p>
              <button
                type="button"
                onClick={() => runGeneration()}
                disabled={isGenerating}
                className="mt-5 inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-extrabold bg-[#11C5A3] text-[#062B5B] hover:bg-[#4FE6CF] shadow-xl shadow-[#11C5A3]/30 transition-all transform hover:scale-105 active:scale-100 disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-[#062B5B] border-t-transparent rounded-full animate-spin" />
                    <span>Forging Domains with Gemini AI...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 fill-[#062B5B]" />
                    <span>Generate Results Now</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Wizard Footer Controls */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center justify-between">
          <button
            type="button"
            onClick={handleBack}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{currentStep === 1 ? 'Back to Home' : 'Previous Step'}</span>
          </button>

          {currentStep < 7 && (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-[#11C5A3] text-[#062B5B] hover:bg-[#4FE6CF] transition-all shadow-md shadow-[#11C5A3]/20"
            >
              <span>Next Step</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
