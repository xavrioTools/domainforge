import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 rounded-xl shadow-2xl backdrop-blur-xl border transition-all duration-300 animate-in slide-in-from-bottom-3 ${
            toast.type === 'success'
              ? 'bg-[#062B5B]/90 border-[#11C5A3]/40 text-white'
              : toast.type === 'error'
              ? 'bg-rose-950/90 border-rose-500/40 text-rose-100'
              : 'bg-[#0D1B2A]/90 border-slate-700/80 text-slate-100'
          }`}
        >
          <div className="flex items-center gap-2.5 text-sm font-medium">
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-[#11C5A3] shrink-0" />}
            {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-[#4FE6CF] shrink-0" />}
            <span>{toast.message}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
