import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MessageSquare, Phone, ShieldCheck, UserCheck, Menu, X, LogOut } from 'lucide-react';
import { LogoIcon } from './Logo';

export const Navbar: React.FC = () => {
  const { currentRoute, navigateTo, settings, currentUser, setCurrentUser } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cleanWhatsappNumber = (settings.whatsappNumber || '+91 70422 3942').replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanWhatsappNumber}?text=${encodeURIComponent(
    settings.whatsappMessage || 'Hello Relation Healthcare, I would like to know more about your products.'
  )}`;

  const navLinks = [
    { label: 'HOME', route: 'home' },
    { label: 'ABOUT US', route: 'about' },
    { label: 'PRODUCTS', route: 'products' },
    { label: 'GALLERY', route: 'gallery' },
    { label: 'EMPLOYEES REPORTING', route: 'employees-reporting' },
    { label: 'CONTACT US', route: 'contact' },
    { label: 'ASK / FEEDBACK', route: 'feedback' },
  ];

  const handleNavClick = (route: string) => {
    navigateTo(route);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {settings.announcementActive && settings.announcementText && (
        <div className="bg-slate-900 text-slate-100 text-xs py-1.5 px-4 text-center tracking-wide font-medium flex items-center justify-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-blue-400"></span>
          <span>{settings.announcementText}</span>
        </div>
      )}

      {/* Top Bar Contract: Zone 1 (Wordmark), Zone 2 (4-6 Clean Nav Links), Zone 3 (Primary Actions) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Zone 1: Top Side Left Official Logo & Brand Mark */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-left group focus:outline-none flex items-center gap-3.5 py-1 cursor-pointer"
          title="Relation Healthcare - Home"
          aria-label="Relation Healthcare - Home"
        >
          {/* Logo Badge Container */}
          <div className="relative shrink-0 flex items-center justify-center p-1.5 rounded-xl bg-white border border-slate-200/90 shadow-xs ring-1 ring-slate-100 group-hover:border-blue-400 group-hover:shadow-sm transition-all duration-200">
            {settings.logoUrl ? (
              <img
                src={settings.logoUrl}
                alt="Relation Healthcare Logo"
                className="w-11 h-11 sm:w-12 sm:h-12 object-contain rounded-lg"
              />
            ) : (
              <LogoIcon size={46} idSuffix="navbar-top-left" className="transition-transform duration-200 group-hover:scale-105" />
            )}
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 group-hover:text-blue-700 transition-colors block leading-tight">
              {settings.companyName || 'RELATION HEALTHCARE'}
            </span>
            <div className="text-[10px] font-bold tracking-wider text-blue-700 uppercase -mt-0.5 flex items-center gap-1.5">
              <span>Quality Healthcare</span>
              <span className="w-1 h-1 rounded-full bg-slate-300"></span>
              <span className="text-slate-500 font-semibold">Trusted Relationships</span>
            </div>
          </div>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden xl:flex items-center gap-7 text-xs font-semibold tracking-wide">
          {navLinks.map(link => {
            const isActive = currentRoute === link.route || (link.route === 'products' && currentRoute === 'product-detail');
            return (
              <button
                key={link.route}
                onClick={() => handleNavClick(link.route)}
                className={`transition-colors py-1 relative ${
                  isActive
                    ? 'text-blue-700 font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Actions (WhatsApp, Admin/Portal) */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-md transition-colors whitespace-nowrap shadow-xs"
            title="Chat with Relation Healthcare on WhatsApp"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
            <span>WhatsApp</span>
          </a>

          {currentUser ? (
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <button
                onClick={() => handleNavClick(currentUser.role === 'admin' ? 'admin' : 'employees-reporting')}
                className="text-xs font-semibold text-slate-700 hover:text-blue-700 flex items-center gap-1.5 py-1 px-2 rounded-md hover:bg-slate-100"
              >
                <UserCheck className="w-3.5 h-3.5 text-blue-600" />
                <span className="max-w-[110px] truncate">{currentUser.name.split(' ')[0]}</span>
              </button>
              <button
                onClick={() => setCurrentUser(null)}
                title="Log out"
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-md hover:bg-slate-100"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => handleNavClick('admin')}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-blue-900 rounded-md transition-colors whitespace-nowrap shadow-xs"
            >
              Admin Portal
            </button>
          )}
        </div>

        {/* Mobile menu hamburger button */}
        <div className="flex items-center gap-2 xl:hidden">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-emerald-700 bg-emerald-50 rounded-md md:hidden"
            aria-label="WhatsApp"
          >
            <MessageSquare className="w-4 h-4" />
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-slate-900 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-2 mb-4">
            {navLinks.map(link => {
              const isActive = currentRoute === link.route || (link.route === 'products' && currentRoute === 'product-detail');
              return (
                <button
                  key={link.route}
                  onClick={() => handleNavClick(link.route)}
                  className={`text-left px-3 py-2.5 rounded-md text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-semibold text-white bg-emerald-600 rounded-md shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>

            {currentUser ? (
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-medium text-slate-600">
                  Signed in: {currentUser.name} ({currentUser.role})
                </span>
                <button
                  onClick={() => {
                    setCurrentUser(null);
                    setMobileMenuOpen(false);
                  }}
                  className="text-xs text-red-600 font-semibold"
                >
                  Log out
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleNavClick('admin')}
                className="w-full text-center px-4 py-2 text-sm font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-md"
              >
                Admin Panel Login
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
