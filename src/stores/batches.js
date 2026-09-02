/**
 * Batches Store
 *
 * Manages MikroTik voucher batch state for the dashboard.
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { batches as batchesApi } from '../api'

export const useBatchesStore = defineStore('batches', () => {
  // ─── State ───
  const batches = ref([])
  const currentBatch = ref(null)
  const vouchers = ref([])
  const loading = ref(false)
  const error = ref(null)

  // ─── Getters ───
  const activeBatches = computed(() =>
    batches.value.filter(b => b.status === 'active')
  )

  const totalStock = computed(() =>
    batches.value.reduce((sum, b) => sum + b.activeCount, 0)
  )

  const totalSold = computed(() =>
    batches.value.reduce((sum, b) => sum + b.soldCount, 0)
  )

  const lowStockBatches = computed(() =>
    batches.value.filter(b => b.status === 'active' && (b.activeCount / b.totalVouchers) < 0.2)
  )

  // ─── Actions ───
  async function loadBatches() {
    loading.value = true
    error.value = null
    try {
      batches.value = await batchesApi.fetchBatches()
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  async function loadBatch(id) {
    loading.value = true
    error.value = null
    try {
      currentBatch.value = await batchesApi.fetchBatchById(id)
      vouchers.value = await batchesApi.fetchVouchersByBatchId(id)
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  return {
    batches,
    currentBatch,
    vouchers,
    loading,
    error,
    activeBatches,
    totalStock,
    totalSold,
    lowStockBatches,
    loadBatches,
    loadBatch,
  }
})
