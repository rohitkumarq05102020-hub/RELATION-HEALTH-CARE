import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle2, Clock } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { settings, products, submitEnquiry } = useApp();
  const [form, setForm] = useState({
    name: '',
    email: '',
    mobile: '',
    city: '',
    subject: '',
    productInterestedIn: 'General Enquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const cleanWhatsappNumber = (settings.whatsappNumber || '+91 70422 3942').replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanWhatsappNumber}?text=${encodeURIComponent(
    settings.whatsappMessage || 'Hello Relation Healthcare, I would like to get in touch.'
  )}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.mobile) return;
    setSubmitting(true);
    const success = await submitEnquiry({
      name: form.name,
      email: form.email,
      mobile: form.mobile,
      city: form.city,
      subject: form.subject || 'Website General Contact',
      productInterestedIn: form.productInterestedIn,
      message: form.message
    });
    setSubmitting(false);
    if (success) {
      setSubmitted(true);
      setForm({
        name: '',
        email: '',
        mobile: '',
        city: '',
        subject: '',
        productInterestedIn: 'General Enquiry',
        message: ''
      });
    }
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="text-xs font-bold uppercase tracking-widest text-blue-700">
          Official Communication
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Contact Relation Healthcare
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Reach our corporate office, medical inquiries division, and distribution network across India.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Col: Contact Information & Direct Action Buttons */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-lg space-y-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-1">
                Corporate Headquarters
              </div>
              <h3 className="text-xl font-bold text-white">
                {settings.companyName || 'RELATION HEALTHCARE'}
              </h3>
            </div>

            <div className="space-y-4 text-xs text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Registered Address</div>
                  <div className="leading-relaxed mt-0.5">{settings.address}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Official Email</div>
                  <a
                    href={`mailto:${settings.email || 'relationhealthcare@gmail.com'}`}
                    className="hover:text-blue-300 underline font-mono mt-0.5 block"
                  >
                    {settings.email || 'relationhealthcare@gmail.com'}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Direct Phone / WhatsApp</div>
                  <div className="font-mono mt-0.5">{settings.whatsappNumber || '+91 70422 3942'}</div>
                  <div className="text-[11px] text-slate-400">Available Mon - Sat: 9:00 AM - 6:30 PM IST</div>
                </div>
              </div>
            </div>

            {/* Direct Channel Buttons */}
            <div className="pt-2 flex flex-col gap-2.5">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 text-xs font-bold text-emerald-950 bg-emerald-400 hover:bg-emerald-300 rounded-md transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-emerald-900" />
                <span>Chat Directly on WhatsApp</span>
              </a>

              <a
                href={`mailto:${settings.email || 'relationhealthcare@gmail.com'}?subject=Official%20Enquiry%20-%20Relation%20Healthcare`}
                className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-md transition-colors flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4 text-blue-400" />
                <span>Email relationhealthcare@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Interactive Google Map Preview / Link */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3">
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-700" />
              <span>Location Map</span>
            </div>
            <p className="text-xs text-slate-600">
              New Delhi &amp; NCR Logistics Center. For physical product sample inspections or wholesale distributor visits.
            </p>
            <a
              href={settings.googleMapsUrl || 'https://maps.google.com/?q=New+Delhi,+India'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-900 underline"
            >
              Open in Google Maps →
            </a>
          </div>
        </div>

        {/* Right Col: Contact Form */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
          <h2 className="text-xl font-bold text-slate-900 mb-1">
            Send Official Message
          </h2>
          <p className="text-xs text-slate-500 mb-6">
            For institutional orders, doctor samples, hospital procurement, or stockist inquiries.
          </p>

          {submitted ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-xs space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-emerald-800">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Thank you. Your enquiry has been received.</span>
              </div>
              <p className="leading-relaxed">
                We have recorded your communication and our territory manager has been notified at <strong className="font-mono">relationhealthcare@gmail.com</strong>.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-2 px-4 py-2 text-xs font-bold text-white bg-slate-900 rounded-md"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Full Name / Dr. Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Rajesh Sharma"
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    placeholder="e.g. New Delhi, Jaipur, Pune"
                    value={form.city}
                    onChange={e => setForm({ ...form, city: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Product Interested In
                  </label>
                  <select
                    value={form.productInterestedIn}
                    onChange={e => setForm({ ...form, productInterestedIn: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
                  >
                    <option value="General Enquiry">General Corporate Enquiry</option>
                    {products.map(p => (
                      <option key={p.id} value={p.name}>
                        {p.name} ({p.category})
                      </option>
                    ))}
                    <option value="Distributorship / Stockist">Distributorship / Stockist</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Subject Line
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Bulk clinic supply terms"
                    value={form.subject}
                    onChange={e => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Message / Clinical Inquiry Details *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Provide your specific questions, volume requirement, or hospital authorization..."
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 px-4 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-md transition-colors shadow-xs flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{submitting ? 'Transmitting Enquiry...' : 'Send Enquiry'}</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
