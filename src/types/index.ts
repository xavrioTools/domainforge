export type DomainStatus = 'available' | 'taken' | 'premium';

export interface DomainSuggestion {
  name: string;
  extension: string;
  domain: string;
  status: DomainStatus;
  brandScore: number;
  memorabilityScore: number;
  pronunciationScore: number;
  seoPotentialScore: number;
  tagline: string;
  estimatedValue?: string;
  styleCategory?: string;
}

export interface WizardFormData {
  niche: string;
  category: string;
  idea: string;
  style: string;
  lengthPref: string;
  extensions: string[];
}

export interface LogoConcept {
  style: string;
  description: string;
  colors: string[];
  symbol: string;
  fontRecommendation: string;
}

export interface SeoKeyword {
  keyword: string;
  volume: string;
  difficulty: string;
}

export interface SocialUsername {
  platform: string;
  handle: string;
  available: boolean;
}

export interface AIBrandingBlueprint {
  domain: string;
  nicheFitExplanation: string;
  brandingOpportunities: string[];
  marketingPotential: string;
  companyName: string;
  tagline: string;
  slogan: string;
  logoConcepts: LogoConcept[];
  seoKeywords: SeoKeyword[];
  socialUsernames: SocialUsername[];
  brandProtection: string[];
}

export interface SavedDomain extends DomainSuggestion {
  savedAt: string;
  notes?: string;
  tag?: string;
}

export interface SearchHistoryItem {
  id: string;
  timestamp: string;
  niche: string;
  category: string;
  idea: string;
  resultCount: number;
  topDomain: string;
  domains: DomainSuggestion[];
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  tier: 'free' | 'pro';
  generationsToday: number;
  maxDailyGenerations: number;
}

export interface MonitoredDomain {
  domain: string;
  status: DomainStatus;
  lastChecked: string;
  expiryDate?: string;
  alertEmail: boolean;
}
