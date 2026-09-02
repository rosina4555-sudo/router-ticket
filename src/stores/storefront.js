/**
 * Storefront Store
 *
 * Manages store configuration and plan data for both
 * dashboard settings and public storefront views.
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { storefront as storefrontApi } from '../api'

export const useStorefrontStore = defineStore('storefront', () => {
  // ─── State ───
  const config = ref(null)
  const plans = ref([])
  const publicPlans = ref([])
  const loading = ref(false)
  const error = ref(null)

  // ─── Getters ───
  const isOnline = computed(() => config.value?.status === 'online')

  const activePlans = computed(() =>
    plans.value.filter(p => p.active)
  )

  const storeDisplayName = computed(() =>
    config.value?.storeName || 'My Hotspot'
  )

  // ─── Actions ───
  async function loadConfig() {
    loading.value = true
    error.value = null
    try {
      config.value = await storefrontApi.fetchStorefrontConfig()
      plans.value = await storefrontApi.fetchPlans()
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  async function loadPublicPlans() {
    loading.value = true
    error.value = null
    try {
      publicPlans.value = await storefrontApi.fetchPublicPlans()
      config.value = await storefrontApi.fetchStorefrontConfig()
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  async function updateConfig(updates) {
    loading.value = true
    error.value = null
    try {
      config.value = await storefrontApi.updateStorefrontConfig(updates)
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  return {
    config,
    plans,
    publicPlans,
    loading,
    error,
    isOnline,
    activePlans,
    storeDisplayName,
    loadConfig,
    loadPublicPlans,
    updateConfig,
  }
})
