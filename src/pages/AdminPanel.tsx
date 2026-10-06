import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Product, GalleryItem, User, EmployeeReport, Enquiry } from '../types';
import {
  LayoutDashboard,
  Package,
  Home as HomeIcon,
  Info,
  Image as ImageIcon,
  Users,
  FileSpreadsheet,
  MessageSquare,
  Settings as SettingsIcon,
  Plus,
  Trash2,
  Edit,
  CheckCircle,
  Clock,
  Download,
  Upload,
  Eye,
  LogOut,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  Search,
  Filter
} from 'lucide-react';
import { generatePackagingSvg } from '../utils/productVisuals';
import { LogoIcon } from '../components/Logo';

export const AdminPanel: React.FC = () => {
  const {
    products,
    gallery,
    employees,
    reports,
    enquiries,
    homepage,
    about,
    settings,
    currentUser,
    setCurrentUser,
    addProduct,
    updateProduct,
    deleteProduct,
    addGalleryItem,
    updateGalleryItem,
    deleteGalleryItem,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    updateReport,
    updateEnquiryStatus,
    updateHomepage,
    updateAbout,
    updateSettings,
    exportReportsCsv,
    showToast,
    navigateTo
  } = useApp();

  // Admin section routing
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'products' | 'homepage' | 'about' | 'gallery' | 'employees' | 'reports' | 'enquiries' | 'settings'
  >('dashboard');

  // Login form state
  const [adminEmail, setAdminEmail] = useState('relationhealthcare@gmail.com');
  const [adminPassword, setAdminPassword] = useState('relation2026!');
  const [authError, setAuthError] = useState('');
  const [authenticating, setAuthenticating] = useState(false);

  // Search and filter states
  const [reportFilterEmployee, setReportFilterEmployee] = useState('all');
  const [reportFilterStatus, setReportFilterStatus] = useState('all');
  const [productSearch, setProductSearch] = useState('');

  // Modals
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isNewProduct, setIsNewProduct] = useState(false);
  const [editingGallery, setEditingGallery] = useState<GalleryItem | null>(null);
  const [isNewGallery, setIsNewGallery] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<User | null>(null);
  const [isNewEmployee, setIsNewEmployee] = useState(false);

  // Form states for CMS edits
  const [homepageForm, setHomepageForm] = useState(homepage);
  const [aboutForm, setAboutForm] = useState(about);
  const [settingsForm, setSettingsForm] = useState(settings);

  // Keep CMS forms in sync if global context changes
  React.useEffect(() => {
    setHomepageForm(homepage);
  }, [homepage]);
  React.useEffect(() => {
    setAboutForm(about);
  }, [about]);
  React.useEffect(() => {
    setSettingsForm(settings);
  }, [settings]);

  // Handle Admin Login
  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthenticating(true);
    setAuthError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: adminEmail, password: adminPassword })
      });
      const data = await res.json();
      if (res.ok && data.user) {
        setCurrentUser(data.user);
        showToast('Administrator authenticated successfully.');
      } else {
        setAuthError(data.error || 'Invalid credentials');
      }
    } catch {
      // Local fallback
      if (adminPassword === 'relation2026!' || adminPassword === 'admin') {
        const admin: User = {
          id: 'user-admin',
          name: 'Relation Healthcare Admin',
          email: adminEmail,
          role: 'admin',
          employeeId: 'ADM-001',
          designation: 'Managing Director & Administrator',
          status: 'active',
          joinedDate: '2025-01-01'
        };
        setCurrentUser(admin);
        showToast('Signed in as Administrator');
      } else {
        setAuthError('Authentication failed');
      }
    } finally {
      setAuthenticating(false);
    }
  };

  // If not logged in as admin, show secure login form
  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="py-20 max-w-md mx-auto px-4">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-slate-950 text-white p-6 sm:p-8 text-center space-y-3">
            <div className="flex justify-center">
              <LogoIcon size={58} withReflection={false} />
            </div>
            <h1 className="text-xl font-bold tracking-tight">Relation Healthcare CMS</h1>
            <p className="text-xs text-slate-400">
              Administrative Control Panel for Products, Employees &amp; Content
            </p>
          </div>

          <div className="p-6 sm:p-8 space-y-5">
            {authError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Administrator Email
                </label>
                <input
                  type="email"
                  required
                  value={adminEmail}
                  onChange={e => setAdminEmail(e.target.value)}
                  placeholder="relationhealthcare@gmail.com"
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Master Password
                </label>
                <input
                  type="password"
                  required
                  value={adminPassword}
                  onChange={e => setAdminPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={authenticating}
                className="w-full py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-md transition-colors"
              >
                {authenticating ? 'Authenticating...' : 'Sign In as Administrator'}
              </button>
            </form>

            <div className="p-3 rounded-lg bg-blue-50/70 border border-blue-200 text-[11px] text-blue-900">
              <span className="font-bold">Master Credentials: </span>
              relationhealthcare@gmail.com / relation2026!
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard Stats Metrics
  const todayStr = new Date().toISOString().split('T')[0];
  const todayReportsCount = reports.filter(r => r.reportDate === todayStr).length;
  const pendingReportsCount = reports.filter(r => r.status === 'submitted').length;
  const newEnquiriesCount = enquiries.filter(e => e.status === 'new').length;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      
      {/* Admin Top Navigation */}
      <header className="bg-slate-900 text-white px-4 sm:px-8 py-3 flex items-center justify-between border-b border-slate-800 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <LogoIcon size={36} withReflection={false} />
          <div>
            <div className="text-sm font-bold text-white flex items-center gap-2">
              <span>{settings.companyName || 'RELATION HEALTHCARE'}</span>
              <span className="text-[10px] bg-blue-900/80 border border-blue-700 text-blue-300 font-mono px-1.5 py-0.5 rounded">
                Admin Console
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <button
            onClick={() => navigateTo('home')}
            className="text-slate-300 hover:text-white flex items-center gap-1 font-semibold"
          >
            <span>View Live Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
          <div className="h-4 w-px bg-slate-700" />
          <button
            onClick={() => setCurrentUser(null)}
            className="text-red-400 hover:text-red-300 flex items-center gap-1 font-semibold"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Admin Workspace with Sidebar Navigation */}
      <div className="flex-1 flex flex-col md:flex-row">
        
        {/* Admin Sidebar Navigation */}
        <aside className="w-full md:w-64 bg-white border-r border-slate-200 p-4 space-y-1">
          {[
            { id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard },
            { id: 'products', label: 'Products & Artworks', icon: Package, badge: products.length },
            { id: 'reports', label: 'Employee Reports', icon: FileSpreadsheet, badge: pendingReportsCount },
            { id: 'enquiries', label: 'Enquiries / Feedback', icon: MessageSquare, badge: newEnquiriesCount },
            { id: 'gallery', label: 'Gallery Management', icon: ImageIcon, badge: gallery.length },
            { id: 'employees', label: 'Staff & Medical Reps', icon: Users, badge: employees.length },
            { id: 'homepage', label: 'Home Page CMS', icon: HomeIcon },
            { id: 'about', label: 'About Us CMS', icon: Info },
            { id: 'settings', label: 'Website Settings', icon: SettingsIcon },
          ].map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 font-bold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-700' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                      isActive ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </aside>

        {/* Content Workspace */}
        <main className="flex-1 p-6 sm:p-8 max-w-6xl space-y-8 overflow-y-auto">
          
          {/* TAB 1: DASHBOARD OVERVIEW */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  Administrative Dashboard
                </h1>
                <p className="text-xs text-slate-500">
                  Real-time operational summary of Relation Healthcare database and field activity.
                </p>
              </div>

              {/* 7 Core Required Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-1">
                  <div className="text-xs text-slate-500 font-semibold">Total Products</div>
                  <div className="text-3xl font-black text-slate-900 font-mono">{products.length}</div>
                  <div className="text-[11px] text-blue-700 font-medium">ACTION-SP, GASTION +</div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-1">
                  <div className="text-xs text-slate-500 font-semibold">Gallery Images</div>
                  <div className="text-3xl font-black text-slate-900 font-mono">{gallery.length}</div>
                  <div className="text-[11px] text-purple-700 font-medium">Packaging &amp; Labs</div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-1">
                  <div className="text-xs text-slate-500 font-semibold">Total Employees</div>
                  <div className="text-3xl font-black text-slate-900 font-mono">{employees.length}</div>
                  <div className="text-[11px] text-slate-500 font-medium">MR, Sales, Managers</div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-1">
                  <div className="text-xs text-slate-500 font-semibold">Today's Reports</div>
                  <div className="text-3xl font-black text-blue-700 font-mono">{todayReportsCount}</div>
                  <div className="text-[11px] text-slate-500 font-medium">Filed {todayStr}</div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-1">
                  <div className="text-xs text-slate-500 font-semibold">Pending Review</div>
                  <div className="text-3xl font-black text-amber-600 font-mono">{pendingReportsCount}</div>
                  <div className="text-[11px] text-amber-700 font-medium">Awaiting Manager sign-off</div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-1">
                  <div className="text-xs text-slate-500 font-semibold">Total Feedback</div>
                  <div className="text-3xl font-black text-slate-900 font-mono">{enquiries.length}</div>
                  <div className="text-[11px] text-slate-500 font-medium">Inquiries received</div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-1">
                  <div className="text-xs text-slate-500 font-semibold">New Enquiries</div>
                  <div className="text-3xl font-black text-emerald-600 font-mono">{newEnquiriesCount}</div>
                  <div className="text-[11px] text-emerald-700 font-medium">Action required</div>
                </div>
              </div>

              {/* Quick Jump Panels */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Inquiries */}
                <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <h3 className="text-sm font-bold text-slate-900">Recent Doctor &amp; Buyer Enquiries</h3>
                    <button
                      onClick={() => setActiveTab('enquiries')}
                      className="text-xs text-blue-700 font-bold hover:underline"
                    >
                      View All ({enquiries.length})
                    </button>
                  </div>

                  <div className="space-y-2">
                    {enquiries.slice(0, 3).map(enq => (
                      <div key={enq.id} className="p-3 bg-slate-50 rounded-lg text-xs space-y-1">
                        <div className="flex items-center justify-between font-bold text-slate-800">
                          <span>{enq.name} ({enq.city || 'India'})</span>
                          <span className="font-mono text-[10px] text-slate-400">
                            {enq.createdAt.split('T')[0]}
                          </span>
                        </div>
                        <div className="text-slate-600 font-medium truncate">
                          Product: {enq.productInterestedIn} · {enq.subject}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Field Reports */}
                <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <h3 className="text-sm font-bold text-slate-900">Latest Field Activity Reports</h3>
                    <button
                      onClick={() => setActiveTab('reports')}
                      className="text-xs text-blue-700 font-bold hover:underline"
                    >
                      View All ({reports.length})
                    </button>
                  </div>

                  <div className="space-y-2">
                    {reports.slice(0, 3).map(rep => (
                      <div key={rep.id} className="p-3 bg-slate-50 rounded-lg text-xs space-y-1">
                        <div className="flex items-center justify-between font-bold text-slate-800">
                          <span>{rep.employeeName} ({rep.designation})</span>
                          <span className="font-mono text-[10px] text-slate-400">{rep.reportDate}</span>
                        </div>
                        <div className="text-slate-600">
                          Visited: <strong className="text-slate-800">{rep.doctorCustomerName}</strong> ({rep.location})
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PRODUCTS MANAGEMENT */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">
                    Product Catalogue &amp; Packaging Management
                  </h1>
                  <p className="text-xs text-slate-500">
                    Add new formulations, update artwork, manage indications, and control publish status.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setIsNewProduct(true);
                    setEditingProduct({
                      id: '',
                      slug: '',
                      name: '',
                      genericName: '',
                      brandName: '',
                      category: 'Pain Management',
                      composition: '',
                      dosageForm: 'Tablets',
                      packing: '10 x 10 Tablets',
                      headline: '',
                      shortDescription: '',
                      detailedDescription: '',
                      keyInformation: [],
                      indications: ['Pain & Inflammation'],
                      features: [],
                      primaryImage: generatePackagingSvg('NEW-PROD', 'Active Formula', 'tablet', 'blue'),
                      galleryImages: [],
                      published: true,
                      featured: false,
                      order: products.length + 1
                    });
                  }}
                  className="px-4 py-2 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-md transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Product</span>
                </button>
              </div>

              {/* Product List Table */}
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="p-3.5">Artwork</th>
                      <th className="p-3.5">Product Name</th>
                      <th className="p-3.5">Category</th>
                      <th className="p-3.5">Composition</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {products.map(p => (
                      <tr key={p.id} className="hover:bg-slate-50/80">
                        <td className="p-3.5">
                          <img
                            src={p.primaryImage}
                            alt={p.name}
                            className="w-14 h-11 object-contain bg-slate-100 rounded border border-slate-200"
                          />
                        </td>
                        <td className="p-3.5 font-bold text-slate-900">
                          {p.name}
                          {p.featured && (
                            <span className="ml-2 text-[10px] text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                              Featured
                            </span>
                          )}
                        </td>
                        <td className="p-3.5 text-slate-600">{p.category}</td>
                        <td className="p-3.5 text-slate-600 max-w-xs truncate">{p.composition}</td>
                        <td className="p-3.5">
                          <button
                            onClick={() => updateProduct(p.id, { published: !p.published })}
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                              p.published ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-500'
                            }`}
                          >
                            {p.published ? 'Published' : 'Draft'}
                          </button>
                        </td>
                        <td className="p-3.5 text-right space-x-2">
                          <button
                            onClick={() => {
                              setIsNewProduct(false);
                              setEditingProduct({ ...p });
                            }}
                            className="p-1.5 text-blue-700 hover:bg-blue-50 rounded"
                            title="Edit Product"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete ${p.name}?`)) {
                                deleteProduct(p.id);
                              }
                            }}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                            title="Delete Product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Product Editor Modal */}
          {editingProduct && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 overflow-y-auto">
              <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <h3 className="text-lg font-bold text-slate-900">
                    {isNewProduct ? 'Add New Product' : `Edit ${editingProduct.name}`}
                  </h3>
                  <button
                    onClick={() => setEditingProduct(null)}
                    className="text-slate-400 hover:text-slate-700 text-lg font-bold"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Product Brand Name *</label>
                      <input
                        type="text"
                        value={editingProduct.name}
                        onChange={e => setEditingProduct({ ...editingProduct, name: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-') })}
                        placeholder="e.g. ACTION-SP™"
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Therapeutic Category</label>
                      <select
                        value={editingProduct.category}
                        onChange={e => setEditingProduct({ ...editingProduct, category: e.target.value as any })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
                      >
                        <option value="Pain Management">Pain Management</option>
                        <option value="Gastroenterology">Gastroenterology</option>
                        <option value="Anti-Infectives">Anti-Infectives</option>
                        <option value="Nutraceuticals">Nutraceuticals</option>
                        <option value="General">General</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Active Composition *</label>
                    <input
                      type="text"
                      value={editingProduct.composition}
                      onChange={e => setEditingProduct({ ...editingProduct, composition: e.target.value })}
                      placeholder="e.g. Aceclofenac 100 mg + Paracetamol 325 mg + Serratiopeptidase 15 mg"
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Dosage Form</label>
                      <input
                        type="text"
                        value={editingProduct.dosageForm}
                        onChange={e => setEditingProduct({ ...editingProduct, dosageForm: e.target.value as any })}
                        placeholder="Tablets / Capsules"
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Packaging Specification</label>
                      <input
                        type="text"
                        value={editingProduct.packing}
                        onChange={e => setEditingProduct({ ...editingProduct, packing: e.target.value })}
                        placeholder="e.g. 10 x 10 Tablets in Blister Pack"
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Headline from Artwork</label>
                    <input
                      type="text"
                      value={editingProduct.headline}
                      onChange={e => setEditingProduct({ ...editingProduct, headline: e.target.value })}
                      placeholder="e.g. Ensure Relief from Pain and Inflammation with Triple Action"
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>

                  {/* Product Image Upload / Replace */}
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                    <label className="block font-bold text-slate-800">Primary Product Artwork / Image</label>
                    <div className="flex items-center gap-4">
                      <img
                        src={editingProduct.primaryImage}
                        alt="Preview"
                        className="w-20 h-16 object-contain bg-white rounded border border-slate-200"
                      />
                      <div className="flex-1 space-y-1">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={e => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = () => {
                                setEditingProduct(prev => prev ? { ...prev, primaryImage: reader.result as string } : null);
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="w-full text-xs text-slate-500 file:mr-2 file:py-1 file:px-2.5 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        <div className="text-[10px] text-slate-400">Upload clean photo or pharmaceutical box scan</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Short Description</label>
                    <textarea
                      rows={2}
                      value={editingProduct.shortDescription}
                      onChange={e => setEditingProduct({ ...editingProduct, shortDescription: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Indications (comma-separated)</label>
                    <input
                      type="text"
                      value={editingProduct.indications?.join(', ')}
                      onChange={e => setEditingProduct({ ...editingProduct, indications: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                      placeholder="Pain & Inflammation, Back Pain, Sprains"
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center gap-6 pt-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editingProduct.published}
                        onChange={e => setEditingProduct({ ...editingProduct, published: e.target.checked })}
                        className="rounded text-blue-600 focus:ring-blue-500"
                      />
                      <span className="font-semibold text-slate-700">Published Live</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editingProduct.featured}
                        onChange={e => setEditingProduct({ ...editingProduct, featured: e.target.checked })}
                        className="rounded text-blue-600 focus:ring-blue-500"
                      />
                      <span className="font-semibold text-slate-700">Feature on Homepage</span>
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                  <button
                    onClick={() => setEditingProduct(null)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={async () => {
                      if (isNewProduct) {
                        await addProduct(editingProduct);
                      } else {
                        await updateProduct(editingProduct.id, editingProduct);
                      }
                      setEditingProduct(null);
                    }}
                    className="px-5 py-2 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-md"
                  >
                    Save Product
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: EMPLOYEE REPORTS */}
          {activeTab === 'reports' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">
                    Employee Field Reports Archive
                  </h1>
                  <p className="text-xs text-slate-500">
                    Review submitted doctor visits, orders, and follow-ups across all field representatives.
                  </p>
                </div>

                <button
                  onClick={exportReportsCsv}
                  className="px-4 py-2 text-xs font-bold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 rounded-md transition-colors flex items-center gap-2 shadow-xs"
                >
                  <Download className="w-4 h-4 text-blue-700" />
                  <span>Download Excel / CSV</span>
                </button>
              </div>

              {/* Filters */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-wrap gap-4 items-center">
                <div className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <Filter className="w-3.5 h-3.5" />
                  <span>Filter by:</span>
                </div>

                <select
                  value={reportFilterEmployee}
                  onChange={e => setReportFilterEmployee(e.target.value)}
                  className="px-3 py-1.5 text-xs border border-slate-300 rounded-md bg-white"
                >
                  <option value="all">All Employees</option>
                  {employees.map(emp => (
                    <option key={emp.id} value={emp.employeeId || emp.name}>
                      {emp.name} ({emp.employeeId})
                    </option>
                  ))}
                </select>

                <select
                  value={reportFilterStatus}
                  onChange={e => setReportFilterStatus(e.target.value)}
                  className="px-3 py-1.5 text-xs border border-slate-300 rounded-md bg-white"
                >
                  <option value="all">All Statuses</option>
                  <option value="submitted">Submitted (Pending)</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="approved">Approved</option>
                </select>
              </div>

              {/* Reports Table */}
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="p-3.5">Date</th>
                      <th className="p-3.5">Employee</th>
                      <th className="p-3.5">Doctor / Customer</th>
                      <th className="p-3.5">Location</th>
                      <th className="p-3.5">Products</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Review Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {reports
                      .filter(r => {
                        const matchEmp = reportFilterEmployee === 'all' || r.employeeId === reportFilterEmployee || r.employeeName === reportFilterEmployee;
                        const matchStatus = reportFilterStatus === 'all' || r.status === reportFilterStatus;
                        return matchEmp && matchStatus;
                      })
                      .map(rep => (
                        <tr key={rep.id} className="hover:bg-slate-50/80">
                          <td className="p-3.5 font-mono text-slate-600">{rep.reportDate}</td>
                          <td className="p-3.5 font-bold text-slate-900">
                            {rep.employeeName}
                            <div className="text-[10px] text-slate-400 font-normal">{rep.designation}</div>
                          </td>
                          <td className="p-3.5">
                            <div className="font-semibold text-slate-800">{rep.doctorCustomerName}</div>
                            <div className="text-[11px] text-slate-500">{rep.specialty}</div>
                          </td>
                          <td className="p-3.5 text-slate-600">{rep.location}</td>
                          <td className="p-3.5">
                            <div className="flex flex-wrap gap-1 max-w-xs">
                              {rep.productsDiscussed?.map((p, i) => (
                                <span key={i} className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-700">
                                  {p}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="p-3.5">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                                rep.status === 'approved'
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : rep.status === 'reviewed'
                                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                  : 'bg-amber-50 text-amber-700 border border-amber-200'
                              }`}
                            >
                              {rep.status}
                            </span>
                          </td>
                          <td className="p-3.5 text-right space-x-1">
                            {rep.status !== 'approved' && (
                              <button
                                onClick={() => updateReport(rep.id, { status: 'approved' })}
                                className="px-2.5 py-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded"
                              >
                                Approve
                              </button>
                            )}
                            {rep.status === 'submitted' && (
                              <button
                                onClick={() => updateReport(rep.id, { status: 'reviewed' })}
                                className="px-2.5 py-1 text-[11px] font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded"
                              >
                                Mark Reviewed
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: ENQUIRIES / FEEDBACK MANAGEMENT */}
          {activeTab === 'enquiries' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  Doctor &amp; Client Inquiries
                </h1>
                <p className="text-xs text-slate-500">
                  All messages submitted via Contact, Feedback, and Product detail forms.
                </p>
              </div>

              <div className="space-y-4">
                {enquiries.map(enq => (
                  <div
                    key={enq.id}
                    className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-slate-100 gap-2">
                      <div>
                        <div className="text-base font-bold text-slate-900 flex items-center gap-2">
                          <span>{enq.name}</span>
                          {enq.city && <span className="text-xs text-slate-500 font-normal">({enq.city})</span>}
                        </div>
                        <div className="text-xs text-slate-500 font-mono mt-0.5">
                          Phone: <a href={`tel:${enq.mobile}`} className="text-blue-700 font-semibold">{enq.mobile}</a>
                          {enq.email && ` · Email: ${enq.email}`}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs text-slate-400 font-mono">{enq.createdAt.split('T')[0]}</span>
                        <select
                          value={enq.status}
                          onChange={e => updateEnquiryStatus(enq.id, e.target.value as any)}
                          className="text-xs font-semibold px-2.5 py-1 rounded-md border border-slate-300 bg-white"
                        >
                          <option value="new">New</option>
                          <option value="read">Read</option>
                          <option value="in_progress">In Progress</option>
                          <option value="resolved">Resolved</option>
                        </select>
                      </div>
                    </div>

                    <div className="text-xs space-y-1">
                      <div className="font-semibold text-slate-800">
                        Product: <span className="text-blue-700">{enq.productInterestedIn}</span> · Subject: {enq.subject}
                      </div>
                      <p className="text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100 leading-relaxed">
                        {enq.message}
                      </p>
                    </div>

                    {enq.attachmentUrl && (
                      <div className="text-xs text-blue-700">
                        <a href={enq.attachmentUrl} target="_blank" rel="noopener noreferrer" className="underline font-semibold">
                          View Uploaded Document / Image
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: GALLERY MANAGEMENT */}
          {activeTab === 'gallery' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">
                    Gallery &amp; Media Management
                  </h1>
                  <p className="text-xs text-slate-500">
                    Upload facility photos, packaging visuals, event photographs, and scientific seminars.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setIsNewGallery(true);
                    setEditingGallery({
                      id: '',
                      title: '',
                      description: '',
                      category: 'Products',
                      imageUrl: generatePackagingSvg('Relation Item', 'Formulation', 'tablet', 'blue'),
                      date: new Date().toISOString().split('T')[0],
                      published: true,
                      order: gallery.length + 1
                    });
                  }}
                  className="px-4 py-2 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-md transition-colors flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Upload Image</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {gallery.map(item => (
                  <div key={item.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden p-3 space-y-2">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-36 object-contain bg-slate-50 rounded"
                    />
                    <div className="space-y-1">
                      <div className="text-[10px] font-bold text-blue-700 uppercase">{item.category}</div>
                      <h4 className="text-xs font-bold text-slate-900 truncate">{item.title}</h4>
                      <p className="text-[11px] text-slate-500 line-clamp-2">{item.description}</p>
                    </div>
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400 font-mono">{item.date}</span>
                      <button
                        onClick={() => deleteGalleryItem(item.id)}
                        className="text-red-600 hover:text-red-800 text-xs font-semibold"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: EMPLOYEES MANAGEMENT */}
          {activeTab === 'employees' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">
                    Employee &amp; Field Force Directory
                  </h1>
                  <p className="text-xs text-slate-500">
                    Manage medical representatives, sales executives, and area managers.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setIsNewEmployee(true);
                    setEditingEmployee({
                      id: '',
                      name: '',
                      email: '',
                      role: 'medical_rep',
                      employeeId: 'RH-MR-' + Math.floor(100 + Math.random() * 900),
                      designation: 'Medical Representative',
                      territory: 'Delhi NCR',
                      phone: '+91 98XXX XXXXX',
                      status: 'active',
                      joinedDate: new Date().toISOString().split('T')[0]
                    });
                  }}
                  className="px-4 py-2 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-md transition-colors flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Representative</span>
                </button>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="p-3.5">Employee ID</th>
                      <th className="p-3.5">Name</th>
                      <th className="p-3.5">Designation &amp; Role</th>
                      <th className="p-3.5">Territory</th>
                      <th className="p-3.5">Contact Email</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {employees.map(emp => (
                      <tr key={emp.id} className="hover:bg-slate-50/80">
                        <td className="p-3.5 font-mono text-slate-600">{emp.employeeId}</td>
                        <td className="p-3.5 font-bold text-slate-900">{emp.name}</td>
                        <td className="p-3.5">
                          <div>{emp.designation}</div>
                          <span className="text-[10px] text-blue-700 uppercase font-mono">{emp.role}</span>
                        </td>
                        <td className="p-3.5 text-slate-600">{emp.territory || 'Unassigned'}</td>
                        <td className="p-3.5 text-slate-600 font-mono">{emp.email}</td>
                        <td className="p-3.5">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              emp.status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                            }`}
                          >
                            {emp.status}
                          </span>
                        </td>
                        <td className="p-3.5 text-right space-x-2">
                          <button
                            onClick={() => {
                              setIsNewEmployee(false);
                              setEditingEmployee({ ...emp });
                            }}
                            className="text-blue-700 hover:underline font-semibold"
                          >
                            Edit
                          </button>
                          {emp.role !== 'admin' && (
                            <button
                              onClick={() => deleteEmployee(emp.id)}
                              className="text-red-600 hover:underline font-semibold"
                            >
                              Remove
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 7: HOMEPAGE CMS */}
          {activeTab === 'homepage' && (
            <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6">
              <div>
                <h1 className="text-xl font-bold text-slate-900">
                  Homepage Content Management
                </h1>
                <p className="text-xs text-slate-500">
                  Update hero copy, value propositions, and introductions without editing source code.
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Hero Main Headline</label>
                  <input
                    type="text"
                    value={homepageForm.headline}
                    onChange={e => setHomepageForm({ ...homepageForm, headline: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Hero Subheadline</label>
                  <textarea
                    rows={2}
                    value={homepageForm.subheadline}
                    onChange={e => setHomepageForm({ ...homepageForm, subheadline: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Primary CTA Button Text</label>
                    <input
                      type="text"
                      value={homepageForm.ctaPrimaryText}
                      onChange={e => setHomepageForm({ ...homepageForm, ctaPrimaryText: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Secondary CTA Button Text</label>
                    <input
                      type="text"
                      value={homepageForm.ctaSecondaryText}
                      onChange={e => setHomepageForm({ ...homepageForm, ctaSecondaryText: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Company Intro Title</label>
                  <input
                    type="text"
                    value={homepageForm.companyIntroTitle}
                    onChange={e => setHomepageForm({ ...homepageForm, companyIntroTitle: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Company Intro Paragraph</label>
                  <textarea
                    rows={3}
                    value={homepageForm.companyIntroText}
                    onChange={e => setHomepageForm({ ...homepageForm, companyIntroText: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                <div className="pt-3">
                  <button
                    onClick={() => updateHomepage(homepageForm)}
                    className="px-5 py-2.5 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-md shadow-xs"
                  >
                    Save Homepage Settings
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: ABOUT US CMS */}
          {activeTab === 'about' && (
            <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6">
              <div>
                <h1 className="text-xl font-bold text-slate-900">
                  About Us Content Management
                </h1>
                <p className="text-xs text-slate-500">
                  Manage mission, vision, quality standards, and ethical approach statements.
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Who We Are</label>
                  <textarea
                    rows={3}
                    value={aboutForm.whoWeAre}
                    onChange={e => setAboutForm({ ...aboutForm, whoWeAre: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Our Mission</label>
                    <textarea
                      rows={3}
                      value={aboutForm.mission}
                      onChange={e => setAboutForm({ ...aboutForm, mission: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Our Vision</label>
                    <textarea
                      rows={3}
                      value={aboutForm.vision}
                      onChange={e => setAboutForm({ ...aboutForm, vision: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Quality Commitment</label>
                  <textarea
                    rows={3}
                    value={aboutForm.qualityCommitment}
                    onChange={e => setAboutForm({ ...aboutForm, qualityCommitment: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Professional Approach</label>
                  <textarea
                    rows={3}
                    value={aboutForm.professionalApproach}
                    onChange={e => setAboutForm({ ...aboutForm, professionalApproach: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                <div className="pt-3">
                  <button
                    onClick={() => updateAbout(aboutForm)}
                    className="px-5 py-2.5 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-md shadow-xs"
                  >
                    Save About Us Content
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 9: WEBSITE SETTINGS */}
          {activeTab === 'settings' && (
            <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6">
              <div>
                <h1 className="text-xl font-bold text-slate-900">
                  Global Website &amp; Contact Settings
                </h1>
                <p className="text-xs text-slate-500">
                  Update WhatsApp number (edit digits anytime), official corporate email, address, and SEO metadata.
                </p>
              </div>

              <div className="space-y-4 text-xs">
                {/* Official Company Logo Management (Top Side Left Brandmark) */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900 text-sm">Official Corporate Logo</div>
                      <div className="text-[11px] text-slate-500">
                        This logo appears on the top-side left of the navigation bar, mobile header, and footer.
                      </div>
                    </div>
                    {settingsForm.logoUrl && (
                      <button
                        type="button"
                        onClick={() => setSettingsForm({ ...settingsForm, logoUrl: '' })}
                        className="text-[11px] font-semibold text-red-600 hover:text-red-700 underline"
                      >
                        Reset to Official Vector Logo
                      </button>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-4 pt-1">
                    <div className="w-20 h-20 shrink-0 bg-white border border-slate-200 rounded-xl shadow-xs p-2 flex items-center justify-center">
                      {settingsForm.logoUrl ? (
                        <img
                          src={settingsForm.logoUrl}
                          alt="Logo Preview"
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <LogoIcon size={52} idSuffix="admin-settings-preview" />
                      )}
                    </div>
                    <div className="flex-1 space-y-2 w-full">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          Upload Custom Logo Image (PNG, JPG, SVG, WebP)
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={e => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = () => {
                                setSettingsForm({ ...settingsForm, logoUrl: reader.result as string });
                                showToast('Logo loaded! Click Save All Settings below.');
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="w-full text-xs text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-slate-500 text-[11px] mb-0.5">
                          Or enter Logo URL
                        </label>
                        <input
                          type="text"
                          value={settingsForm.logoUrl}
                          onChange={e => setSettingsForm({ ...settingsForm, logoUrl: e.target.value })}
                          placeholder="/rhc-logo.svg or https://..."
                          className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs font-mono"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Company Legal Name</label>
                    <input
                      type="text"
                      value={settingsForm.companyName}
                      onChange={e => setSettingsForm({ ...settingsForm, companyName: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Official Notification Email</label>
                    <input
                      type="email"
                      value={settingsForm.email}
                      onChange={e => setSettingsForm({ ...settingsForm, email: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      WhatsApp Contact Number (Editable if digits need correction) *
                    </label>
                    <input
                      type="text"
                      value={settingsForm.whatsappNumber}
                      onChange={e => setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })}
                      placeholder="+91 70422 3942"
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none font-mono"
                    />
                    <div className="text-[10px] text-slate-400 mt-1">Controls the floating WhatsApp button and all chat links</div>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Default WhatsApp Prefilled Message</label>
                    <input
                      type="text"
                      value={settingsForm.whatsappMessage}
                      onChange={e => setSettingsForm({ ...settingsForm, whatsappMessage: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Corporate Physical Address</label>
                  <input
                    type="text"
                    value={settingsForm.address}
                    onChange={e => setSettingsForm({ ...settingsForm, address: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Google Maps URL</label>
                  <input
                    type="text"
                    value={settingsForm.googleMapsUrl}
                    onChange={e => setSettingsForm({ ...settingsForm, googleMapsUrl: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none font-mono"
                  />
                </div>

                {/* SEO Settings */}
                <div className="pt-4 border-t border-slate-200 space-y-3">
                  <div className="font-bold text-slate-800">SEO &amp; Meta Information</div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Browser Page Title</label>
                    <input
                      type="text"
                      value={settingsForm.seoTitle}
                      onChange={e => setSettingsForm({ ...settingsForm, seoTitle: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Meta Description</label>
                    <textarea
                      rows={2}
                      value={settingsForm.seoDescription}
                      onChange={e => setSettingsForm({ ...settingsForm, seoDescription: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Announcement Banner */}
                <div className="pt-4 border-t border-slate-200 space-y-2">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="announcementActive"
                      checked={settingsForm.announcementActive}
                      onChange={e => setSettingsForm({ ...settingsForm, announcementActive: e.target.checked })}
                      className="rounded text-blue-600"
                    />
                    <label htmlFor="announcementActive" className="font-bold text-slate-800 cursor-pointer">
                      Enable Top Website Announcement Banner
                    </label>
                  </div>
                  <input
                    type="text"
                    value={settingsForm.announcementText}
                    onChange={e => setSettingsForm({ ...settingsForm, announcementText: e.target.value })}
                    placeholder="Announcement message displayed in top header banner..."
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => updateSettings(settingsForm)}
                    className="px-6 py-2.5 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-md shadow-xs"
                  >
                    Save All Settings
                  </button>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

    </div>
  );
};
