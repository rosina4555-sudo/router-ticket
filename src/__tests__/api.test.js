import { describe, it, expect } from 'vitest'
import { batches, storefront, analytics, payouts, orders } from '../api'

describe('Batches API', () => {
  it('fetchBatches returns array of batches', async () => {
    const result = await batches.fetchBatches()
    expect(Array.isArray(result)).toBe(true)
    expect(result.length).toBeGreaterThan(0)
    expect(result[0]).toHaveProperty('id')
    expect(result[0]).toHaveProperty('name')
    expect(result[0]).toHaveProperty('totalVouchers')
  })

  it('fetchBatchById returns a single batch', async () => {
    const all = await batches.fetchBatches()
    const batch = await batches.fetchBatchById(all[0].id)
    expect(batch.id).toBe(all[0].id)
    expect(batch.name).toBe(all[0].name)
  })

  it('fetchBatchById throws on invalid id', async () => {
    await expect(batches.fetchBatchById('nonexistent')).rejects.toThrow('Batch not found')
  })

  it('fetchVouchersByBatchId returns vouchers for that batch', async () => {
    const all = await batches.fetchBatches()
    const vouchers = await batches.fetchVouchersByBatchId(all[0].id)
    expect(Array.isArray(vouchers)).toBe(true)
    vouchers.forEach(v => {
      expect(v.batchId).toBe(all[0].id)
    })
  })
})

describe('Storefront API', () => {
  it('fetchStorefrontConfig returns config object', async () => {
    const config = await storefront.fetchStorefrontConfig()
    expect(config).toHaveProperty('storeId')
    expect(config).toHaveProperty('storeName')
    expect(config).toHaveProperty('status')
  })

  it('fetchPublicPlans returns only active plans', async () => {
    const plans = await storefront.fetchPublicPlans()
    expect(Array.isArray(plans)).toBe(true)
    plans.forEach(p => {
      expect(p.active).toBe(true)
    })
  })

  it('updateStorefrontConfig persists changes', async () => {
    const original = await storefront.fetchStorefrontConfig()
    const updated = await storefront.updateStorefrontConfig({ tagline: 'Test tagline' })
    expect(updated.tagline).toBe('Test tagline')
    // Restore
    await storefront.updateStorefrontConfig({ tagline: original.tagline })
  })
})

describe('Analytics API', () => {
  it('fetchDashboardStats returns stats object', async () => {
    const stats = await analytics.fetchDashboardStats()
    expect(stats).toHaveProperty('today')
    expect(stats).toHaveProperty('week')
    expect(stats).toHaveProperty('month')
    expect(stats.today).toHaveProperty('sold')
    expect(stats.today).toHaveProperty('revenue')
  })

  it('fetchRecentSales returns limited results', async () => {
    const sales = await analytics.fetchRecentSales(3)
    expect(sales.length).toBeLessThanOrEqual(3)
  })
})

describe('Payouts API', () => {
  it('fetchPayouts returns array', async () => {
    const result = await payouts.fetchPayouts()
    expect(Array.isArray(result)).toBe(true)
  })

  it('requestPayout creates a new pending payout', async () => {
    const payout = await payouts.requestPayout(100, 'momo')
    expect(payout.amount).toBe(100)
    expect(payout.status).toBe('pending')
    expect(payout.method).toBe('momo')
  })
})

describe('Orders API', () => {
  it('createOrder returns order with voucher code', async () => {
    const plans = await storefront.fetchPublicPlans()
    const order = await orders.createOrder(plans[0].id, '+233240000000')
    expect(order).toHaveProperty('id')
    expect(order).toHaveProperty('voucherCode')
    expect(order.voucherCode).toMatch(/^RTK-/)
    expect(order.amount).toBe(plans[0].price)
  })

  it('createOrder throws on invalid plan', async () => {
    await expect(orders.createOrder('nonexistent', '+233240000000')).rejects.toThrow('Plan not found')
  })

  it('lookupOrderByReference returns order with plan details', async () => {
    const order = await orders.lookupOrderByReference('PSK-20260302-001')
    expect(order).toHaveProperty('paystackReference', 'PSK-20260302-001')
    expect(order).toHaveProperty('voucherCode')
    expect(order.voucherCode).toMatch(/^RTK-/)
    expect(order.plan).toHaveProperty('name')
  })

  it('lookupOrderByReference throws on unknown reference', async () => {
    await expect(orders.lookupOrderByReference('FAKE-REF')).rejects.toThrow('No order found')
  })
})
