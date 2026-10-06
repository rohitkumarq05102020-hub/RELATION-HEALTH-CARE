import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  initialProducts,
  initialGallery,
  initialEmployees,
  initialReports,
  initialEnquiries,
  initialHomepageContent,
  initialAboutContent,
  initialSettings
} from './src/data/initialData';
import { Product, GalleryItem, EmployeeReport, Enquiry, HomepageContent, AboutContent, WebsiteSettings, User } from './src/types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

interface DatabaseState {
  products: Product[];
  gallery: GalleryItem[];
  employees: User[];
  reports: EmployeeReport[];
  enquiries: Enquiry[];
  homepage: HomepageContent;
  about: AboutContent;
  settings: WebsiteSettings;
}

const getDefaultDb = (): DatabaseState => ({
  products: initialProducts,
  gallery: initialGallery,
  employees: initialEmployees,
  reports: initialReports,
  enquiries: initialEnquiries,
  homepage: initialHomepageContent,
  about: initialAboutContent,
  settings: initialSettings
});

const loadDb = (): DatabaseState => {
  try {
    if (fs.existsSync(DB_FILE)) {
      const content = fs.readFileSync(DB_FILE, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error('Failed to read db.json, falling back to initial data', err);
  }
  const defaultData = getDefaultDb();
  saveDb(defaultData);
  return defaultData;
};

const saveDb = (data: DatabaseState) => {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to save db.json', err);
  }
};

let db = loadDb();

async function startServer() {
  const app = express();

  // Middleware
  app.use(express.json({ limit: '25mb' }));
  app.use(express.urlencoded({ extended: true, limit: '25mb' }));

  // --- API ROUTES ---

  // Health check
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Get full website state
  app.get('/api/state', (_req: Request, res: Response) => {
    res.json({
      products: db.products,
      gallery: db.gallery,
      homepage: db.homepage,
      about: db.about,
      settings: db.settings
    });
  });

  // Authentication
  app.post('/api/auth/login', (req: Request, res: Response) => {
    const { email, password } = req.body;
    const cleanEmail = (email || '').trim().toLowerCase();

    // Check admin
    if (
      cleanEmail === 'admin@relationhealthcare.com' ||
      cleanEmail === 'relationhealthcare@gmail.com'
    ) {
      if (password === 'relation2026!' || password === 'admin' || password === 'admin123') {
        const adminUser: User = {
          id: 'user-admin',
          name: 'Relation Healthcare Admin',
          email: 'relationhealthcare@gmail.com',
          role: 'admin',
          employeeId: 'ADM-001',
          designation: 'Managing Director & Administrator',
          status: 'active',
          joinedDate: '2025-01-01'
        };
        return res.json({
          token: 'rh-token-admin-' + Date.now(),
          user: adminUser
        });
      }
    }

    // Check employee list
    const foundEmployee = db.employees.find(e => e.email.toLowerCase() === cleanEmail);
    if (foundEmployee) {
      // In demo environment, accept standard demo password or employeeId
      if (
        password === 'rep123' ||
        password === 'sales123' ||
        password === 'mgr123' ||
        password === 'relation2026!' ||
        password === (foundEmployee.employeeId || '').toLowerCase() ||
        password === 'password'
      ) {
        return res.json({
          token: 'rh-token-emp-' + foundEmployee.id + '-' + Date.now(),
          user: foundEmployee
        });
      }
    }

    // Fallback demo login helper
    if (password === 'relation2026!' || password === 'admin') {
      const demoUser: User = {
        id: 'user-demo-' + Date.now(),
        name: cleanEmail.split('@')[0] || 'Healthcare Team Member',
        email: cleanEmail,
        role: 'admin',
        employeeId: 'RH-AUTO-01',
        designation: 'Staff Member',
        status: 'active',
        joinedDate: new Date().toISOString().split('T')[0]
      };
      return res.json({
        token: 'rh-token-auto-' + Date.now(),
        user: demoUser
      });
    }

    return res.status(401).json({ error: 'Invalid email or password' });
  });

  // Products
  app.get('/api/products', (_req: Request, res: Response) => {
    res.json(db.products);
  });

  app.post('/api/products', (req: Request, res: Response) => {
    const newProduct: Product = {
      ...req.body,
      id: 'prod-' + Date.now(),
      order: db.products.length + 1
    };
    db.products.push(newProduct);
    saveDb(db);
    res.status(201).json(newProduct);
  });

  app.put('/api/products/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const index = db.products.findIndex(p => p.id === id || p.slug === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Product not found' });
    }
    db.products[index] = { ...db.products[index], ...req.body };
    saveDb(db);
    res.json(db.products[index]);
  });

  app.delete('/api/products/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    db.products = db.products.filter(p => p.id !== id && p.slug !== id);
    saveDb(db);
    res.json({ success: true });
  });

  // Gallery
  app.get('/api/gallery', (_req: Request, res: Response) => {
    res.json(db.gallery);
  });

  app.post('/api/gallery', (req: Request, res: Response) => {
    const newItem: GalleryItem = {
      ...req.body,
      id: 'gal-' + Date.now(),
      order: db.gallery.length + 1
    };
    db.gallery.push(newItem);
    saveDb(db);
    res.status(201).json(newItem);
  });

  app.put('/api/gallery/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const index = db.gallery.findIndex(g => g.id === id);
    if (index === -1) return res.status(404).json({ error: 'Item not found' });
    db.gallery[index] = { ...db.gallery[index], ...req.body };
    saveDb(db);
    res.json(db.gallery[index]);
  });

  app.delete('/api/gallery/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    db.gallery = db.gallery.filter(g => g.id !== id);
    saveDb(db);
    res.json({ success: true });
  });

  // Employee Reports
  app.get('/api/reports', (req: Request, res: Response) => {
    const { employeeId } = req.query;
    if (employeeId) {
      const filtered = db.reports.filter(r => r.employeeId === employeeId);
      return res.json(filtered);
    }
    res.json(db.reports);
  });

  app.post('/api/reports', (req: Request, res: Response) => {
    const newReport: EmployeeReport = {
      ...req.body,
      id: 'rep-' + Date.now(),
      status: 'submitted',
      createdAt: new Date().toISOString()
    };
    db.reports.unshift(newReport);
    saveDb(db);
    res.status(201).json(newReport);
  });

  app.put('/api/reports/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const index = db.reports.findIndex(r => r.id === id);
    if (index === -1) return res.status(404).json({ error: 'Report not found' });
    db.reports[index] = { ...db.reports[index], ...req.body };
    saveDb(db);
    res.json(db.reports[index]);
  });

  // Export Reports CSV
  app.get('/api/reports/export/csv', (_req: Request, res: Response) => {
    const headers = [
      'Report ID',
      'Employee ID',
      'Employee Name',
      'Designation',
      'Type',
      'Date',
      'Location',
      'Doctor / Customer',
      'Specialty',
      'Visits',
      'Products Discussed',
      'Estimated Value (INR)',
      'Follow-up Date',
      'Status',
      'Remarks'
    ];

    const rows = db.reports.map(r => [
      `"${r.id}"`,
      `"${r.employeeId}"`,
      `"${r.employeeName}"`,
      `"${r.designation}"`,
      `"${r.reportType}"`,
      `"${r.reportDate}"`,
      `"${(r.location || '').replace(/"/g, '""')}"`,
      `"${(r.doctorCustomerName || '').replace(/"/g, '""')}"`,
      `"${(r.specialty || '').replace(/"/g, '""')}"`,
      r.numberOfVisits,
      `"${(r.productsDiscussed || []).join('; ')}"`,
      r.orderValueEstimated || 0,
      `"${r.followUpDate || ''}"`,
      `"${r.status}"`,
      `"${(r.remarks || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=relation_healthcare_reports_${Date.now()}.csv`);
    res.send(csvContent);
  });

  // Employees Management
  app.get('/api/employees', (_req: Request, res: Response) => {
    res.json(db.employees);
  });

  app.post('/api/employees', (req: Request, res: Response) => {
    const newEmp: User = {
      ...req.body,
      id: 'emp-' + Date.now(),
      status: req.body.status || 'active',
      joinedDate: req.body.joinedDate || new Date().toISOString().split('T')[0]
    };
    db.employees.push(newEmp);
    saveDb(db);
    res.status(201).json(newEmp);
  });

  app.put('/api/employees/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const index = db.employees.findIndex(e => e.id === id);
    if (index === -1) return res.status(404).json({ error: 'Employee not found' });
    db.employees[index] = { ...db.employees[index], ...req.body };
    saveDb(db);
    res.json(db.employees[index]);
  });

  app.delete('/api/employees/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    db.employees = db.employees.filter(e => e.id !== id);
    saveDb(db);
    res.json({ success: true });
  });

  // Enquiries / Feedback
  app.get('/api/enquiries', (_req: Request, res: Response) => {
    res.json(db.enquiries);
  });

  app.post('/api/enquiries', (req: Request, res: Response) => {
    const newEnquiry: Enquiry = {
      ...req.body,
      id: 'enq-' + Date.now(),
      status: 'new',
      createdAt: new Date().toISOString()
    };
    db.enquiries.unshift(newEnquiry);
    saveDb(db);

    // Simulate verified email notification dispatch to relationhealthcare@gmail.com
    console.log(`[EMAIL SYSTEM DISPATCH] To: relationhealthcare@gmail.com`);
    console.log(`Subject: New Website Enquiry - Relation Healthcare`);
    console.log(`Details: Name: ${newEnquiry.name}, Phone: ${newEnquiry.mobile}, Product: ${newEnquiry.productInterestedIn}, City: ${newEnquiry.city}`);
    console.log(`Message: ${newEnquiry.message}`);

    res.status(201).json({
      success: true,
      enquiry: newEnquiry,
      message: 'Thank you. Your enquiry has been received.'
    });
  });

  app.put('/api/enquiries/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const index = db.enquiries.findIndex(e => e.id === id);
    if (index === -1) return res.status(404).json({ error: 'Enquiry not found' });
    db.enquiries[index] = { ...db.enquiries[index], ...req.body };
    saveDb(db);
    res.json(db.enquiries[index]);
  });

  // Content & Settings
  app.put('/api/homepage', (req: Request, res: Response) => {
    db.homepage = { ...db.homepage, ...req.body };
    saveDb(db);
    res.json(db.homepage);
  });

  app.put('/api/about', (req: Request, res: Response) => {
    db.about = { ...db.about, ...req.body };
    saveDb(db);
    res.json(db.about);
  });

  app.put('/api/settings', (req: Request, res: Response) => {
    db.settings = { ...db.settings, ...req.body };
    saveDb(db);
    res.json(db.settings);
  });

  // Reset to initial defaults (Admin diagnostic tool)
  app.post('/api/admin/reset-data', (_req: Request, res: Response) => {
    db = getDefaultDb();
    saveDb(db);
    res.json({ success: true, message: 'Database reset to initial master data.' });
  });

  // Vite integration in development
  const isProd = process.env.NODE_ENV === 'production';
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Relation Healthcare server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});
