export type UserRole = 'admin' | 'medical_rep' | 'sales_exec' | 'manager';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  employeeId?: string;
  designation?: string;
  phone?: string;
  territory?: string;
  status: 'active' | 'inactive';
  joinedDate: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  genericName: string;
  brandName: string;
  category: 'Pain Management' | 'Gastroenterology' | 'Anti-Infectives' | 'Nutraceuticals' | 'General';
  composition: string;
  dosageForm: 'Tablets' | 'Capsules' | 'Syrup' | 'Injection';
  packing: string;
  headline: string;
  shortDescription: string;
  detailedDescription?: string;
  keyInformation: {
    title: string;
    description: string;
  }[];
  indications: string[];
  features: string[];
  alsoAvailable?: {
    name: string;
    composition: string;
    dosageForm: string;
  }[];
  primaryImage: string;
  galleryImages: string[];
  brochureUrl?: string;
  published: boolean;
  featured: boolean;
  order: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  category: 'Company' | 'Products' | 'Events' | 'Medical / Healthcare' | 'Training' | 'Team' | 'Other';
  imageUrl: string;
  date: string;
  featured?: boolean;
  published: boolean;
  order: number;
}

export interface EmployeeReport {
  id: string;
  employeeId: string;
  employeeName: string;
  designation: string;
  reportType: 'daily' | 'weekly' | 'monthly';
  reportDate: string;
  location: string;
  doctorCustomerName: string;
  specialty?: string;
  hospitalClinic?: string;
  numberOfVisits: number;
  productsDiscussed: string[];
  orderEnquiryDetails?: string;
  orderValueEstimated?: number;
  followUpDate: string;
  remarks: string;
  attachmentUrl?: string;
  attachmentName?: string;
  status: 'submitted' | 'reviewed' | 'approved';
  adminNotes?: string;
  createdAt: string;
}

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  mobile: string;
  city: string;
  subject: string;
  productInterestedIn: string;
  message: string;
  attachmentUrl?: string;
  status: 'new' | 'read' | 'in_progress' | 'resolved';
  createdAt: string;
  notes?: string;
}

export interface HomepageContent {
  headline: string;
  subheadline: string;
  heroImage: string;
  featuredProductIds: string[];
  companyIntroTitle: string;
  companyIntroText: string;
  commitments: {
    title: string;
    description: string;
    icon: string;
  }[];
  whyChooseUs: {
    title: string;
    description: string;
  }[];
  ctaPrimaryText: string;
  ctaSecondaryText: string;
}

export interface AboutContent {
  title: string;
  whoWeAre: string;
  mission: string;
  vision: string;
  values: {
    title: string;
    description: string;
  }[];
  qualityCommitment: string;
  professionalApproach: string;
  bannerImage?: string;
}

export interface WebsiteSettings {
  companyName: string;
  logoUrl: string;
  email: string;
  whatsappNumber: string;
  whatsappMessage: string;
  phoneNumber: string;
  address: string;
  googleMapsUrl: string;
  facebookUrl?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  footerTagline: string;
  announcementText?: string;
  announcementActive: boolean;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
}
