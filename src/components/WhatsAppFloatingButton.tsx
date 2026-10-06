import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MessageSquare, X } from 'lucide-react';

export const WhatsAppFloatingButton: React.FC = () => {
  const { settings } = useApp();
  const [showTooltip, setShowTooltip] = useState(false);

  const rawNumber = settings.whatsappNumber || '+91 70422 3942';
  const cleanNumber = rawNumber.replace(/[^0-9]/g, '');
  const message = settings.whatsappMessage || 'Hello Relation Healthcare, I would like to know more about your products.';
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Tooltip badge */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-slate-900 text-white text-xs py-2 px-3.5 rounded-lg shadow-xl animate-in fade-in slide-in-from-right-3">
          <span>Chat with Relation Healthcare</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-white"
            aria-label="Dismiss tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating CTA Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        className="group relative flex items-center justify-center w-14 h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-emerald-300"
        aria-label="Chat with Relation Healthcare on WhatsApp"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
        </span>
        <MessageSquare className="w-7 h-7" />
      </a>
    </div>
  );
};
