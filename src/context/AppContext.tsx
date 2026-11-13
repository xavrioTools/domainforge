import React, { createContext, useContext, useState, useEffect } from 'react';
import { DomainSuggestion, WizardFormData, SavedDomain, SearchHistoryItem, UserProfile, MonitoredDomain } from '../types';
import { generateDomains, checkLiveDomain } from '../services/api';
import { fireCelebration } from '../utils/export';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface AppContextType {
  view: 'home' | 'wizard' | 'results' | 'dashboard' | 'trends' | 'compare' | 'pricing' | 'admin';
  setView: (view: 'home' | 'wizard' | 'results' | 'dashboard' | 'trends' | 'compare' | 'pricing' | 'admin') => void;
  wizardData: WizardFormData;
  setWizardData: React.Dispatch<React.SetStateAction<WizardFormData>>;
  results: DomainSuggestion[];
  setResults: React.Dispatch<React.SetStateAction<DomainSuggestion[]>>;
  isGenerating: boolean;
  runGeneration: (overrideData?: Partial<WizardFormData>) => Promise<void>;
  savedDomains: SavedDomain[];
  toggleSaveDomain: (domain: DomainSuggestion) => void;
  isDomainSaved: (domainStr: string) => boolean;
  removeSavedDomain: (domainStr: string) => void;
  updateSavedNote: (domainStr: string, note: string, tag?: string) => void;
  searchHistory: SearchHistoryItem[];
  user: UserProfile;
  login: (email?: string, name?: string) => void;
  logout: () => void;
  upgradeToPro: () => void;
  monitoredDomains: MonitoredDomain[];
  addMonitoredDomain: (domain: string, status?: 'available' | 'taken' | 'premium') => void;
  removeMonitoredDomain: (domain: string) => void;
  activeBrandingDomain: DomainSuggestion | null;
  setActiveBrandingDomain: (d: DomainSuggestion | null) => void;
  comparedDomains: DomainSuggestion[];
  toggleCompareDomain: (d: DomainSuggestion) => void;
  clearComparison: () => void;
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  themeMode: 'dark' | 'light';
  toggleTheme: () => void;
  isDemoOpen: boolean;
  setIsDemoOpen: (v: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (v: boolean) => void;
  quickCheckDomain: (domain: string) => Promise<DomainSuggestion>;
}

const defaultWizardData: WizardFormData = {
  niche: 'AI',
  category: 'Software',
  idea: 'An intelligent platform that empowers builders to discover and launch modern digital products',
  style: 'Brandable',
  lengthPref: 'Short (6-10 letters)',
  extensions: ['.com', '.io', '.ai', '.co'],
};

const defaultUser: UserProfile = {
  name: 'Alex Rivera',
  email: 'alex@startup.io',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
  tier: 'free',
  generationsToday: 3,
  maxDailyGenerations: 10,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [view, setView] = useState<'home' | 'wizard' | 'results' | 'dashboard' | 'trends' | 'compare' | 'pricing' | 'admin'>('home');
  const [wizardData, setWizardData] = useState<WizardFormData>(() => {
    try {
      const saved = localStorage.getItem('df_wizard_data');
      return saved ? JSON.parse(saved) : defaultWizardData;
    } catch {
      return defaultWizardData;
    }
  });

  const [results, setResults] = useState<DomainSuggestion[]>(() => {
    try {
      const saved = localStorage.getItem('df_results');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [savedDomains, setSavedDomains] = useState<SavedDomain[]>(() => {
    try {
      const saved = localStorage.getItem('df_saved_domains');
      return saved ? JSON.parse(saved) : [
        {
          name: 'neuralflow',
          extension: '.ai',
          domain: 'neuralflow.ai',
          status: 'available',
          brandScore: 96,
          memorabilityScore: 94,
          pronunciationScore: 98,
          seoPotentialScore: 92,
          tagline: 'Autonomous AI workflow orchestrator',
          estimatedValue: '$3,800',
          styleCategory: 'AI Generated',
          savedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
          tag: 'High Priority',
          notes: 'Top contender for the new agentic workflow product!'
        },
        {
          name: 'hypercraft',
          extension: '.io',
          domain: 'hypercraft.io',
          status: 'available',
          brandScore: 92,
          memorabilityScore: 90,
          pronunciationScore: 95,
          seoPotentialScore: 88,
          tagline: 'Developer tooling for rapid MVP creation',
          estimatedValue: '$2,200',
          styleCategory: 'Brandable',
          savedAt: new Date(Date.now() - 3600000 * 48).toISOString(),
          tag: 'DevTools',
          notes: 'Great fit for the command-line developer suite.'
        }
      ];
    } catch {
      return [];
    }
  });

  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('df_search_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('df_user');
      return saved ? JSON.parse(saved) : defaultUser;
    } catch {
      return defaultUser;
    }
  });

  const [monitoredDomains, setMonitoredDomains] = useState<MonitoredDomain[]>(() => {
    try {
      const saved = localStorage.getItem('df_monitored');
      return saved ? JSON.parse(saved) : [
        {
          domain: 'stride.ai',
          status: 'taken',
          lastChecked: 'Today at 08:30 AM',
          expiryDate: '2027-04-18',
          alertEmail: true
        },
        {
          domain: 'pulseforge.com',
          status: 'premium',
          lastChecked: 'Yesterday',
          expiryDate: '2026-12-05',
          alertEmail: true
        }
      ];
    } catch {
      return [];
    }
  });

  const [activeBrandingDomain, setActiveBrandingDomain] = useState<DomainSuggestion | null>(null);
  const [comparedDomains, setComparedDomains] = useState<DomainSuggestion[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>('dark');
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('df_wizard_data', JSON.stringify(wizardData));
  }, [wizardData]);

  useEffect(() => {
    localStorage.setItem('df_results', JSON.stringify(results));
  }, [results]);

  useEffect(() => {
    localStorage.setItem('df_saved_domains', JSON.stringify(savedDomains));
  }, [savedDomains]);

  useEffect(() => {
    localStorage.setItem('df_search_history', JSON.stringify(searchHistory));
  }, [searchHistory]);

  useEffect(() => {
    localStorage.setItem('df_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('df_monitored', JSON.stringify(monitoredDomains));
  }, [monitoredDomains]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3800);
  };

  const toggleSaveDomain = (domain: DomainSuggestion) => {
    const exists = savedDomains.some(d => d.domain === domain.domain);
    if (exists) {
      setSavedDomains(prev => prev.filter(d => d.domain !== domain.domain));
      showToast(`Removed "${domain.domain}" from saved domains`, 'info');
    } else {
      const newSaved: SavedDomain = {
        ...domain,
        savedAt: new Date().toISOString(),
        tag: 'Favorite',
      };
      setSavedDomains(prev => [newSaved, ...prev]);
      fireCelebration();
      showToast(`Saved "${domain.domain}" to your dashboard!`, 'success');
    }
  };

  const isDomainSaved = (domainStr: string) => {
    return savedDomains.some(d => d.domain === domainStr);
  };

  const removeSavedDomain = (domainStr: string) => {
    setSavedDomains(prev => prev.filter(d => d.domain !== domainStr));
    showToast(`Removed "${domainStr}"`, 'info');
  };

  const updateSavedNote = (domainStr: string, note: string, tag?: string) => {
    setSavedDomains(prev =>
      prev.map(d => (d.domain === domainStr ? { ...d, notes: note, tag: tag ?? d.tag } : d))
    );
    showToast(`Notes updated for ${domainStr}`, 'success');
  };

  const runGeneration = async (overrideData?: Partial<WizardFormData>) => {
    // Check usage limits for free tier
    if (user.tier === 'free' && user.generationsToday >= user.maxDailyGenerations) {
      showToast('Daily generation limit reached on Free plan. Upgrade to Pro for unlimited!', 'error');
      setView('pricing');
      return;
    }

    const dataToUse = { ...wizardData, ...(overrideData || {}) };
    setIsGenerating(true);
    setView('results');

    try {
      const generated = await generateDomains(dataToUse);
      setResults(generated);

      // Increment user generation count
      setUser(prev => ({
        ...prev,
        generationsToday: prev.tier === 'pro' ? 0 : prev.generationsToday + 1,
      }));

      // Add to search history
      if (generated.length > 0) {
        const historyItem: SearchHistoryItem = {
          id: Math.random().toString(36).substring(2, 9),
          timestamp: new Date().toISOString(),
          niche: dataToUse.niche,
          category: dataToUse.category,
          idea: dataToUse.idea,
          resultCount: generated.length,
          topDomain: generated[0]?.domain || '',
          domains: generated,
        };
        setSearchHistory(prev => [historyItem, ...prev.slice(0, 19)]);
      }

      showToast(`Generated ${generated.length} AI domain suggestions!`, 'success');
    } catch (err) {
      console.error(err);
      showToast('Failed to generate domains. Please try again.', 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  const quickCheckDomain = async (domainInput: string): Promise<DomainSuggestion> => {
    const clean = domainInput.toLowerCase().replace(/https?:\/\//, '').replace(/\/.*$/, '').trim();
    const parts = clean.split('.');
    const name = parts[0] || 'brand';
    const ext = parts.length > 1 ? `.${parts.slice(1).join('.')}` : '.com';
    const full = `${name}${ext}`;

    const check = await checkLiveDomain(full);
    const suggestion: DomainSuggestion = {
      name,
      extension: ext,
      domain: full,
      status: check.status,
      brandScore: 88,
      memorabilityScore: 85,
      pronunciationScore: 90,
      seoPotentialScore: 84,
      tagline: `Quick analyzed domain for ${name}`,
      estimatedValue: check.status === 'premium' ? '$3,500' : check.status === 'taken' ? '$1,000+' : '$14/yr',
      styleCategory: 'Direct Lookup'
    };
    return suggestion;
  };

  const toggleCompareDomain = (domain: DomainSuggestion) => {
    const exists = comparedDomains.some(d => d.domain === domain.domain);
    if (exists) {
      setComparedDomains(prev => prev.filter(d => d.domain !== domain.domain));
      showToast(`Removed ${domain.domain} from comparison`, 'info');
    } else {
      if (comparedDomains.length >= 3) {
        showToast('You can compare up to 3 domains side-by-side', 'info');
        return;
      }
      setComparedDomains(prev => [...prev, domain]);
      showToast(`Added ${domain.domain} to comparison!`, 'success');
    }
  };

  const clearComparison = () => {
    setComparedDomains([]);
  };

  const addMonitoredDomain = (domain: string, status: 'available' | 'taken' | 'premium' = 'taken') => {
    if (monitoredDomains.some(d => d.domain === domain)) {
      showToast(`${domain} is already being monitored`, 'info');
      return;
    }
    const newMonitored: MonitoredDomain = {
      domain,
      status,
      lastChecked: 'Just now',
      expiryDate: '2027-01-15',
      alertEmail: true
    };
    setMonitoredDomains(prev => [newMonitored, ...prev]);
    showToast(`Started monitoring ${domain}`, 'success');
  };

  const removeMonitoredDomain = (domain: string) => {
    setMonitoredDomains(prev => prev.filter(d => d.domain !== domain));
    showToast(`Stopped monitoring ${domain}`, 'info');
  };

  const login = (email = 'alex@startup.io', name = 'Alex Rivera') => {
    setUser({
      name,
      email,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      tier: 'free',
      generationsToday: 3,
      maxDailyGenerations: 10,
    });
    showToast(`Welcome back, ${name}!`, 'success');
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    setUser({
      name: 'Guest User',
      email: '',
      avatar: '',
      tier: 'free',
      generationsToday: 0,
      maxDailyGenerations: 10,
    });
    showToast('Signed out successfully', 'info');
  };

  const upgradeToPro = () => {
    setUser(prev => ({
      ...prev,
      tier: 'pro',
      generationsToday: 0,
      maxDailyGenerations: 999999,
    }));
    fireCelebration();
    showToast('🎉 Upgraded to DomainForge Pro! Enjoy unlimited generations and export!', 'success');
  };

  const toggleTheme = () => {
    const next = themeMode === 'dark' ? 'light' : 'dark';
    setThemeMode(next);
    document.documentElement.classList.toggle('dark', next === 'dark');
  };

  return (
    <AppContext.Provider
      value={{
        view,
        setView,
        wizardData,
        setWizardData,
        results,
        setResults,
        isGenerating,
        runGeneration,
        savedDomains,
        toggleSaveDomain,
        isDomainSaved,
        removeSavedDomain,
        updateSavedNote,
        searchHistory,
        user,
        login,
        logout,
        upgradeToPro,
        monitoredDomains,
        addMonitoredDomain,
        removeMonitoredDomain,
        activeBrandingDomain,
        setActiveBrandingDomain,
        comparedDomains,
        toggleCompareDomain,
        clearComparison,
        toasts,
        showToast,
        themeMode,
        toggleTheme,
        isDemoOpen,
        setIsDemoOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        quickCheckDomain,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
