<script setup>
import { onMounted, ref } from 'vue'
import { useStorefrontStore } from '../../stores/storefront'
import SignalBars from '../../components/shared/SignalBars.vue'

const store = useStorefrontStore()
const saving = ref(false)
const saveMessage = ref('')

onMounted(() => {
  if (!store.config) store.loadConfig()
})

async function toggleStoreStatus() {
  const newStatus = store.isOnline ? 'offline' : 'online'
  await store.updateConfig({ status: newStatus })
}

async function handleSave() {
  saving.value = true
  saveMessage.value = ''
  // In a real app, this would PUT to the API
  await new Promise(r => setTimeout(r, 500))
  saving.value = false
  saveMessage.value = 'Settings saved!'
  setTimeout(() => { saveMessage.value = '' }, 3000)
}
</script>

<template>
  <div class="space-y-6 min-w-0">
    <h3 class="font-display text-xl font-bold text-white">Storefront Settings</h3>

    <div v-if="store.loading" class="text-slate text-sm py-8 text-center font-body">
      Loading settings…
    </div>

    <template v-else-if="store.config">
      <!-- Store status card -->
      <div class="bg-indigo-deep rounded-xl p-4 sm:p-6 border border-white/5">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div class="flex items-center gap-4">
            <SignalBars
              :level="store.isOnline ? 4 : 0"
              size="md"
              :active="store.isOnline"
            />
            <div>
              <h4 class="font-display text-base font-semibold text-white">
                {{ store.config.storeName }}
              </h4>
              <p class="text-xs text-slate font-body">{{ store.config.location }}</p>
            </div>
          </div>
          <button
            @click="toggleStoreStatus"
            :class="[
              'px-4 py-2 rounded-lg text-sm font-medium font-body transition-colors',
              store.isOnline
                ? 'bg-red-400/15 text-red-400 hover:bg-red-400/25'
                : 'bg-signal-teal/15 text-signal-teal hover:bg-signal-teal/25',
            ]"
          >
            {{ store.isOnline ? 'Take Offline' : 'Go Online' }}
          </button>
        </div>
      </div>

      <!-- Settings form -->
      <div class="bg-indigo-deep rounded-xl p-4 sm:p-6 border border-white/5 space-y-5">
        <h4 class="font-display text-base font-semibold text-white/80">Store Details</h4>

        <div class="space-y-4">
          <div>
            <label class="block text-xs text-slate font-body mb-1.5 uppercase tracking-wider">Store Name</label>
            <input
              v-model="store.config.storeName"
              class="w-full bg-ink-navy border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white font-body focus:outline-none focus:border-signal-teal transition-colors"
            />
          </div>

          <div>
            <label class="block text-xs text-slate font-body mb-1.5 uppercase tracking-wider">Tagline</label>
            <input
              v-model="store.config.tagline"
              class="w-full bg-ink-navy border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white font-body focus:outline-none focus:border-signal-teal transition-colors"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs text-slate font-body mb-1.5 uppercase tracking-wider">Contact Phone</label>
              <input
                v-model="store.config.contactPhone"
                class="w-full bg-ink-navy border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white font-body focus:outline-none focus:border-signal-teal transition-colors"
              />
            </div>
            <div>
              <label class="block text-xs text-slate font-body mb-1.5 uppercase tracking-wider">Location</label>
              <input
                v-model="store.config.location"
                class="w-full bg-ink-navy border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white font-body focus:outline-none focus:border-signal-teal transition-colors"
              />
            </div>
          </div>
        </div>

        <!-- Save button -->
        <div class="flex items-center gap-3 pt-2">
          <button
            @click="handleSave"
            :disabled="saving"
            class="px-5 py-2.5 bg-signal-teal text-ink-navy rounded-lg text-sm font-semibold font-body hover:bg-signal-teal/90 transition-colors disabled:opacity-50"
          >
            {{ saving ? 'Saving…' : 'Save Changes' }}
          </button>
          <span v-if="saveMessage" class="text-sm text-signal-teal font-body">{{ saveMessage }}</span>
        </div>
      </div>

      <!-- Active Plans -->
      <div class="bg-indigo-deep rounded-xl p-4 sm:p-6 border border-white/5">
        <h4 class="font-display text-base font-semibold text-white/80 mb-4">Active Plans</h4>
        <div class="space-y-2">
          <div
            v-for="plan in store.activePlans"
            :key="plan.id"
            class="flex items-center justify-between bg-ink-navy/60 rounded-lg px-4 py-3"
          >
            <div>
              <span class="text-sm text-white font-body">{{ plan.name }}</span>
              <span class="text-xs text-slate ml-2 font-body">{{ plan.dataAmount }} · {{ plan.duration }}</span>
            </div>
            <span class="font-display text-sm font-semibold text-ticket-amber tabular-nums">
              {{ plan.currency }}{{ plan.price.toFixed(2) }}
            </span>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
