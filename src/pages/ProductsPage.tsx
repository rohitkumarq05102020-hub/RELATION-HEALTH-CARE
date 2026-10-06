import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, ArrowRight, ShieldAlert, Sparkles, Filter } from 'lucide-react';

export const ProductsPage: React.FC = () => {
  const { products, navigateTo } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Pain Management', 'Gastroenterology'];

  const filteredProducts = products.filter(product => {
    if (!product.published) return false;
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.composition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.indications.some(i => i.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-12 py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Page Header */}
      <div className="space-y-4">
        <div className="text-xs font-bold uppercase tracking-widest text-blue-700">
          Pharmaceutical Catalogue
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Product Portfolio &amp; Formulations
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
          Explore our range of precision-crafted therapeutic formulations engineered for verified efficacy, dependable safety profiles, and clinical reliability.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-200 flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Category Segmented Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors ${
                selectedCategory === cat
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat === 'All' ? 'All Products' : cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, formula, or indication..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="p-12 text-center bg-slate-50 rounded-xl border border-slate-200">
          <p className="text-slate-600 font-medium text-sm">No formulations matched your query.</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
            }}
            className="mt-3 text-xs text-blue-700 font-bold hover:underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200 flex flex-col group"
            >
              {/* Image Frame */}
              <div className="aspect-4/3 bg-white relative p-2 flex items-center justify-center border-b border-slate-100">
                <img
                  src={product.primaryImage}
                  alt={product.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  <div className="text-[11px] font-semibold text-blue-700 uppercase tracking-wide">
                    {product.category} · {product.dosageForm}
                  </div>

                  <h2 className="text-xl font-extrabold text-slate-900 group-hover:text-blue-700 transition-colors">
                    {product.name}
                  </h2>

                  <div className="text-xs font-semibold text-slate-700 bg-slate-50 p-2.5 rounded-md border border-slate-100">
                    {product.composition}
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {product.headline || product.shortDescription}
                  </p>

                  {/* Indications list preview */}
                  {product.indications && product.indications.length > 0 && (
                    <div className="pt-1">
                      <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                        Key Indications:
                      </div>
                      <div className="text-xs text-slate-600 flex flex-wrap gap-x-2 gap-y-1">
                        {product.indications.slice(0, 3).map((ind, i) => (
                          <span key={i} className="inline-flex items-center text-slate-700">
                            • {ind}
                          </span>
                        ))}
                        {product.indications.length > 3 && (
                          <span className="text-slate-400">+{product.indications.length - 3} more</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">
                    {product.packing}
                  </span>
                  <button
                    onClick={() => navigateTo('product-detail', product.slug)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-md transition-colors"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Statutory Medical Disclaimer */}
      <div className="p-4 rounded-lg bg-amber-50/70 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
        <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Medical Disclaimer: </span>
          This product information is provided strictly for registered medical practitioners and reference purposes. Use medicines only as directed by a qualified healthcare professional.
        </div>
      </div>

    </div>
  );
};
