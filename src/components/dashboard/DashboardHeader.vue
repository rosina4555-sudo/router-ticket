<script setup>
import { useStorefrontStore } from '../../stores/storefront'
import SignalBars from '../shared/SignalBars.vue'
import { onMounted } from 'vue'

defineEmits(['toggle-sidebar'])

const store = useStorefrontStore()

onMounted(() => {
  if (!store.config) store.loadConfig()
})
</script>

<template>
  <header class="h-14 border-b border-white/5 bg-indigo-deep/50 backdrop-blur-sm px-4 sm:px-6 flex items-center justify-between">
    <div class="flex items-center gap-3">
      <!-- Panel-left toggle (mobile only) -->
      <button
        @click="$emit('toggle-sidebar')"
        class="md:hidden w-9 h-9 flex items-center justify-center rounded-lg text-slate hover:text-white hover:bg-white/10 transition-colors -ml-1"
        aria-label="Toggle menu"
      >
        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <line x1="9" y1="3" x2="9" y2="21" />
        </svg>
      </button>
      <h2 class="font-display text-sm font-semibold text-white/70">
        {{ $route.meta.title || 'Dashboard' }}
      </h2>
    </div>

    <!-- Store status -->
    <div class="flex items-center gap-3">
      <span class="hidden sm:inline text-xs text-slate font-body">Store:</span>
      <div class="flex items-center gap-2 bg-ink-navy/60 px-3 py-1.5 rounded-full">
        <SignalBars
          :level="store.isOnline ? 4 : 1"
          size="sm"
          :active="store.isOnline"
        />
        <span
          :class="[
            'text-xs font-medium font-body',
            store.isOnline ? 'text-signal-teal' : 'text-slate',
          ]"
        >
          {{ store.isOnline ? 'Online' : 'Offline' }}
        </span>
      </div>
    </div>
  </header>
</template>
