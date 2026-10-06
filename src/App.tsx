/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { GalleryPage } from './pages/GalleryPage';
import { EmployeesReportingPage } from './pages/EmployeesReportingPage';
import { ContactPage } from './pages/ContactPage';
import { FeedbackPage } from './pages/FeedbackPage';
import { AdminPanel } from './pages/AdminPanel';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const MainContent: React.FC = () => {
  const { currentRoute, toast } = useApp();

  const renderCurrentPage = () => {
    switch (currentRoute) {
      case 'home':
        return <HomePage />;
      case 'about':
        return <AboutPage />;
      case 'products':
        return <ProductsPage />;
      case 'product-detail':
        return <ProductDetailPage />;
      case 'gallery':
        return <GalleryPage />;
      case 'employees-reporting':
        return <EmployeesReportingPage />;
      case 'contact':
        return <ContactPage />;
      case 'feedback':
        return <FeedbackPage />;
      case 'admin':
        return <AdminPanel />;
      default:
        return <HomePage />;
    }
  };

  const isAdmin = currentRoute === 'admin';

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Toast Notification Container */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 animate-in fade-in slide-in-from-top-3 max-w-sm">
          <div
            className={`p-3.5 rounded-lg shadow-xl border flex items-center gap-3 text-xs font-medium ${
              toast.type === 'error'
                ? 'bg-red-50 text-red-800 border-red-200'
                : toast.type === 'info'
                ? 'bg-blue-50 text-blue-800 border-blue-200'
                : 'bg-emerald-50 text-emerald-800 border-emerald-200'
            }`}
          >
            {toast.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            ) : toast.type === 'info' ? (
              <Info className="w-4 h-4 text-blue-600 shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            )}
            <span className="flex-1">{toast.message}</span>
          </div>
        </div>
      )}

      {/* Website Navigation Header */}
      {!isAdmin && <Navbar />}

      {/* Page Body */}
      <main className="flex-1">{renderCurrentPage()}</main>

      {/* Floating WhatsApp CTA */}
      <WhatsAppFloatingButton />

      {/* Global Pharmaceutical Corporate Footer */}
      {!isAdmin && <Footer />}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
