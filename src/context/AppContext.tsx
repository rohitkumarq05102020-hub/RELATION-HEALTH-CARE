import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  GalleryItem,
  EmployeeReport,
  Enquiry,
  HomepageContent,
  AboutContent,
  WebsiteSettings,
  User
} from '../types';
import {
  initialProducts,
  initialGallery,
  initialEmployees,
  initialReports,
  initialEnquiries,
  initialHomepageContent,
  initialAboutContent,
  initialSettings
} from '../data/initialData';

interface AppContextType {
  products: Product[];
  gallery: GalleryItem[];
  employees: User[];
  reports: EmployeeReport[];
  enquiries: Enquiry[];
  homepage: HomepageContent;
  about: AboutContent;
  settings: WebsiteSettings;
  currentUser: User | null;
  currentRoute: string;
  selectedProductSlug: string | null;
  loading: boolean;
  toast: { message: string; type: 'success' | 'error' | 'info' } | null;
  navigateTo: (route: string, productSlug?: string) => void;
  setCurrentUser: (user: User | null) => void;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  // Actions
  addProduct: (product: Omit<Product, 'id' | 'order'>) => Promise<void>;
  updateProduct: (id: string, updates: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  addGalleryItem: (item: Omit<GalleryItem, 'id' | 'order'>) => Promise<void>;
  updateGalleryItem: (id: string, updates: Partial<GalleryItem>) => Promise<void>;
  deleteGalleryItem: (id: string) => Promise<void>;
  submitReport: (report: Omit<EmployeeReport, 'id' | 'status' | 'createdAt'>) => Promise<boolean>;
  updateReport: (id: string, updates: Partial<EmployeeReport>) => Promise<void>;
  submitEnquiry: (enquiry: Omit<Enquiry, 'id' | 'status' | 'createdAt'>) => Promise<boolean>;
  updateEnquiryStatus: (id: string, status: Enquiry['status'], notes?: string) => Promise<void>;
  addEmployee: (emp: Omit<User, 'id'>) => Promise<void>;
  updateEmployee: (id: string, updates: Partial<User>) => Promise<void>;
  deleteEmployee: (id: string) => Promise<void>;
  updateHomepage: (content: Partial<HomepageContent>) => Promise<void>;
  updateAbout: (content: Partial<AboutContent>) => Promise<void>;
  updateSettings: (settings: Partial<WebsiteSettings>) => Promise<void>;
  exportReportsCsv: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [gallery, setGallery] = useState<GalleryItem[]>(initialGallery);
  const [employees, setEmployees] = useState<User[]>(initialEmployees);
  const [reports, setReports] = useState<EmployeeReport[]>(initialReports);
  const [enquiries, setEnquiries] = useState<Enquiry[]>(initialEnquiries);
  const [homepage, setHomepage] = useState<HomepageContent>(initialHomepageContent);
  const [about, setAbout] = useState<AboutContent>(initialAboutContent);
  const [settings, setSettings] = useState<WebsiteSettings>(initialSettings);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentRoute, setCurrentRoute] = useState<string>('home');
  const [selectedProductSlug, setSelectedProductSlug] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(prev => (prev?.message === message ? null : prev));
    }, 4000);
  };

  // Synchronize route with browser hash / location
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '') || 'home';
      if (hash.startsWith('products/')) {
        const slug = hash.replace('products/', '');
        setCurrentRoute('product-detail');
        setSelectedProductSlug(slug);
      } else {
        setCurrentRoute(hash);
        if (hash !== 'product-detail') {
          setSelectedProductSlug(null);
        }
      }
      window.scrollTo(0, 0);
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigateTo = (route: string, productSlug?: string) => {
    if (route === 'product-detail' && productSlug) {
      window.location.hash = `products/${productSlug}`;
      setSelectedProductSlug(productSlug);
      setCurrentRoute('product-detail');
    } else {
      window.location.hash = route;
      setCurrentRoute(route);
      setSelectedProductSlug(null);
    }
    window.scrollTo(0, 0);
  };

  // Fetch initial data from server
  useEffect(() => {
    const fetchState = async () => {
      try {
        const res = await fetch('/api/state');
        if (res.ok) {
          const data = await res.json();
          if (data.products?.length) setProducts(data.products);
          if (data.gallery?.length) setGallery(data.gallery);
          if (data.homepage) setHomepage(data.homepage);
          if (data.about) setAbout(data.about);
          if (data.settings) setSettings(data.settings);
        }

        // Also fetch reports, enquiries, and employees
        const [repRes, enqRes, empRes] = await Promise.all([
          fetch('/api/reports'),
          fetch('/api/enquiries'),
          fetch('/api/employees')
        ]);

        if (repRes.ok) {
          const repData = await repRes.json();
          if (Array.isArray(repData)) setReports(repData);
        }
        if (enqRes.ok) {
          const enqData = await enqRes.json();
          if (Array.isArray(enqData)) setEnquiries(enqData);
        }
        if (empRes.ok) {
          const empData = await empRes.json();
          if (Array.isArray(empData)) setEmployees(empData);
        }
      } catch (err) {
        console.warn('Backend fetch failed, utilizing loaded local state', err);
      } finally {
        setLoading(false);
      }
    };

    fetchState();
  }, []);

  // Update document title and description based on settings
  useEffect(() => {
    if (settings.seoTitle) {
      document.title = settings.seoTitle;
    }
  }, [settings.seoTitle]);

  // Product Actions
  const addProduct = async (prodData: Omit<Product, 'id' | 'order'>) => {
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(prodData)
      });
      if (res.ok) {
        const saved = await res.json();
        setProducts(prev => [...prev, saved]);
        showToast(`Product "${saved.name}" added successfully.`);
      }
    } catch {
      const newProd: Product = {
        ...prodData,
        id: 'prod-' + Date.now(),
        order: products.length + 1
      };
      setProducts(prev => [...prev, newProd]);
      showToast(`Product added successfully.`);
    }
  };

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      if (res.ok) {
        const updated = await res.json();
        setProducts(prev => prev.map(p => (p.id === id || p.slug === id ? updated : p)));
        showToast('Product updated successfully.');
      }
    } catch {
      setProducts(prev => prev.map(p => (p.id === id || p.slug === id ? { ...p, ...updates } : p)));
      showToast('Product updated.');
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
    } catch {
      // ignore
    }
    setProducts(prev => prev.filter(p => p.id !== id && p.slug !== id));
    showToast('Product removed.');
  };

  // Gallery Actions
  const addGalleryItem = async (item: Omit<GalleryItem, 'id' | 'order'>) => {
    try {
      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
      if (res.ok) {
        const saved = await res.json();
        setGallery(prev => [...prev, saved]);
        showToast('Image added to gallery.');
      }
    } catch {
      const newItem: GalleryItem = {
        ...item,
        id: 'gal-' + Date.now(),
        order: gallery.length + 1
      };
      setGallery(prev => [...prev, newItem]);
      showToast('Image added to gallery.');
    }
  };

  const updateGalleryItem = async (id: string, updates: Partial<GalleryItem>) => {
    try {
      const res = await fetch(`/api/gallery/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      if (res.ok) {
        const updated = await res.json();
        setGallery(prev => prev.map(g => (g.id === id ? updated : g)));
        showToast('Gallery item updated.');
      }
    } catch {
      setGallery(prev => prev.map(g => (g.id === id ? { ...g, ...updates } : g)));
    }
  };

  const deleteGalleryItem = async (id: string) => {
    try {
      await fetch(`/api/gallery/${id}`, { method: 'DELETE' });
    } catch {
      // ignore
    }
    setGallery(prev => prev.filter(g => g.id !== id));
    showToast('Gallery item deleted.');
  };

  // Employee Reports
  const submitReport = async (repData: Omit<EmployeeReport, 'id' | 'status' | 'createdAt'>): Promise<boolean> => {
    try {
      const res = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(repData)
      });
      if (res.ok) {
        const saved = await res.json();
        setReports(prev => [saved, ...prev]);
        showToast('Report submitted successfully.');
        return true;
      }
    } catch {
      const newRep: EmployeeReport = {
        ...repData,
        id: 'rep-' + Date.now(),
        status: 'submitted',
        createdAt: new Date().toISOString()
      };
      setReports(prev => [newRep, ...prev]);
      showToast('Report submitted successfully.');
      return true;
    }
    return false;
  };

  const updateReport = async (id: string, updates: Partial<EmployeeReport>) => {
    try {
      const res = await fetch(`/api/reports/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      if (res.ok) {
        const updated = await res.json();
        setReports(prev => prev.map(r => (r.id === id ? updated : r)));
        showToast('Report status updated.');
      }
    } catch {
      setReports(prev => prev.map(r => (r.id === id ? { ...r, ...updates } : r)));
    }
  };

  // Enquiries
  const submitEnquiry = async (enqData: Omit<Enquiry, 'id' | 'status' | 'createdAt'>): Promise<boolean> => {
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(enqData)
      });
      if (res.ok) {
        const data = await res.json();
        setEnquiries(prev => [data.enquiry, ...prev]);
        showToast('Thank you. Your enquiry has been received.');
        return true;
      }
    } catch {
      const newEnq: Enquiry = {
        ...enqData,
        id: 'enq-' + Date.now(),
        status: 'new',
        createdAt: new Date().toISOString()
      };
      setEnquiries(prev => [newEnq, ...prev]);
      showToast('Thank you. Your enquiry has been received.');
      return true;
    }
    return false;
  };

  const updateEnquiryStatus = async (id: string, status: Enquiry['status'], notes?: string) => {
    try {
      const res = await fetch(`/api/enquiries/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, notes })
      });
      if (res.ok) {
        const updated = await res.json();
        setEnquiries(prev => prev.map(e => (e.id === id ? updated : e)));
        showToast(`Enquiry marked as ${status}.`);
      }
    } catch {
      setEnquiries(prev => prev.map(e => (e.id === id ? { ...e, status, notes: notes || e.notes } : e)));
    }
  };

  // Employee Management
  const addEmployee = async (empData: Omit<User, 'id'>) => {
    try {
      const res = await fetch('/api/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(empData)
      });
      if (res.ok) {
        const saved = await res.json();
        setEmployees(prev => [...prev, saved]);
        showToast(`Employee ${saved.name} added.`);
      }
    } catch {
      const newEmp: User = { ...empData, id: 'emp-' + Date.now() };
      setEmployees(prev => [...prev, newEmp]);
      showToast('Employee added.');
    }
  };

  const updateEmployee = async (id: string, updates: Partial<User>) => {
    try {
      const res = await fetch(`/api/employees/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      if (res.ok) {
        const updated = await res.json();
        setEmployees(prev => prev.map(e => (e.id === id ? updated : e)));
        showToast('Employee updated.');
      }
    } catch {
      setEmployees(prev => prev.map(e => (e.id === id ? { ...e, ...updates } : e)));
    }
  };

  const deleteEmployee = async (id: string) => {
    try {
      await fetch(`/api/employees/${id}`, { method: 'DELETE' });
    } catch {
      // ignore
    }
    setEmployees(prev => prev.filter(e => e.id !== id));
    showToast('Employee removed.');
  };

  // Content Updates
  const updateHomepage = async (content: Partial<HomepageContent>) => {
    const updated = { ...homepage, ...content };
    setHomepage(updated);
    try {
      await fetch('/api/homepage', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content)
      });
      showToast('Homepage content saved.');
    } catch {
      showToast('Homepage updated locally.');
    }
  };

  const updateAbout = async (content: Partial<AboutContent>) => {
    const updated = { ...about, ...content };
    setAbout(updated);
    try {
      await fetch('/api/about', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content)
      });
      showToast('About Us content saved.');
    } catch {
      showToast('About Us updated locally.');
    }
  };

  const updateSettings = async (newSettings: Partial<WebsiteSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    try {
      await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSettings)
      });
      showToast('Settings saved.');
    } catch {
      showToast('Settings updated.');
    }
  };

  const exportReportsCsv = () => {
    window.open('/api/reports/export/csv', '_blank');
  };

  return (
    <AppContext.Provider
      value={{
        products,
        gallery,
        employees,
        reports,
        enquiries,
        homepage,
        about,
        settings,
        currentUser,
        currentRoute,
        selectedProductSlug,
        loading,
        toast,
        navigateTo,
        setCurrentUser,
        showToast,
        addProduct,
        updateProduct,
        deleteProduct,
        addGalleryItem,
        updateGalleryItem,
        deleteGalleryItem,
        submitReport,
        updateReport,
        submitEnquiry,
        updateEnquiryStatus,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        updateHomepage,
        updateAbout,
        updateSettings,
        exportReportsCsv
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
