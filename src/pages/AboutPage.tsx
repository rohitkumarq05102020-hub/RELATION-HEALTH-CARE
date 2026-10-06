import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Target, Eye, Sparkles, Building2, Stethoscope, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { about, navigateTo } = useApp();

  return (
    <div className="space-y-20 py-12">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <div className="text-xs font-bold uppercase tracking-widest text-blue-700">
            Corporate Profile
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            {about.title || 'About Relation Healthcare'}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {about.whoWeAre}
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-slate-50 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <div className="bg-white p-8 sm:p-10 rounded-xl border border-slate-200 shadow-xs space-y-4">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                <Target className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">
                Our Mission
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {about.mission}
              </p>
            </div>

            <div className="bg-white p-8 sm:p-10 rounded-xl border border-slate-200 shadow-xs space-y-4">
              <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center">
                <Eye className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">
                Our Vision
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {about.vision}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-bold uppercase tracking-widest text-blue-700">
            Principles We Uphold
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900">
            Our Core Values
          </h2>
          <p className="text-sm text-slate-600">
            The foundation of every formulation, doctor relationship, and company policy.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {about.values?.map((val, idx) => (
            <div key={idx} className="p-6 rounded-xl bg-white border border-slate-200 space-y-3">
              <div className="text-xs font-bold text-blue-700 font-mono">0{idx + 1}.</div>
              <h3 className="text-base font-bold text-slate-900">{val.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{val.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quality Commitment & Professional Approach */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <div className="p-8 sm:p-10 rounded-xl bg-blue-900 text-white space-y-4">
            <div className="w-10 h-10 rounded-lg bg-blue-800 text-blue-300 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-bold text-white">
              Quality Commitment
            </h3>
            <p className="text-sm text-blue-100 leading-relaxed">
              {about.qualityCommitment}
            </p>
          </div>

          <div className="p-8 sm:p-10 rounded-xl bg-slate-900 text-white space-y-4">
            <div className="w-10 h-10 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center">
              <Stethoscope className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-bold text-white">
              Professional Healthcare Approach
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {about.professionalApproach}
            </p>
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-xl bg-slate-100 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-xl font-bold text-slate-900">
              Explore Our Healthcare Portfolio
            </h4>
            <p className="text-sm text-slate-600">
              Review compositions, packaging formats, and therapeutic indications.
            </p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => navigateTo('products')}
              className="px-5 py-2.5 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-md transition-colors flex items-center gap-1.5"
            >
              <span>View Products</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigateTo('contact')}
              className="px-5 py-2.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-md transition-colors"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
