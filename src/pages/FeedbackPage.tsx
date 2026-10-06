import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MessageSquare, Send, CheckCircle2, Upload, HelpCircle, ShieldCheck } from 'lucide-react';

export const FeedbackPage: React.FC = () => {
  const { products, submitEnquiry, settings } = useApp();
  const [form, setForm] = useState({
    name: '',
    mobile: '',
    email: '',
    subject: '',
    message: '',
    productInterestedIn: 'ACETION-SP™',
    city: '',
    attachmentUrl: '',
    attachmentName: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 8 * 1024 * 1024) {
        alert('File size must be under 8MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setForm(prev => ({
          ...prev,
          attachmentUrl: reader.result as string,
          attachmentName: file.name
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.mobile) return;
    setSubmitting(true);
    const success = await submitEnquiry({
      name: form.name,
      mobile: form.mobile,
      email: form.email,
      subject: form.subject || 'Website Feedback / Question',
      message: form.message,
      productInterestedIn: form.productInterestedIn,
      city: form.city,
      attachmentUrl: form.attachmentUrl
    });
    setSubmitting(false);
    if (success) {
      setSubmitted(true);
      setForm({
        name: '',
        mobile: '',
        email: '',
        subject: '',
        message: '',
        productInterestedIn: 'ACETION-SP™',
        city: '',
        attachmentUrl: '',
        attachmentName: ''
      });
    }
  };

  return (
    <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-blue-700">
          <HelpCircle className="w-4 h-4" />
          <span>Physician &amp; Customer Dialogue</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Ask Us / Clinical Feedback
        </h1>
        <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
          Have a question about drug interactions, pharmacokinetics, distribution availability, or clinical feedback on our formulations? We value your input.
        </p>
      </div>

      {/* Main Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm space-y-6">
        {submitted ? (
          <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-3 text-emerald-950">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">
              Thank you. Your enquiry has been received.
            </h3>
            <p className="text-xs text-emerald-800 max-w-md mx-auto leading-relaxed">
              Your feedback is dispatched directly to our medical affairs and customer care team at <span className="font-mono font-semibold">relationhealthcare@gmail.com</span>. We will follow up shortly.
            </p>
            <div className="pt-3">
              <button
                onClick={() => setSubmitted(false)}
                className="px-5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-md transition-colors"
              >
                Send Another Feedback / Question
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your Name / Dr. Name"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
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
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="name@email.com"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  placeholder="e.g. New Delhi, Mumbai, Ahmedabad"
                  value={form.city}
                  onChange={e => setForm({ ...form, city: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
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
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
                >
                  {products.map(p => (
                    <option key={p.id} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                  <option value="Multiple Products">Multiple Products</option>
                  <option value="General Corporate">General Corporate</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="e.g. Clinical feedback on ACTION-SP"
                  value={form.subject}
                  onChange={e => setForm({ ...form, subject: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Message *
              </label>
              <textarea
                rows={4}
                required
                placeholder="Share your experience, query, prescription suggestions, or product feedback..."
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Optional Attachment (Document / Image)
              </label>
              <input
                type="file"
                accept="image/*,.pdf,.doc,.docx"
                onChange={handleFileChange}
                className="w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200"
              />
              {form.attachmentName && (
                <div className="text-[11px] text-emerald-700 font-medium mt-1">
                  Attached file: {form.attachmentName}
                </div>
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 px-4 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-md transition-colors shadow-xs flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{submitting ? 'Submitting Enquiry...' : 'Send Enquiry'}</span>
              </button>
            </div>
          </form>
        )}
      </div>

      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-blue-700" />
          <span>Direct notification forwarded to relationhealthcare@gmail.com</span>
        </div>
        <div className="font-mono text-slate-400">
          WhatsApp: {settings.whatsappNumber || '+91 70422 3942'}
        </div>
      </div>

    </div>
  );
};
