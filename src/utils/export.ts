import { DomainSuggestion } from '../types';
import confetti from 'canvas-confetti';

export function fireCelebration() {
  try {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#11C5A3', '#4FE6CF', '#062B5B', '#FFFFFF'],
    });
  } catch (e) {
    // ignore
  }
}

export function exportToCSV(domains: DomainSuggestion[], filename = 'domainforge-suggestions.csv') {
  const headers = ['Domain', 'Extension', 'Status', 'Brand Score', 'Memorability', 'Pronunciation', 'SEO Score', 'Est. Value', 'Tagline'];
  const rows = domains.map(d => [
    `"${d.domain}"`,
    `"${d.extension}"`,
    `"${d.status}"`,
    d.brandScore,
    d.memorabilityScore,
    d.pronunciationScore,
    d.seoPotentialScore,
    `"${d.estimatedValue || ''}"`,
    `"${(d.tagline || '').replace(/"/g, '""')}"`
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportToJSON(domains: DomainSuggestion[], filename = 'domainforge-suggestions.json') {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(domains, null, 2));
  const link = document.createElement('a');
  link.setAttribute('href', dataStr);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function triggerPrintReport() {
  window.print();
}

export function getRegistrarUrl(domain: string, registrar: 'namecheap' | 'godaddy' | 'porkbun' | 'squarespace' = 'namecheap'): string {
  const clean = encodeURIComponent(domain);
  switch (registrar) {
    case 'namecheap':
      return `https://www.namecheap.com/domains/registration/results/?domain=${clean}`;
    case 'godaddy':
      return `https://www.godaddy.com/domainsearch/find?checkAvail=1&domainToCheck=${clean}`;
    case 'porkbun':
      return `https://porkbun.com/checkout/search?q=${clean}`;
    case 'squarespace':
      return `https://domains.squarespace.com/?query=${clean}`;
    default:
      return `https://www.namecheap.com/domains/registration/results/?domain=${clean}`;
  }
}
