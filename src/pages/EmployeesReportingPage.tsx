import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { EmployeeReport, User } from '../types';
import {
  FileText,
  Calendar,
  MapPin,
  Stethoscope,
  PlusCircle,
  Download,
  CheckCircle2,
  Clock,
  UserCheck,
  Building2,
  Upload,
  AlertCircle,
  FileSpreadsheet,
  Lock
} from 'lucide-react';

export const EmployeesReportingPage: React.FC = () => {
  const {
    currentUser,
    setCurrentUser,
    employees,
    reports,
    products,
    submitReport,
    exportReportsCsv,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // Login form state (if not logged in)
  const [loginEmail, setLoginEmail] = useState('rahul.sharma@relationhealthcare.com');
  const [loginPassword, setLoginPassword] = useState('rep123');
  const [loginError, setLoginError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  // New report form state
  const [form, setForm] = useState({
    reportDate: new Date().toISOString().split('T')[0],
    location: '',
    doctorCustomerName: '',
    specialty: 'Orthopedic Surgeon',
    hospitalClinic: '',
    numberOfVisits: 1,
    productsDiscussed: ['ACTION-SP™'],
    orderEnquiryDetails: '',
    orderValueEstimated: 0,
    followUpDate: '',
    remarks: '',
    attachmentUrl: '',
    attachmentName: ''
  });

  const [submittingReport, setSubmittingReport] = useState(false);

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword })
      });
      const data = await res.json();
      if (res.ok && data.user) {
        setCurrentUser(data.user);
        showToast(`Welcome back, ${data.user.name}`);
      } else {
        setLoginError(data.error || 'Invalid credentials');
      }
    } catch {
      // Fallback local match
      const matched = employees.find(
        emp => emp.email.toLowerCase() === loginEmail.toLowerCase().trim()
      );
      if (matched) {
        setCurrentUser(matched);
        showToast(`Signed in as ${matched.name}`);
      } else {
        setLoginError('Could not verify credentials.');
      }
    } finally {
      setLoggingIn(false);
    }
  };

  // Switch demo account conveniently
  const handleQuickDemoLogin = (emp: User) => {
    setCurrentUser(emp);
    showToast(`Active representative switched to: ${emp.name}`);
  };

  // Toggle products discussed
  const toggleProduct = (prodName: string) => {
    if (form.productsDiscussed.includes(prodName)) {
      setForm({
        ...form,
        productsDiscussed: form.productsDiscussed.filter(p => p !== prodName)
      });
    } else {
      setForm({
        ...form,
        productsDiscussed: [...form.productsDiscussed, prodName]
      });
    }
  };

  // Handle file attachment upload (base64)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 8 * 1024 * 1024) {
        showToast('File size must be under 8MB', 'error');
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

  // Handle report submission
  const handleSubmitReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    if (!form.location || !form.doctorCustomerName) {
      showToast('Please specify location and doctor/customer name.', 'error');
      return;
    }

    setSubmittingReport(true);
    const success = await submitReport({
      employeeId: currentUser.employeeId || currentUser.id,
      employeeName: currentUser.name,
      designation: currentUser.designation || 'Medical Representative',
      reportType: activeTab,
      reportDate: form.reportDate,
      location: form.location,
      doctorCustomerName: form.doctorCustomerName,
      specialty: form.specialty,
      hospitalClinic: form.hospitalClinic,
      numberOfVisits: Number(form.numberOfVisits) || 1,
      productsDiscussed: form.productsDiscussed,
      orderEnquiryDetails: form.orderEnquiryDetails,
      orderValueEstimated: Number(form.orderValueEstimated) || 0,
      followUpDate: form.followUpDate,
      remarks: form.remarks,
      attachmentUrl: form.attachmentUrl,
      attachmentName: form.attachmentName
    });

    setSubmittingReport(false);
    if (success) {
      setShowSubmitModal(false);
      setForm({
        reportDate: new Date().toISOString().split('T')[0],
        location: '',
        doctorCustomerName: '',
        specialty: 'Orthopedic Surgeon',
        hospitalClinic: '',
        numberOfVisits: 1,
        productsDiscussed: ['ACTION-SP™'],
        orderEnquiryDetails: '',
        orderValueEstimated: 0,
        followUpDate: '',
        remarks: '',
        attachmentUrl: '',
        attachmentName: ''
      });
    }
  };

  // If not logged in, show secure login portal (prevent public exposure)
  if (!currentUser) {
    return (
      <div className="py-16 max-w-xl mx-auto px-4 sm:px-6">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-slate-900 text-white p-6 sm:p-8 text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-blue-600/30 border border-blue-500/40 text-blue-400 flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
              Employee Field Reporting Portal
            </h1>
            <p className="text-xs text-slate-400">
              Confidential system for Relation Healthcare medical representatives, sales executives, and managers.
            </p>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {loginError && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Employee Email / Corporate ID
                </label>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={e => setLoginEmail(e.target.value)}
                  placeholder="name@relationhealthcare.com"
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Secure Password
                </label>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={e => setLoginPassword(e.target.value)}
                  placeholder="Enter your reporting password"
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loggingIn}
                className="w-full py-2.5 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-md transition-colors shadow-xs"
              >
                {loggingIn ? 'Authenticating...' : 'Sign In to Reporting Dashboard'}
              </button>
            </form>

            {/* Quick Demo Account Selector for Seamless Evaluation */}
            <div className="pt-4 border-t border-slate-100 space-y-2.5">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center">
                One-Click Representative Access
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {employees.map(emp => (
                  <button
                    key={emp.id}
                    onClick={() => handleQuickDemoLogin(emp)}
                    className="p-2.5 text-left border border-slate-200 rounded-lg hover:border-blue-500 hover:bg-blue-50/50 transition-all text-slate-800"
                  >
                    <div className="font-bold truncate">{emp.name}</div>
                    <div className="text-[11px] text-slate-500 truncate">{emp.designation}</div>
                    <div className="text-[10px] text-blue-600 font-mono mt-0.5">{emp.employeeId}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Logged-in Employee Dashboard
  // Employees view only their own reports unless they are Admin or Manager
  const userReports = currentUser.role === 'admin'
    ? reports
    : reports.filter(r => r.employeeId === (currentUser.employeeId || currentUser.id));

  const filteredReports = userReports.filter(r => r.reportType === activeTab);

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Top Banner: Employee Profile & Quick Actions */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-lg">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-400">
            <span>Official Reporting System</span>
            <span>·</span>
            <span>{currentUser.role.toUpperCase()}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            {currentUser.name}
          </h1>
          <div className="text-xs text-slate-300 flex flex-wrap gap-x-4 gap-y-1 pt-1 font-mono">
            <span>ID: {currentUser.employeeId || 'RH-EMP'}</span>
            <span>·</span>
            <span>Designation: {currentUser.designation}</span>
            {currentUser.territory && (
              <>
                <span>·</span>
                <span>Territory: {currentUser.territory}</span>
              </>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setShowSubmitModal(true)}
            className="px-4 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-md transition-colors flex items-center gap-2 shadow-xs"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Submit {activeTab.toUpperCase()} Report</span>
          </button>
          
          <button
            onClick={exportReportsCsv}
            className="px-3.5 py-2.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-md transition-colors flex items-center gap-1.5"
            title="Download verified CSV data"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => setCurrentUser(null)}
            className="px-3 py-2.5 text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-950/40 rounded-md transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Tabs: DAILY REPORT / WEEKLY REPORT / MONTHLY REPORT */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2">
          {(['daily', 'weekly', 'monthly'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-colors ${
                activeTab === tab
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {tab} Report
            </button>
          ))}
        </div>

        <div className="text-xs text-slate-500 font-mono">
          Showing {filteredReports.length} {activeTab} records
        </div>
      </div>

      {/* Reports List */}
      {filteredReports.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-xl border border-slate-200 space-y-3">
          <FileText className="w-10 h-10 text-slate-300 mx-auto" />
          <div className="text-sm font-bold text-slate-700">No {activeTab} reports filed yet.</div>
          <p className="text-xs text-slate-500">Click the button above to record your doctor visits, orders, and product discussions.</p>
          <button
            onClick={() => setShowSubmitModal(true)}
            className="mt-2 px-4 py-2 text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 rounded-md"
          >
            File New Report
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredReports.map(rep => (
            <div
              key={rep.id}
              className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 hover:shadow-md transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-50 text-blue-700">
                    <Stethoscope className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      {rep.doctorCustomerName}
                    </h3>
                    <div className="text-xs text-slate-500">
                      {rep.specialty || 'General Practitioner'} {rep.hospitalClinic && `· ${rep.hospitalClinic}`}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right text-xs">
                    <div className="font-semibold text-slate-700 font-mono">{rep.reportDate}</div>
                    <div className="text-slate-400">{rep.location}</div>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider ${
                      rep.status === 'approved'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : rep.status === 'reviewed'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}
                  >
                    {rep.status}
                  </span>
                </div>
              </div>

              {/* Products Discussed */}
              <div className="space-y-1.5">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Products Detailed:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {rep.productsDiscussed?.map((p, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 text-xs font-semibold text-slate-700 bg-slate-100 rounded-md border border-slate-200"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              {/* Order / Remarks */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600 bg-slate-50 p-3.5 rounded-lg border border-slate-100">
                <div>
                  <span className="font-bold text-slate-800">Order / Enquiry: </span>
                  {rep.orderEnquiryDetails || 'No direct order placed; clinical samples provided.'}
                  {rep.orderValueEstimated && rep.orderValueEstimated > 0 ? (
                    <span className="font-bold text-emerald-700 block mt-0.5">
                      Est. Value: ₹{rep.orderValueEstimated.toLocaleString()}
                    </span>
                  ) : null}
                </div>
                <div>
                  <span className="font-bold text-slate-800">Doctor Remarks: </span>
                  {rep.remarks || 'Standard detailing completed.'}
                  {rep.followUpDate && (
                    <span className="text-blue-700 font-semibold block mt-0.5 font-mono">
                      Next Follow-up: {rep.followUpDate}
                    </span>
                  )}
                </div>
              </div>

              {/* Attachment if present */}
              {rep.attachmentUrl && (
                <div className="text-xs text-blue-700 flex items-center gap-1.5 pt-1">
                  <Upload className="w-3.5 h-3.5" />
                  <a
                    href={rep.attachmentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline font-semibold"
                  >
                    View Supporting Attachment {rep.attachmentName ? `(${rep.attachmentName})` : ''}
                  </a>
                </div>
              )}

              {/* Admin Note if present */}
              {rep.adminNotes && (
                <div className="text-xs p-2.5 bg-blue-50/80 border border-blue-200 rounded-md text-blue-900">
                  <span className="font-bold">Manager / Admin Feedback: </span>
                  {rep.adminNotes}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Report Submission Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="pb-4 border-b border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                  Field Force Portal
                </span>
                <h2 className="text-xl font-extrabold text-slate-900">
                  New {activeTab.toUpperCase()} Activity Report
                </h2>
              </div>
              <button
                onClick={() => setShowSubmitModal(false)}
                className="text-slate-400 hover:text-slate-700 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitReport} className="space-y-4 pt-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Reporting Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={form.reportDate}
                    onChange={e => setForm({ ...form, reportDate: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Location / Area *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rohini Sector 14"
                    value={form.location}
                    onChange={e => setForm({ ...form, location: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Visits Count
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={form.numberOfVisits}
                    onChange={e => setForm({ ...form, numberOfVisits: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Doctor / Customer Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. A. K. Mathur"
                    value={form.doctorCustomerName}
                    onChange={e => setForm({ ...form, doctorCustomerName: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Medical Specialty
                  </label>
                  <select
                    value={form.specialty}
                    onChange={e => setForm({ ...form, specialty: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
                  >
                    <option value="Orthopedic Surgeon">Orthopedic Surgeon</option>
                    <option value="Gastroenterologist">Gastroenterologist</option>
                    <option value="General Physician">General Physician</option>
                    <option value="Physiotherapist / Rheumatologist">Physiotherapist / Rheumatologist</option>
                    <option value="Pharmacy Retailer / Stockist">Pharmacy Retailer / Stockist</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Hospital / Clinic Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Lifeline Bone & Joint Clinic"
                  value={form.hospitalClinic}
                  onChange={e => setForm({ ...form, hospitalClinic: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              {/* Products Discussed Selector */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1.5">
                  Products Discussed / Detailed *
                </label>
                <div className="flex flex-wrap gap-2">
                  {products.map(p => {
                    const isSelected = form.productsDiscussed.includes(p.name);
                    return (
                      <button
                        type="button"
                        key={p.id}
                        onClick={() => toggleProduct(p.name)}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-md border transition-colors ${
                          isSelected
                            ? 'bg-blue-700 text-white border-blue-700'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {p.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Order / Quantity Details
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 20 boxes ACTION-SP requested"
                    value={form.orderEnquiryDetails}
                    onChange={e => setForm({ ...form, orderEnquiryDetails: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Est. Order Value (₹ INR)
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    value={form.orderValueEstimated}
                    onChange={e => setForm({ ...form, orderValueEstimated: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Next Follow-up Date
                  </label>
                  <input
                    type="date"
                    value={form.followUpDate}
                    onChange={e => setForm({ ...form, followUpDate: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Supporting Document / Photo (Optional)
                  </label>
                  <input
                    type="file"
                    accept="image/*,.pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="w-full text-xs text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200"
                  />
                  {form.attachmentName && (
                    <div className="text-[10px] text-emerald-700 mt-1 font-semibold">
                      Attached: {form.attachmentName}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Doctor Feedback &amp; Field Remarks
                </label>
                <textarea
                  rows={2}
                  placeholder="Record prescription habits, sample feedback, or competitor mentions..."
                  value={form.remarks}
                  onChange={e => setForm({ ...form, remarks: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingReport}
                  className="px-5 py-2 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-md transition-colors"
                >
                  {submittingReport ? 'Submitting...' : 'File Report'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
