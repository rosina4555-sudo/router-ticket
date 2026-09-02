<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { orders as ordersApi } from '../../api'
import TicketCard from '../../components/shared/TicketCard.vue'

const route = useRoute()
const router = useRouter()

const reference = ref('')
const loading = ref(false)
const error = ref('')
const order = ref(null)
const searched = ref(false)

// Pre-fill from query param (e.g. /store/lookup?ref=PSK-xxx)
onMounted(() => {
  if (route.query.ref) {
    reference.value = route.query.ref
    handleLookup()
  }
})

async function handleLookup() {
  const ref = reference.value.trim()
  if (!ref || loading.value) return

  loading.value = true
  error.value = ''
  order.value = null
  searched.value = true

  try {
    order.value = await ordersApi.lookupOrderByReference(ref)
  } catch (err) {
    error.value = err.message || 'No purchase found for this reference.'
  } finally {
    loading.value = false
  }
}

function formatDate(dateStr) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>

<template>
  <div class="space-y-6">
    <!-- Back link -->
    <button
      @click="router.push('/store')"
      class="text-sm text-slate hover:text-ink-navy font-body transition-colors flex items-center gap-1"
    >
      ← Back to plans
    </button>

    <!-- Header -->
    <div class="text-center py-2">
      <h2 class="font-display text-xl font-bold text-ink-navy">Find My Voucher</h2>
      <p class="text-sm text-slate font-body mt-1">
        Enter the Paystack transaction reference from your SMS receipt
      </p>
    </div>

    <!-- Search form -->
    <div class="bg-white rounded-xl p-5 border border-slate/15 space-y-4">
      <div>
        <label class="block text-xs text-slate font-body mb-1.5 uppercase tracking-wider">
          Paystack Reference
        </label>
        <input
          v-model="reference"
          type="text"
          placeholder="PSK-20260302-001"
          class="w-full bg-cloud-white border border-slate/20 rounded-lg px-4 py-3 text-sm text-ink-navy font-mono focus:outline-none focus:border-signal-teal transition-colors"
          @keyup.enter="handleLookup"
        />
      </div>

      <button
        @click="handleLookup"
        :disabled="!reference.trim() || loading"
        class="w-full py-3 bg-signal-teal text-ink-navy rounded-lg text-sm font-semibold font-body hover:bg-signal-teal/90 transition-colors disabled:opacity-50 active:scale-[0.98]"
      >
        {{ loading ? 'Looking up…' : 'Find my purchase' }}
      </button>
    </div>

    <!-- Error state -->
    <div
      v-if="error"
      class="bg-white rounded-xl p-5 border border-slate/15 text-center"
    >
      <div class="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-3">
        <span class="text-xl">✕</span>
      </div>
      <p class="text-sm text-slate font-body">{{ error }}</p>
      <p class="text-xs text-slate/70 font-body mt-2">
        Double-check the reference from your SMS and try again.
      </p>
    </div>

    <!-- Result -->
    <template v-if="order">
      <div class="text-center">
        <div class="w-12 h-12 rounded-full bg-signal-teal/15 flex items-center justify-center mx-auto mb-3">
          <span class="text-xl text-signal-teal">✓</span>
        </div>
        <p class="text-sm text-slate font-body mb-4">Purchase found!</p>
      </div>

      <TicketCard>
        <div class="text-center space-y-2">
          <!-- Plan info -->
          <p class="font-display text-2xl font-bold text-ink-navy">
            {{ order.plan?.dataAmount || '—' }}
          </p>
          <p class="text-sm text-slate font-body">
            {{ order.plan?.name }} · {{ order.plan?.duration }}
          </p>

          <!-- Amount paid -->
          <p class="font-display text-lg font-bold text-ticket-amber tabular-nums">
            {{ order.currency }}{{ order.amount.toFixed(2) }}
          </p>
        </div>

        <template #cta>
          <div class="space-y-3">
            <!-- Voucher code -->
            <div class="text-center">
              <p class="text-xs text-slate font-body uppercase tracking-wider mb-1">Your voucher code</p>
              <p class="font-mono text-lg font-semibold text-signal-teal tracking-wider">
                {{ order.voucherCode }}
              </p>
            </div>

            <!-- Reference -->
            <p class="text-center text-xs text-slate/60 font-mono">
              Ref: {{ order.paystackReference }}
            </p>
          </div>
        </template>
      </TicketCard>

      <!-- Usage instructions -->
      <div class="bg-white rounded-xl p-5 border border-slate/15">
        <h4 class="font-display text-sm font-semibold text-ink-navy mb-2">How to use</h4>
        <ol class="text-sm text-slate font-body space-y-1.5 list-decimal list-inside">
          <li>Connect to the <strong>Asante Hotspot</strong> Wi-Fi network</li>
          <li>The login page will open automatically</li>
          <li>Enter the voucher code above</li>
          <li>Tap <strong>Connect</strong> — you're online!</li>
        </ol>
      </div>

      <!-- Meta -->
      <p class="text-center text-xs text-slate/60 font-body">
        Purchased {{ formatDate(order.createdAt) }}
      </p>
    </template>

    <!-- Empty state after search (no result, no error — handled by error block) -->
  </div>
</template>
