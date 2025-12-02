
export interface Product {
  id: string;
  name: string;
  price: number;
  tagline: string;
  description: string;
  level: number; // 1-4
  features: string[];
  chapters?: { title: string; points: string[] }[];
}

export enum OrderStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
  DOWNLOADED = 'DOWNLOADED'
}

export interface Order {
  id: string;
  status: OrderStatus;
  productId: string;
  productName: string;
  customerName: string;
  customerEmail: string;
  amount: number;
  currency: string;
  tax: number;
  createdAt: string; // ISO date
  notes?: string;
  paymentMethod?: 'PAYPAL' | 'STRIPE' | 'MANUAL';
  transactionId?: string;
  billingAddress?: string;
  billingCountry?: string;
}

export interface Invoice {
  id: string;
  orderId: string;
  invoiceNumber: string;
  issueDate: string; // UTC ISO
  subtotal: number;
  tax: number;
  total: number;
  currency: string;
  status: 'DRAFT' | 'ISSUED' | 'VOIDED' | 'PAID';
  billTo: {
    name: string;
    email: string;
    address?: string;
    country?: string;
    vatId?: string;
  };
  pdfUrl?: string; // Simulated URL
  auditTrail?: InvoiceAuditTrail;
}

export interface InvoiceAuditTrail {
  deliveryStatus: 'DOWNLOADED' | 'PENDING';
  linkId: string;
  sentTimestamp: string;
  accessIp: string;
  accessTime: string;
  deviceSig: string;
  isSandbox: boolean;
}

export interface DownloadLink {
  id: string;
  orderId: string;
  productName: string;
  key: string; // The secret token
  expiresAt: string;
  maxDownloads: number;
  downloadCount: number;
  isActive: boolean;
  createdAt: string;
}

export interface AccessLog {
  id: string;
  linkId?: string; // Link to specific download key
  resource: string;
  timestamp: string;
  ip: string;
  deviceSig: string;
}

export interface AdminStats {
  totalRevenue: number;
  totalOrders: number;
  activeUsers: number;
  conversionRate: number;
}

export interface PayPalSettings {
  enabled: boolean;
  mode: 'SANDBOX' | 'LIVE';
  clientId: string;
  clientSecret: string;
}
