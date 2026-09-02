<script setup>
import { onMounted, ref } from 'vue'
import { payouts as payoutsApi } from '../../api'

const payouts = ref([])
const loading = ref(true)
const requesting = ref(false)
const requestAmount = ref('')
const requestMethod = ref('momo')

onMounted(async () => {
  try {
    payouts.value = await payoutsApi.fetchPayouts()
  } finally {
    loading.value = false
  }
})

async function handleRequestPayout() {
  if (!requestAmount.value || requesting.value) return
  requesting.value = true
  try {
    const payout = await payoutsApi.requestPayout(parseFloat(requestAmount.value), requestMethod.value)
    payouts.value.unshift(payout)
    requestAmount.value = ''
  } finally {
    requesting.value = false
  }
}

function formatDate(dateStr) {
  if (!dateStr) return 'Pending'
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
</script>

<template>
  <div class="space-y-6 min-w-0">
    <h3 class="font-display text-xl font-bold text-white">Payouts</h3>

    <!-- Request payout form -->
    <div class="bg-indigo-deep rounded-xl p-4 sm:p-6 border border-white/5">
      <h4 class="font-display text-base font-semibold text-white/80 mb-4">Request Payout</h4>
      <div class="flex flex-col sm:flex-row sm:items-end gap-3">
        <div class="flex-1 min-w-0">
          <label class="block text-xs text-slate font-body mb-1.5 uppercase tracking-wider">Amount (GHS)</label>
          <input
            v-model="requestAmount"
            type="number"
            min="1"
            placeholder="0.00"
            class="w-full bg-ink-navy border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white font-body tabular-nums focus:outline-none focus:border-signal-teal transition-colors"
          />
        </div>
        <div class="w-full sm:w-32">
          <label class="block text-xs text-slate font-body mb-1.5 uppercase tracking-wider">Method</label>
          <select
            v-model="requestMethod"
            class="w-full bg-ink-navy border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white font-body focus:outline-none focus:border-signal-teal transition-colors"
          >
            <option value="momo">MoMo</option>
            <option value="bank">Bank</option>
          </select>
        </div>
        <button
          @click="handleRequestPayout"
          :disabled="!requestAmount || requesting"
          class="w-full sm:w-auto px-5 py-2.5 bg-signal-teal text-ink-navy rounded-lg text-sm font-semibold font-body hover:bg-signal-teal/90 transition-colors disabled:opacity-50 shrink-0"
        >
          {{ requesting ? 'Processing…' : 'Request' }}
        </button>
      </div>
    </div>

    <!-- Payout history — scrollable on mobile -->
    <div class="bg-indigo-deep rounded-xl border border-white/5 overflow-hidden">
      <div class="px-4 sm:px-5 py-3 border-b border-white/5">
        <h4 class="font-display text-sm font-semibold text-white/80">History</h4>
      </div>

      <div v-if="loading" class="text-slate text-sm py-8 text-center font-body">
        Loading…
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full text-sm font-body min-w-[520px]">
          <thead>
            <tr class="border-b border-white/5">
              <th class="text-left px-4 sm:px-5 py-2.5 text-slate font-medium text-xs uppercase tracking-wider">Date</th>
              <th class="text-left px-4 sm:px-5 py-2.5 text-slate font-medium text-xs uppercase tracking-wider">Method</th>
              <th class="text-left px-4 sm:px-5 py-2.5 text-slate font-medium text-xs uppercase tracking-wider">Reference</th>
              <th class="text-left px-4 sm:px-5 py-2.5 text-slate font-medium text-xs uppercase tracking-wider">Status</th>
              <th class="text-right px-4 sm:px-5 py-2.5 text-slate font-medium text-xs uppercase tracking-wider">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="payout in payouts"
              :key="payout.id"
              class="border-b border-white/5 last:border-0"
            >
              <td class="px-4 sm:px-5 py-3 text-white/70 whitespace-nowrap">{{ formatDate(payout.processedAt) }}</td>
              <td class="px-4 sm:px-5 py-3 text-white capitalize">{{ payout.method }}</td>
              <td class="px-4 sm:px-5 py-3 text-white/50 font-mono text-xs">{{ payout.reference }}</td>
              <td class="px-4 sm:px-5 py-3">
                <span
                  :class="[
                    'px-2 py-0.5 rounded-full text-xs font-medium',
                    payout.status === 'completed'
                      ? 'bg-signal-teal/15 text-signal-teal'
                      : 'bg-ticket-amber/15 text-ticket-amber',
                  ]"
                >
                  {{ payout.status }}
                </span>
              </td>
              <td class="px-4 sm:px-5 py-3 text-white font-semibold text-right tabular-nums whitespace-nowrap">
                {{ payout.currency }}{{ payout.amount.toFixed(2) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
