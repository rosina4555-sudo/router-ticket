/**
 * Mock API Client
 *
 * Simulates network latency and returns mock data. This is the single
 * point of contact for all data fetching in mock mode.
 *
 * To switch to real API: replace `mockClient` with `httpClient` in each
 * domain module (src/api/*.js). The function signatures stay identical.
 */

import * as data from '../mocks/data'

const MOCK_DELAY_MS = 200

function delay(ms = MOCK_DELAY_MS) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// ─── Batches ───
export async function fetchBatches() {
  await delay()
  return [...data.batches]
}

export async function fetchBatchById(id) {
  await delay()
  const batch = data.batches.find(b => b.id === id)
  if (!batch) throw Object.assign(new Error('Batch not found'), { code: 'NOT_FOUND' })
  return { ...batch }
}

export async function fetchVouchersByBatchId(batchId) {
  await delay()
  return data.vouchers.filter(v => v.batchId === batchId).map(v => ({ ...v }))
}

// ─── Storefront ───
export async function fetchStorefrontConfig() {
  await delay()
  return { ...data.storefrontConfig }
}

export async function updateStorefrontConfig(updates) {
  await delay()
  Object.assign(data.storefrontConfig, updates)
  return { ...data.storefrontConfig }
}

// ─── Plans ───
export async function fetchPlans() {
  await delay()
  return [...data.plans]
}

export async function fetchPublicPlans() {
  await delay()
  return data.plans.filter(p => p.active).map(p => ({ ...p }))
}

// ─── Analytics ───
export async function fetchDashboardStats() {
  await delay()
  return { ...data.dashboardStats }
}

export async function fetchRecentSales(limit = 10) {
  await delay()
  return data.recentSales.slice(0, limit).map(s => ({ ...s }))
}

// ─── Payouts ───
export async function fetchPayouts() {
  await delay()
  return [...data.payouts]
}

export async function requestPayout(amount, method) {
  await delay(500)
  const payout = {
    id: `pay-${Date.now()}`,
    amount,
    currency: 'GHS',
    status: 'pending',
    method,
    reference: `PAYOUT-${Date.now()}`,
    processedAt: null,
  }
  data.payouts.unshift(payout)
  return { ...payout }
}

// ─── Orders (storefront checkout) ───
export async function createOrder(planId, buyerPhone) {
  await delay(400)
  const plan = data.getPlanById(planId)
  if (!plan) throw Object.assign(new Error('Plan not found'), { code: 'NOT_FOUND' })

  // Find an active voucher from the matching batch
  const batch = data.batches.find(b => b.planId === planId && b.activeCount > 0)
  if (!batch) throw Object.assign(new Error('No vouchers available'), { code: 'OUT_OF_STOCK' })

  const voucher = data.vouchers.find(v => v.batchId === batch.id && v.status === 'active')
  if (!voucher) throw Object.assign(new Error('No vouchers available'), { code: 'OUT_OF_STOCK' })

  // Mark voucher as sold
  voucher.status = 'sold'
  voucher.soldAt = new Date().toISOString()
  batch.soldCount++
  batch.activeCount--

  const order = {
    id: `ord-${Date.now()}`,
    planId,
    voucherCode: voucher.code,
    amount: plan.price,
    currency: plan.currency,
    paymentMethod: 'momo',
    buyerPhone,
    paystackReference: `PSK-${Date.now()}`,
    createdAt: new Date().toISOString(),
  }
  data.recentSales.unshift(order)
  return { ...order, plan: { ...plan } }
}

// ─── Order lookup (by Paystack reference) ───
export async function lookupOrderByReference(reference) {
  await delay()
  const order = data.recentSales.find(o => o.paystackReference === reference)
  if (!order) throw Object.assign(new Error('No order found for this reference'), { code: 'NOT_FOUND' })
  const plan = data.getPlanById(order.planId)
  return { ...order, plan: plan ? { ...plan } : null }
}
