import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, ShieldCheck, HeartHandshake, Handshake, CheckCircle2, Send, MessageSquare } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { homepage, products, navigateTo, submitEnquiry, settings } = useApp();
  const [quickForm, setQuickForm] = useState({
    name: '',
    mobile: '',
    city: '',
    productInterestedIn: 'ACETION-SP™',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const featuredList = products.filter(p => p.featured && p.published).slice(0, 4);

  const handleQuickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickForm.name || !quickForm.mobile) return;
    setSubmitting(true);
    const success = await submitEnquiry({
      name: quickForm.name,
      mobile: quickForm.mobile,
      email: '',
      city: quickForm.city,
      subject: `Homepage Quick Enquiry - ${quickForm.productInterestedIn}`,
      productInterestedIn: quickForm.productInterestedIn,
      message: quickForm.message || 'Customer requested call-back from homepage.'
    });
    setSubmitting(false);
    if (success) {
      setSubmitted(true);
      setQuickForm({ name: '', mobile: '', city: '', productInterestedIn: 'ACETION-SP™', message: '' });
    }
  };

  return (
    <div className="space-y-24 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-slate-950 text-white pt-16 pb-24 lg:py-28">
        {/* Subtle decorative background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/80 via-slate-950 to-slate-900 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-blue-400">
                <span className="w-6 h-px bg-blue-400"></span>
                <span>Pharmaceutical Excellence</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight" style={{ textWrap: 'balance' }}>
                {homepage.headline || 'Quality Healthcare. Trusted Relationships.'}
              </h1>

              <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl">
                {homepage.subheadline ||
                  'Relation Healthcare is committed to providing quality healthcare products with a focus on reliability, innovation and professional service.'}
              </p>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => navigateTo('products')}
                  className="px-6 py-3.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-md transition-colors flex items-center gap-2 shadow-sm"
                >
                  <span>{homepage.ctaPrimaryText || 'Explore Products'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => navigateTo('contact')}
                  className="px-6 py-3.5 text-sm font-semibold text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-md transition-colors"
                >
                  {homepage.ctaSecondaryText || 'Contact Us'}
                </button>
              </div>

              {/* Key Trust Metrics */}
              <div className="pt-8 border-t border-slate-800 grid grid-cols-3 gap-6 text-left">
                <div>
                  <div className="text-2xl font-black text-white font-mono">100%</div>
                  <div className="text-xs text-slate-400 font-medium mt-0.5">cGMP Verified Standard</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-white font-mono">Alu-Alu</div>
                  <div className="text-xs text-slate-400 font-medium mt-0.5">Potency Protection</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-white font-mono">PAN-India</div>
                  <div className="text-xs text-slate-400 font-medium mt-0.5">Distribution Reach</div>
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-900 aspect-4/3 flex items-center justify-center p-2">
                <img
                  src={homepage.heroImage}
                  alt="Relation Healthcare Pharmaceutical Research"
                  className="w-full h-full object-cover rounded-xl"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none rounded-xl" />
                <div className="absolute bottom-4 left-4 right-4 p-3 bg-slate-900/90 backdrop-blur-md rounded-lg border border-slate-700 text-xs">
                  <div className="font-bold text-white">Precision Therapeutic Formulations</div>
                  <div className="text-slate-400 text-[11px]">Therapeutic integrity engineered for verified doctor confidence</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. COMPANY INTRODUCTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="text-xs font-bold uppercase tracking-widest text-blue-700">
            About Relation Healthcare
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight" style={{ textWrap: 'balance' }}>
            {homepage.companyIntroTitle || 'Dedicated to Medical Excellence & Reliable Care'}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {homepage.companyIntroText ||
              'At Relation Healthcare, we bridge the gap between advanced pharmaceutical science and everyday patient care. Our focus is centered on therapeutic precision, stringent manufacturing standards, and steadfast partnerships with medical practitioners across India.'}
          </p>
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-slate-200 gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-blue-700 mb-1">
              Therapeutic Portfolio
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Featured Pharmaceutical Products
            </h2>
          </div>
          <button
            onClick={() => navigateTo('products')}
            className="text-sm font-bold text-blue-700 hover:text-blue-800 flex items-center gap-1.5 transition-colors"
          >
            <span>View Complete Catalogue</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredList.map(product => (
            <div
              key={product.id}
              className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200 flex flex-col group"
            >
              {/* Product Visual */}
              <div className="aspect-4/3 bg-white relative overflow-hidden p-2 border-b border-slate-100 flex items-center justify-center">
                <img
                  src={product.primaryImage}
                  alt={product.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Product Info */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="text-[11px] font-semibold text-blue-700 tracking-wide uppercase">
                    {product.category} · {product.dosageForm}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                    {product.name}
                  </h3>
                  <div className="text-xs font-medium text-slate-600 line-clamp-2 leading-relaxed">
                    {product.composition}
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {product.shortDescription}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <button
                    onClick={() => navigateTo('product-detail', product.slug)}
                    className="w-full py-2.5 px-3 text-xs font-bold text-slate-800 hover:text-white bg-slate-100 hover:bg-blue-700 rounded-md transition-colors text-center block"
                  >
                    View Details &amp; Composition
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. OUR COMMITMENT */}
      <section className="bg-slate-50 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <div className="text-xs font-bold uppercase tracking-widest text-blue-700">
              Corporate Standards
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Our Healthcare Commitment
            </h2>
            <p className="text-sm text-slate-600">
              Adhering to ethical manufacturing and professional integrity at every step.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Rigorous Quality Standards
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Every batch is formulated under verified pharmaceutical good manufacturing practices ensuring optimal bioavailability, dissolution purity, and safety.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Patient-First Formulations
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Therapeutically balanced compositions like ACTION-SP™ and GASTION™ tailored to provide targeted relief without unnecessary gastric or systemic burden.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Handshake className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Dependable Partnerships
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Cultivating enduring relationships with doctors, pharmacists, and medical distributors built on trust, transparency, and timely delivery support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHY RELATION HEALTHCARE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-4">
            <div className="text-xs font-bold uppercase tracking-widest text-blue-700">
              The Relation Advantage
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight" style={{ textWrap: 'balance' }}>
              Why Healthcare Professionals Choose Relation
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              We understand that clinical outcomes depend on drug purity, consistent release kinetics, and trustworthy communication. Our entire operating model reflects this responsibility.
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigateTo('about')}
                className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1.5"
              >
                <span>Read more about our approach</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {homepage.whyChooseUs?.map((item, idx) => (
              <div key={idx} className="p-6 rounded-xl bg-white border border-slate-200 space-y-2">
                <div className="text-xs font-bold text-blue-700 font-mono">0{idx + 1}.</div>
                <h4 className="text-base font-bold text-slate-900">{item.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. QUICK CONTACT & ENQUIRY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-12 border border-slate-800 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-6 space-y-4">
            <div className="text-xs font-bold uppercase tracking-widest text-blue-400">
              Immediate Assistance
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Connect with Relation Healthcare
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Whether you are an orthopedic specialist, gastroenterologist, hospital procurement head, or pharmaceutical distributor — we look forward to serving you.
            </p>

            <div className="pt-4 space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white">Email:</span>
                <span>{settings.email || 'relationhealthcare@gmail.com'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white">WhatsApp:</span>
                <span>{settings.whatsappNumber || '+91 70422 3942'}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-white text-slate-900 p-6 sm:p-8 rounded-xl shadow-md">
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Quick Product Enquiry
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Submit your inquiry and our territory team will respond within 24 hours.
            </p>

            {submitted ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold">Thank you. Your enquiry has been received.</div>
                  <div className="mt-0.5 text-emerald-700">Our medical representative will contact you shortly.</div>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-2 text-xs font-semibold text-emerald-900 underline"
                  >
                    Send another query
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleQuickSubmit} className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Your Name / Dr. Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Dr. / Mr. Name"
                      value={quickForm.name}
                      onChange={e => setQuickForm({ ...quickForm, name: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98XXX XXXXX"
                      value={quickForm.mobile}
                      onChange={e => setQuickForm({ ...quickForm, mobile: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      City / Territory
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. New Delhi, Jaipur"
                      value={quickForm.city}
                      onChange={e => setQuickForm({ ...quickForm, city: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Product Interested In
                    </label>
                    <select
                      value={quickForm.productInterestedIn}
                      onChange={e => setQuickForm({ ...quickForm, productInterestedIn: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
                    >
                      {products.map(p => (
                        <option key={p.id} value={p.name}>
                          {p.name}
                        </option>
                      ))}
                      <option value="General Distribution">General Distribution</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Message / Requirement
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Provide details on required quantity or clinical samples..."
                    value={quickForm.message}
                    onChange={e => setQuickForm({ ...quickForm, message: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-2.5 px-4 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-md transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{submitting ? 'Sending Enquiry...' : 'Send Enquiry'}</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

    </div>
  );
};
