import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GalleryItem } from '../types';
import { X, ZoomIn, Calendar, Tag } from 'lucide-react';

export const GalleryPage: React.FC = () => {
  const { gallery } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeLightboxItem, setActiveLightboxItem] = useState<GalleryItem | null>(null);

  const categories = [
    'All',
    'Products',
    'Medical / Healthcare',
    'Company',
    'Events',
    'Training',
    'Team'
  ];

  const filteredItems = gallery.filter(item => {
    if (!item.published) return false;
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Page Header */}
      <div className="space-y-3">
        <div className="text-xs font-bold uppercase tracking-widest text-blue-700">
          Visual Archives
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Relation Healthcare Gallery
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
          Explore product packaging, analytical testing laboratories, scientific conferences, and healthcare outreach initiatives.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-slate-200">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              selectedCategory === cat
                ? 'bg-blue-700 text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            {cat === 'All' ? 'All Images' : cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      {filteredItems.length === 0 ? (
        <div className="p-12 text-center bg-slate-50 rounded-xl border border-slate-200 text-slate-500 text-xs">
          No gallery items available in this category.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <div
              key={item.id}
              onClick={() => setActiveLightboxItem(item)}
              className="group bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col"
            >
              <div className="aspect-4/3 bg-slate-100 relative overflow-hidden flex items-center justify-center p-3">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="p-2 rounded-full bg-white/90 text-slate-900 shadow-md">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                </div>
              </div>

              <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-semibold text-blue-700 tracking-wide uppercase">
                    {item.category}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                    {item.description}
                  </p>
                </div>
                
                {item.date && (
                  <div className="pt-2 text-[11px] text-slate-400 font-mono flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{item.date}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {activeLightboxItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider">
                  {activeLightboxItem.category}
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  {activeLightboxItem.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveLightboxItem(null)}
                className="p-1.5 text-slate-500 hover:text-slate-900 rounded-md hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-950 flex items-center justify-center max-h-[60vh] p-4">
              <img
                src={activeLightboxItem.imageUrl}
                alt={activeLightboxItem.title}
                className="max-h-[55vh] max-w-full object-contain"
              />
            </div>

            <div className="p-5 bg-white space-y-2">
              <p className="text-xs sm:text-sm text-slate-700">
                {activeLightboxItem.description}
              </p>
              {activeLightboxItem.date && (
                <div className="text-xs text-slate-400 font-mono">
                  Recorded Date: {activeLightboxItem.date}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
