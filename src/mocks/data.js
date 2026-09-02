/**
 * Mock Data Layer
 *
 * Realistic sample data for RouterTicket. When integrating live APIs,
 * replace these with actual API responses — the shape stays the same.
 */

// ─── Voucher Plans (sold on storefront) ───
export const plans = [
  {
    id: 'plan-001',
    name: '1GB Day Pass',
    dataAmount: '1GB',
    duration: '24hrs',
    price: 5.00,
    currency: 'GHS',
    active: true,
  },
  {
    id: 'plan-002',
    name: '3GB Weekend',
    dataAmount: '3GB',
    duration: '48hrs',
    price: 12.00,
    currency: 'GHS',
    active: true,
  },
  {
    id: 'plan-003',
    name: '5GB Weekly',
    dataAmount: '5GB',
    duration: '7 days',
    price: 20.00,
    currency: 'GHS',
    active: true,
  },
  {
    id: 'plan-004',
    name: '10GB Monthly',
    dataAmount: '10GB',
    duration: '30 days',
    price: 35.00,
    currency: 'GHS',
    active: true,
  },
  {
    id: 'plan-005',
    name: '20GB Power',
    dataAmount: '20GB',
    duration: '30 days',
    price: 60.00,
    currency: 'GHS',
    active: false,
  },
]

// ─── Batches (imported MikroTik voucher batches) ───
export const batches = [
  {
    id: 'batch-001',
    name: 'January Bulk Import',
    planId: 'plan-001',
    totalVouchers: 500,
    soldCount: 312,
    activeCount: 188,
    status: 'active',
    importedAt: '2026-01-15T10:30:00Z',
    expiresAt: '2026-03-15T23:59:59Z',
    prefix: 'RTK',
  },
  {
    id: 'batch-002',
    name: 'Feb Weekend Batch',
    planId: 'plan-002',
    totalVouchers: 200,
    soldCount: 87,
    activeCount: 113,
    status: 'active',
    importedAt: '2026-02-01T08:00:00Z',
    expiresAt: '2026-04-01T23:59:59Z',
    prefix: 'RTK',
  },
  {
    id: 'batch-003',
    name: 'Q1 Monthly Pack',
    planId: 'plan-004',
    totalVouchers: 150,
    soldCount: 150,
    activeCount: 0,
    status: 'depleted',
    importedAt: '2026-01-02T12:00:00Z',
    expiresAt: '2026-06-30T23:59:59Z',
    prefix: 'RTK',
  },
  {
    id: 'batch-004',
    name: 'March Weekly Top-up',
    planId: 'plan-003',
    totalVouchers: 300,
    soldCount: 42,
    activeCount: 258,
    status: 'active',
    importedAt: '2026-03-01T09:15:00Z',
    expiresAt: '2026-05-01T23:59:59Z',
    prefix: 'RTK',
  },
]

// ─── Individual Vouchers (sample from a batch) ───
export const vouchers = [
  { id: 'vch-001', code: 'RTK-7X4M-P2Q9', batchId: 'batch-001', status: 'sold', soldAt: '2026-01-20T14:22:00Z' },
  { id: 'vch-002', code: 'RTK-9B3K-L8W1', batchId: 'batch-001', status: 'active' },
  { id: 'vch-003', code: 'RTK-2N6J-H5T3', batchId: 'batch-001', status: 'active' },
  { id: 'vch-004', code: 'RTK-4F8D-R1Y7', batchId: 'batch-002', status: 'sold', soldAt: '2026-02-10T11:45:00Z' },
  { id: 'vch-005', code: 'RTK-6C2A-X9P4', batchId: 'batch-002', status: 'active' },
]

// ─── Storefront Config ───
export const storefrontConfig = {
  storeId: 'store-001',
  ownerName: 'Kwame Asante',
  storeName: 'Asante Hotspot',
  tagline: 'Fast & reliable internet for everyone',
  status: 'online', // online | offline | maintenance
  logoUrl: null,
  primaryColor: '#14B8A6',
  plans: ['plan-001', 'plan-002', 'plan-003', 'plan-004'],
  contactPhone: '+233 24 123 4567',
  location: 'East Legon, Accra',
}

// ─── Sales / Orders ───
export const recentSales = [
  { id: 'ord-001', planId: 'plan-001', voucherCode: 'RTK-7X4M-P2Q9', amount: 5.00, currency: 'GHS', paymentMethod: 'momo', buyerPhone: '+23324****56', paystackReference: 'PSK-20260302-001', createdAt: '2026-03-02T08:15:00Z' },
  { id: 'ord-002', planId: 'plan-002', voucherCode: 'RTK-4F8D-R1Y7', amount: 12.00, currency: 'GHS', paymentMethod: 'momo', buyerPhone: '+23320****12', paystackReference: 'PSK-20260302-002', createdAt: '2026-03-02T07:42:00Z' },
  { id: 'ord-003', planId: 'plan-001', voucherCode: 'RTK-3P7K-M2N5', amount: 5.00, currency: 'GHS', paymentMethod: 'cash', buyerPhone: null, paystackReference: 'PSK-20260301-003', createdAt: '2026-03-01T22:10:00Z' },
  { id: 'ord-004', planId: 'plan-003', voucherCode: 'RTK-8W1L-B6T9', amount: 20.00, currency: 'GHS', paymentMethod: 'momo', buyerPhone: '+23355****78', paystackReference: 'PSK-20260301-004', createdAt: '2026-03-01T19:30:00Z' },
  { id: 'ord-005', planId: 'plan-004', voucherCode: 'RTK-5R2C-J4H8', amount: 35.00, currency: 'GHS', paymentMethod: 'card', buyerPhone: null, paystackReference: 'PSK-20260301-005', createdAt: '2026-03-01T16:55:00Z' },
]

// ─── Analytics / Dashboard Stats ───
export const dashboardStats = {
  today: {
    sold: 38,
    revenue: 186.00,
    currency: 'GHS',
    newCustomers: 24,
    activeVouchers: 78,
  },
  week: {
    sold: 245,
    revenue: 1180.00,
    currency: 'GHS',
    avgDaily: 35,
  },
  month: {
    sold: 980,
    revenue: 4720.00,
    currency: 'GHS',
  },
  totalStock: 1159,
  storeUptime: 99.2,
}

// ─── Payouts ───
export const payouts = [
  { id: 'pay-001', amount: 500.00, currency: 'GHS', status: 'completed', method: 'momo', reference: 'MOMO-2026-0301-001', processedAt: '2026-03-01T12:00:00Z' },
  { id: 'pay-002', amount: 350.00, currency: 'GHS', status: 'completed', method: 'momo', reference: 'MOMO-2026-0225-002', processedAt: '2026-02-25T10:30:00Z' },
  { id: 'pay-003', amount: 200.00, currency: 'GHS', status: 'pending', method: 'bank', reference: 'BANK-2026-0302-003', processedAt: null },
]

// ─── Helper: lookup plan by ID ───
export function getPlanById(planId) {
  return plans.find(p => p.id === planId) || null
}
