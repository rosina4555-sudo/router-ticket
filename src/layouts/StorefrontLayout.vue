<script setup>
import { RouterView, RouterLink, useRoute } from 'vue-router'
import { useStorefrontStore } from '../stores/storefront'
import { onMounted } from 'vue'

const route = useRoute()
const store = useStorefrontStore()

onMounted(() => {
  if (!store.config) store.loadConfig()
})
</script>

<template>
  <div class="min-h-screen bg-cloud-white">
    <!-- Top bar -->
    <header class="bg-white border-b border-slate/20 px-4 py-3 sm:px-6">
      <div class="max-w-lg mx-auto flex items-center justify-between">
        <RouterLink to="/store" class="font-display text-lg font-bold text-ink-navy hover:text-signal-teal transition-colors">
          {{ store.storeDisplayName }}
        </RouterLink>
        <nav class="flex items-center gap-3">
          <RouterLink
            v-if="route.name !== 'store-lookup'"
            to="/store/lookup"
            class="text-xs text-slate hover:text-ink-navy font-body transition-colors border border-slate/20 rounded-full px-3 py-1"
          >
            Find my voucher
          </RouterLink>
          <span class="flex items-center gap-1.5 text-sm text-signal-teal">
            <span class="inline-block w-2 h-2 rounded-full bg-signal-teal animate-pulse"></span>
            Online
          </span>
        </nav>
      </div>
    </header>

    <!-- Page content -->
    <main class="max-w-lg mx-auto px-4 py-6 sm:px-6">
      <RouterView />
    </main>
  </div>
</template>
