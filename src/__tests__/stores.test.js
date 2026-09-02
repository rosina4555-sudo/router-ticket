import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useBatchesStore } from '../stores/batches'
import { useStorefrontStore } from '../stores/storefront'
import { useAnalyticsStore } from '../stores/analytics'

describe('Batches Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('starts with empty state', () => {
    const store = useBatchesStore()
    expect(store.batches).toEqual([])
    expect(store.loading).toBe(false)
    expect(store.error).toBeNull()
  })

  it('loadBatches populates batches array', async () => {
    const store = useBatchesStore()
    await store.loadBatches()
    expect(store.batches.length).toBeGreaterThan(0)
    expect(store.loading).toBe(false)
  })

  it('activeBatches filters to active only', async () => {
    const store = useBatchesStore()
    await store.loadBatches()
    store.activeBatches.forEach(b => {
      expect(b.status).toBe('active')
    })
  })

  it('totalStock sums activeCount across batches', async () => {
    const store = useBatchesStore()
    await store.loadBatches()
    const expected = store.batches.reduce((sum, b) => sum + b.activeCount, 0)
    expect(store.totalStock).toBe(expected)
  })

  it('loadBatch sets currentBatch and vouchers', async () => {
    const store = useBatchesStore()
    await store.loadBatches()
    const batchId = store.batches[0].id
    await store.loadBatch(batchId)
    expect(store.currentBatch).not.toBeNull()
    expect(store.currentBatch.id).toBe(batchId)
    expect(Array.isArray(store.vouchers)).toBe(true)
  })
})

describe('Storefront Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('starts with null config', () => {
    const store = useStorefrontStore()
    expect(store.config).toBeNull()
    expect(store.isOnline).toBe(false)
  })

  it('loadConfig populates config and plans', async () => {
    const store = useStorefrontStore()
    await store.loadConfig()
    expect(store.config).not.toBeNull()
    expect(store.config).toHaveProperty('storeName')
    expect(store.plans.length).toBeGreaterThan(0)
  })

  it('isOnline reflects config status', async () => {
    const store = useStorefrontStore()
    await store.loadConfig()
    expect(store.isOnline).toBe(true)
  })

  it('loadPublicPlans loads only active plans', async () => {
    const store = useStorefrontStore()
    await store.loadPublicPlans()
    expect(store.publicPlans.length).toBeGreaterThan(0)
    store.publicPlans.forEach(p => {
      expect(p.active).toBe(true)
    })
  })

  it('updateConfig modifies config', async () => {
    const store = useStorefrontStore()
    await store.loadConfig()
    await store.updateConfig({ tagline: 'Updated tagline' })
    expect(store.config.tagline).toBe('Updated tagline')
  })
})

describe('Analytics Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('starts with null stats', () => {
    const store = useAnalyticsStore()
    expect(store.stats).toBeNull()
    expect(store.recentSales).toEqual([])
  })

  it('loadStats populates stats', async () => {
    const store = useAnalyticsStore()
    await store.loadStats()
    expect(store.stats).not.toBeNull()
    expect(store.stats.today).toHaveProperty('sold')
    expect(store.stats.today).toHaveProperty('revenue')
  })

  it('loadRecentSales populates recentSales', async () => {
    const store = useAnalyticsStore()
    await store.loadRecentSales(5)
    expect(store.recentSales.length).toBeGreaterThan(0)
    expect(store.recentSales.length).toBeLessThanOrEqual(5)
  })
})
