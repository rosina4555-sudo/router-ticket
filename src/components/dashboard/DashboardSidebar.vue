<script setup>
import { useRoute, useRouter } from 'vue-router'
import { watch } from 'vue'

const props = defineProps({
  open: { type: Boolean, default: false },
})

const emit = defineEmits(['close'])

const route = useRoute()
const router = useRouter()

const navItems = [
  { name: 'Overview', path: '/dashboard', icon: '📊' },
  { name: 'Batches', path: '/dashboard/batches', icon: '🎫' },
  { name: 'Storefront', path: '/dashboard/storefront', icon: '🏪' },
  { name: 'Payouts', path: '/dashboard/payouts', icon: '💰' },
]

function isActive(itemPath) {
  if (itemPath === '/dashboard') {
    return route.path === '/dashboard'
  }
  return route.path.startsWith(itemPath)
}

function navigateTo(path) {
  router.push(path)
  emit('close')
}

// Close sidebar on route change (mobile)
watch(() => route.path, () => emit('close'))
</script>

<template>
  <!-- Mobile backdrop -->
  <Transition name="fade">
    <div
      v-if="open"
      class="fixed inset-0 bg-black/50 z-40 md:hidden"
      @click="emit('close')"
    />
  </Transition>

  <!-- Sidebar -->
  <aside
    :class="[
      // Mobile: fixed overlay that slides in from left
      'fixed inset-y-0 left-0 z-50 w-64 flex flex-col bg-indigo-deep border-r border-white/5 transform transition-transform duration-200 ease-out',
      // Desktop: static, always visible
      'md:static md:translate-x-0',
      open ? 'translate-x-0' : '-translate-x-full',
    ]"
  >
    <!-- Brand -->
    <div class="px-5 py-5 border-b border-white/5 flex items-center justify-between">
      <h1 class="font-display text-lg font-bold text-white flex items-center gap-2">
        <span class="text-signal-teal">⚡</span>
        RouterTicket
      </h1>
      <!-- Close button (mobile only) -->
      <button
        @click="emit('close')"
        class="md:hidden w-8 h-8 flex items-center justify-center rounded-lg text-slate hover:text-white hover:bg-white/10 transition-colors"
        aria-label="Close menu"
      >
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 px-3 py-4 space-y-1">
      <button
        v-for="item in navItems"
        :key="item.path"
        @click="navigateTo(item.path)"
        :class="[
          'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left',
          isActive(item.path)
            ? 'bg-signal-teal/15 text-signal-teal'
            : 'text-slate hover:text-white hover:bg-white/5',
        ]"
      >
        <span class="text-base">{{ item.icon }}</span>
        {{ item.name }}
      </button>
    </nav>

    <!-- Bottom section -->
    <div class="px-3 py-4 border-t border-white/5">
      <button
        @click="navigateTo('/store')"
        class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate hover:text-white hover:bg-white/5 transition-colors text-left"
      >
        <span class="text-base">🌐</span>
        View Storefront
      </button>
    </div>
  </aside>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
