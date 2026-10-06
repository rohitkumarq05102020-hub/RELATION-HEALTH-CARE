import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowLeft, ShieldAlert, CheckCircle2, Send, MessageSquare, Package, Pill, Sparkles, FileText } from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { products, selectedProductSlug, navigateTo, submitEnquiry, settings } = useApp();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    mobile: '',
    city: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Find product by slug or id
  const product = products.find(
    p => p.slug === selectedProductSlug ||
         p.id === selectedProductSlug ||
         (selectedProductSlug === 'acetion-sp' && (p.slug === 'action-sp' || p.brandName === 'ACTION-SP')) ||
         (selectedProductSlug === 'action-sp' && (p.slug === 'acetion-sp' || p.brandName === 'ACETION-SP'))
  ) || products[0];

  if (!product) {
    return (
      <div className="py-20 text-center max-w-7xl mx-auto px-4">
        <p className="text-slate-600">Product formulation not found.</p>
        <button
          onClick={() => navigateTo('products')}
          className="mt-4 px-4 py-2 text-xs font-bold text-white bg-blue-700 rounded-md"
        >
          Return to Catalogue
        </button>
      </div>
    );
  }

  const galleryList = product.galleryImages && product.galleryImages.length > 0
    ? product.galleryImages
    : [product.primaryImage];

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.mobile) return;
    setSubmitting(true);
    const success = await submitEnquiry({
      name: form.name,
      email: form.email,
      mobile: form.mobile,
      city: form.city,
      subject: `Enquiry for ${product.name}`,
      productInterestedIn: product.name,
      message: form.message || `Customer enquired about ${product.name} from product detail page.`
    });
    setSubmitting(false);
    if (success) {
      setSubmitted(true);
      setForm({ name: '', email: '', mobile: '', city: '', message: '' });
    }
  };

  const cleanWhatsappNumber = (settings.whatsappNumber || '+91 70422 3942').replace(/[^0-9]/g, '');
  const productWhatsappUrl = `https://wa.me/${cleanWhatsappNumber}?text=${encodeURIComponent(
    `Hello Relation Healthcare, I would like to enquire about ${product.name} (${product.composition}).`
  )}`;

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Back button */}
      <div>
        <button
          onClick={() => navigateTo('products')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Product Catalogue</span>
        </button>
      </div>

      {/* Main Product Showcase Block */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Visual Artwork & Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-2 sm:p-4 flex items-center justify-center aspect-4/3 overflow-hidden shadow-sm">
            <img
              src={galleryList[activeImageIndex] || product.primaryImage}
              alt={product.name}
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Multiple gallery thumbnails */}
          {galleryList.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {galleryList.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-20 rounded-lg border-2 p-1.5 bg-slate-50 shrink-0 transition-colors ${
                    activeImageIndex === idx ? 'border-blue-600 ring-2 ring-blue-100' : 'border-slate-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} view ${idx + 1}`}
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Packaging & Compliance Notice */}
          <div className="p-4 bg-slate-100/70 border border-slate-200 rounded-lg text-xs space-y-1.5 text-slate-700">
            <div className="font-bold text-slate-900 flex items-center gap-2">
              <Package className="w-4 h-4 text-blue-700" />
              <span>Packaging Specification</span>
            </div>
            <div>
              <span className="font-semibold">Standard Pack: </span>
              {product.packing}
            </div>
            <div>
              <span className="font-semibold">Therapeutic Class: </span>
              {product.category}
            </div>
          </div>
        </div>

        {/* Right Column: Key Details & Composition */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-1">
              {product.category} · {product.dosageForm}
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {product.name}
            </h1>
            {product.headline && (
              <p className="text-base sm:text-lg font-semibold text-blue-900 mt-2">
                "{product.headline}"
              </p>
            )}
          </div>

          {/* Composition Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Active Pharmaceutical Composition
            </div>
            <div className="text-base font-bold text-slate-900 font-sans">
              {product.composition}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed pt-1">
              {product.shortDescription}
            </p>
          </div>

          {/* Action CTAs: Direct Enquiry & WhatsApp */}
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => setEnquiryOpen(true)}
              className="px-6 py-3 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-md transition-colors shadow-xs flex items-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Product Enquiry</span>
            </button>
            <a
              href={productWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-md transition-colors flex items-center gap-2"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
              <span>Inquire via WhatsApp</span>
            </a>
          </div>

          {/* Indications Section */}
          <div className="pt-4 border-t border-slate-200 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Clinical Indications
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {product.indications?.map((indication, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-2 p-2.5 bg-white border border-slate-200 rounded-md font-medium text-slate-800"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                  <span>{indication}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* "Also Available" Section if applicable */}
          {product.alsoAvailable && product.alsoAvailable.length > 0 && (
            <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-200 space-y-2">
              <div className="text-xs font-bold text-purple-900 uppercase tracking-wider">
                Also Available in Portfolio:
              </div>
              {product.alsoAvailable.map((alt, idx) => (
                <div key={idx} className="text-xs text-purple-950 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <span className="font-bold text-sm text-purple-900">{alt.name}</span>
                    <span className="text-purple-700 ml-2">({alt.composition})</span>
                  </div>
                  <button
                    onClick={() => {
                      const foundAlt = products.find(p => p.name.includes(alt.name));
                      if (foundAlt) navigateTo('product-detail', foundAlt.slug);
                    }}
                    className="text-[11px] font-bold text-purple-700 hover:text-purple-900 underline self-start sm:self-auto"
                  >
                    View Variant →
                  </button>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>

      {/* Product Information Breakdown (Aceclofenac, Paracetamol, Serratiopeptidase OR Rabeprazole, Domperidone) */}
      {product.keyInformation && product.keyInformation.length > 0 && (
        <section className="space-y-6 pt-6 border-t border-slate-200">
          <div className="space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-blue-700">
              Pharmacological Profile
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              Active Ingredient Mechanism &amp; Role
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {product.keyInformation.map((info, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3"
              >
                <div className="flex items-center gap-2 text-blue-700 font-bold text-sm">
                  <Pill className="w-4 h-4" />
                  <span>{info.title}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {info.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Detailed Description & Features */}
      {product.detailedDescription && (
        <section className="bg-slate-50 p-6 sm:p-8 rounded-xl border border-slate-200 space-y-4">
          <h3 className="text-lg font-bold text-slate-900">
            Product Information &amp; Clinical Context
          </h3>
          <p className="text-sm text-slate-700 leading-relaxed">
            {product.detailedDescription}
          </p>

          {product.features && product.features.length > 0 && (
            <div className="pt-4 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {product.features.map((feat, i) => (
                <div key={i} className="flex items-center gap-2 text-slate-800 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Official Medical Disclaimer */}
      <div className="p-4 rounded-lg bg-amber-50/80 border border-amber-200 text-xs text-amber-950 flex items-start gap-3">
        <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Medical Disclaimer: </span>
          This product information is provided strictly for professional and reference purposes. Use medicines only as directed by a qualified healthcare professional.
        </div>
      </div>

      {/* Enquiry Modal */}
      {enquiryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95">
            <h3 className="text-xl font-bold text-slate-900 mb-1">
              Enquire for {product.name}
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              Submit your inquiry and our territory representative will follow up with verified clinical samples and pricing slabs.
            </p>

            {submitted ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs space-y-2">
                <div className="font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Thank you. Your enquiry has been received.</span>
                </div>
                <p>Our sales desk will contact you at {form.mobile} promptly.</p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setEnquiryOpen(false);
                  }}
                  className="mt-3 px-4 py-2 text-xs font-bold text-white bg-slate-900 rounded-md"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleEnquirySubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Doctor / Distributor Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Dr. / Mr. Name"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98XXX XXXXX"
                      value={form.mobile}
                      onChange={e => setForm({ ...form, mobile: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="doctor@hospital.org"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      City / Territory
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Mumbai, New Delhi"
                      value={form.city}
                      onChange={e => setForm({ ...form, city: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Enquiry Details / Order Quantity
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Specify requirements or stockist terms..."
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => setEnquiryOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-5 py-2 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-md transition-colors"
                  >
                    {submitting ? 'Submitting...' : 'Send Enquiry'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
