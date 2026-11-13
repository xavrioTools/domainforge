import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Play,
  Sparkles,
  Zap,
  CheckCircle2,
  Globe,
  Sliders,
  Award,
  ArrowRight
} from 'lucide-react';

export const DemoModal: React.FC = () => {
  const { isDemoOpen, setIsDemoOpen, setView } = useApp();
  const [activeStep, setActiveStep] = useState(0);

  if (!isDemoOpen) return null;

  const demoSteps = [
    {
      title: '1. Intelligent Niche & Concept Ingestion',
      desc: 'Our engine parses semantic nuances, industry roots, and desired acoustics rather than basic keyword stacking.',
      preview: 'AI analyzes concept: "Decentralized GPU compute network for AI developers" -> extracts roots [synapse, neural, compute, grid, tensor]',
      icon: Sparkles
    },
    {
      title: '2. Multi-TLD Real-Time DNS Validation',
      desc: 'Queries DNS-over-HTTPS across .com, .io, .ai, .tech, and .dev simultaneously in under 350 milliseconds.',
      preview: 'Checking: neuralgrid.ai [AVAILABLE] • synapsetensor.io [AVAILABLE] • computecloud.com [PREMIUM]',
      icon: Zap
    },
    {
      title: '3. Multi-Factor Brand Scoring',
      desc: 'Linguistic algorithms calculate phonetic ease of pronunciation, syllables, recall, and organic search keyword gravity.',
      preview: 'Brand Score: 96/100 • Recall: 94/100 • Pronunciation: 98/100 • SEO Potential: 92/100',
      icon: Award
    },
    {
      title: '4. Full AI Brand Blueprint',
      desc: 'Generates company names, taglines, customer slogans, social media handle availability, and typographic logo concepts.',
      preview: 'Company: NeuralGrid AI • Slogan: "Compute without compromise" • Social: @neuralgrid (Available)',
      icon: Globe
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="glass-panel w-full max-w-2xl rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-2xl relative">
        <button
          onClick={() => setIsDemoOpen(false)}
          className="absolute top-5 right-5 p-1.5 rounded-xl bg-[#112236] text-slate-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#062B5B] border border-[#11C5A3]/40 flex items-center justify-center">
            <Play className="w-4 h-4 text-[#11C5A3] fill-[#11C5A3] ml-0.5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Interactive Product Walkthrough</h2>
            <p className="text-xs text-slate-400">How DomainForge AI finds category-defining domains in seconds</p>
          </div>
        </div>

        {/* Step indicator */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          {demoSteps.map((step, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`p-2.5 rounded-xl text-left border transition-all text-xs ${
                activeStep === idx
                  ? 'bg-[#062B5B] border-[#11C5A3] text-white shadow-md'
                  : 'bg-[#112236] border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="block font-bold">Step {idx + 1}</span>
            </button>
          ))}
        </div>

        {/* Active step showcase */}
        <div className="p-6 rounded-2xl bg-[#0D1B2A]/90 border border-slate-700 space-y-4">
          <div className="flex items-center gap-2 text-[#11C5A3] font-bold text-sm">
            <CheckCircle2 className="w-5 h-5 text-[#11C5A3]" />
            <span>{demoSteps[activeStep].title}</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {demoSteps[activeStep].desc}
          </p>

          <div className="p-4 rounded-xl bg-[#112236] border border-slate-800 font-mono text-xs text-[#4FE6CF]">
            {demoSteps[activeStep].preview}
          </div>
        </div>

        {/* Controls */}
        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={() => setActiveStep((activeStep - 1 + demoSteps.length) % demoSteps.length)}
            className="text-xs text-slate-400 hover:text-white font-semibold"
          >
            ← Previous Step
          </button>

          <div className="flex items-center gap-2">
            {activeStep < demoSteps.length - 1 ? (
              <button
                onClick={() => setActiveStep(activeStep + 1)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-[#112236] text-white border border-slate-700 hover:border-[#11C5A3]"
              >
                Next Step →
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsDemoOpen(false);
                  setView('wizard');
                }}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-[#11C5A3] text-[#062B5B] hover:bg-[#4FE6CF]"
              >
                Try Wizard Now →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
