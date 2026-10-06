import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Mail, Phone, MapPin, ShieldAlert, FileText, CheckCircle2, Lock } from 'lucide-react';
import { LogoIcon } from './Logo';

export const Footer: React.FC = () => {
  const { settings, navigateTo } = useApp();
  const [modalType, setModalType] = useState<'privacy' | 'terms' | 'disclaimer' | null>(null);

  const cleanWhatsappNumber = (settings.whatsappNumber || '+91 70422 3942').replace(/[^0-9]/g, '');

  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand & Tagline */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-1 rounded-lg bg-white/10 backdrop-blur-xs flex items-center justify-center">
                <LogoIcon size={38} withReflection={false} />
              </div>
              <div>
                <span className="text-xl font-black text-white tracking-tight block">
                  {settings.companyName || 'RELATION HEALTHCARE'}
                </span>
                <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase -mt-1 block">
                  Pharmaceutical Care
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-300 font-medium">
              {settings.footerTagline || 'Quality Healthcare. Trusted Relationships.'}
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Committed to therapeutic excellence, verified pharmaceutical standard formulations, and dependable healthcare partnerships across India.
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigateTo('admin')}
                className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors"
              >
                <Lock className="w-3 h-3" />
                <span>Authorized Administrative Login</span>
              </button>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => navigateTo('home')}
                  className="hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('about')}
                  className="hover:text-white transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('products')}
                  className="hover:text-white transition-colors"
                >
                  Product Catalogue
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('gallery')}
                  className="hover:text-white transition-colors"
                >
                  Gallery &amp; Facilities
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('employees-reporting')}
                  className="hover:text-white transition-colors text-blue-400 font-medium"
                >
                  Employees Reporting Portal
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('contact')}
                  className="hover:text-white transition-colors"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('feedback')}
                  className="hover:text-white transition-colors"
                >
                  Ask / Feedback
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Products */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Featured Formulations
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="space-y-1">
                <button
                  onClick={() => navigateTo('product-detail', 'acetion-sp')}
                  className="text-left font-semibold text-slate-200 hover:text-blue-400 block"
                >
                  ACETION-SP™ Tablets
                </button>
                <div className="text-slate-500">
                  Aceclofenac 100mg + Paracetamol 325mg + Serratiopeptidase 15mg
                </div>
              </li>
              <li className="space-y-1">
                <button
                  onClick={() => navigateTo('product-detail', 'gastion')}
                  className="text-left font-semibold text-slate-200 hover:text-blue-400 block"
                >
                  GASTION™ Capsules
                </button>
                <div className="text-slate-500">
                  Rabeprazole Sodium 20mg + Domperidone 30mg (SR)
                </div>
              </li>
              <li className="space-y-1">
                <button
                  onClick={() => navigateTo('product-detail', 'bankcal')}
                  className="text-left font-semibold text-slate-200 hover:text-blue-400 block"
                >
                  BANKCAL™ Tablets
                </button>
                <div className="text-slate-500">
                  Calcium Carbonate 1250mg + D3 2000 IU + Methylcobalamin
                </div>
              </li>
              <li className="space-y-1">
                <button
                  onClick={() => navigateTo('product-detail', 'lifetion-xt')}
                  className="text-left font-semibold text-slate-200 hover:text-blue-400 block"
                >
                  LIFETION-XT™ Tablets &amp; Syrup
                </button>
                <div className="text-slate-500">
                  Ferrous Ascorbate 100mg + Folic Acid 1.5mg + Zinc 22.5mg
                </div>
              </li>
            </ul>
          </div>

          {/* Col 4: Official Contact */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Corporate Office
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>{settings.address || 'Relation Healthcare, New Delhi, India'}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a
                  href={`mailto:${settings.email || 'relationhealthcare@gmail.com'}`}
                  className="hover:text-white transition-colors"
                >
                  {settings.email || 'relationhealthcare@gmail.com'}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`https://wa.me/${cleanWhatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors"
                >
                  WhatsApp: {settings.whatsappNumber || '+91 70422 3942'}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => navigateTo('contact')}
                className="w-full text-center px-3.5 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-600 rounded-md transition-colors"
              >
                Send Direct Enquiry
              </button>
            </div>
          </div>
        </div>

        {/* Medical Disclaimer Banner */}
        <div className="mt-8 p-4 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-400 flex items-start gap-3">
          <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-slate-300">Statutory Medical Notice: </span>
            This product information is provided strictly for registered healthcare professionals, medical distributors, and reference purposes. Patients and consumers must use pharmaceutical preparations only under the direct prescription and guidance of a qualified healthcare practitioner.
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            &copy; {new Date().getFullYear()} {settings.companyName || 'Relation Healthcare'}. All rights reserved.
          </div>

          <div className="flex items-center gap-5">
            <button
              onClick={() => setModalType('privacy')}
              className="hover:text-slate-300 transition-colors"
            >
              Privacy Policy
            </button>
            <span className="text-slate-700">·</span>
            <button
              onClick={() => setModalType('terms')}
              className="hover:text-slate-300 transition-colors"
            >
              Terms &amp; Conditions
            </button>
            <span className="text-slate-700">·</span>
            <button
              onClick={() => setModalType('disclaimer')}
              className="hover:text-slate-300 transition-colors"
            >
              Medical Disclaimer
            </button>
          </div>
        </div>
      </div>

      {/* Legal Dialog Modal */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
          <div className="bg-white text-slate-900 rounded-xl max-w-lg w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95">
            <h3 className="text-lg font-bold text-slate-900 mb-3">
              {modalType === 'privacy' && 'Privacy Policy'}
              {modalType === 'terms' && 'Terms & Conditions'}
              {modalType === 'disclaimer' && 'Pharmaceutical Information Disclaimer'}
            </h3>
            <div className="text-xs text-slate-600 space-y-2.5 max-h-80 overflow-y-auto pr-2">
              {modalType === 'privacy' && (
                <>
                  <p>
                    Relation Healthcare respects your data privacy. Information submitted through contact, enquiry, or feedback forms (including name, telephone, email, and location) is used solely to respond to your specific pharmaceutical enquiries.
                  </p>
                  <p>
                    We never sell, rent, or lease healthcare provider contact databases or employee reporting data to third parties.
                  </p>
                </>
              )}
              {modalType === 'terms' && (
                <>
                  <p>
                    All content, trade names (including ACTION-SP™ and GASTION™), formulations, packaging designs, and text appearing on this website are proprietary to Relation Healthcare.
                  </p>
                  <p>
                    Any unauthorized duplication, commercial re-use, or misrepresentation is strictly prohibited under applicable pharmaceutical and trademark laws.
                  </p>
                </>
              )}
              {modalType === 'disclaimer' && (
                <>
                  <p>
                    The information contained on this website is for informational and professional medical representative reference only. It does not constitute medical advice or diagnosis.
                  </p>
                  <p>
                    Dosage schedules and indications must be verified by licensed doctors in accordance with patient-specific medical considerations.
                  </p>
                </>
              )}
            </div>
            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setModalType(null)}
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
