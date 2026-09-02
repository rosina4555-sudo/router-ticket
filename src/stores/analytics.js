/**
 * Analytics Store
 *
 * Dashboard statistics and recent sales data.
 */

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { analytics as analyticsApi } from '../api'

export const useAnalyticsStore = defineStore('analytics', () => {
  // ─── State ───
  const stats = ref(null)
  const recentSales = ref([])
  const loading = ref(false)
  const error = ref(null)

  // ─── Actions ───
  async function loadStats() {
    loading.value = true
    error.value = null
    try {
      stats.value = await analyticsApi.fetchDashboardStats()
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  async function loadRecentSales(limit = 10) {
    loading.value = true
    error.value = null
    try {
      recentSales.value = await analyticsApi.fetchRecentSales(limit)
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  return {
    stats,
    recentSales,
    loading,
    error,
    loadStats,
    loadRecentSales,
  }
})
