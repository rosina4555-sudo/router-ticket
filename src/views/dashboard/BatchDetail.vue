<script setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBatchesStore } from '../../stores/batches'

const route = useRoute()
const router = useRouter()
const batchStore = useBatchesStore()

onMounted(() => {
  batchStore.loadBatch(route.params.id)
})

function formatDate(dateStr) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>

<template>
  <div class="space-y-6 min-w-0">
    <!-- Back button -->
    <button
      @click="router.push('/dashboard/batches')"
      class="text-sm text-slate hover:text-white font-body transition-colors flex items-center gap-1"
    >
      ← Back to Batches
    </button>

    <div v-if="batchStore.loading" class="text-slate text-sm py-8 text-center font-body">
      Loading batch…
    </div>

    <template v-else-if="batchStore.currentBatch">
      <!-- Batch header -->
      <div class="bg-indigo-deep rounded-xl p-4 sm:p-6 border border-white/5">
        <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
          <div>
            <h3 class="font-display text-lg sm:text-xl font-bold text-white">
              {{ batchStore.currentBatch.name }}
            </h3>
            <p class="text-sm text-slate font-body mt-1">
              {{ batchStore.currentBatch.totalVouchers }} total vouchers ·
              <span class="text-signal-teal">{{ batchStore.currentBatch.activeCount }} active</span> ·
              <span class="text-ticket-amber">{{ batchStore.currentBatch.soldCount }} sold</span>
            </p>
          </div>
          <span class="font-mono text-xs text-white/40 shrink-0">
            {{ batchStore.currentBatch.prefix }}-{{ batchStore.currentBatch.id.split('-')[1] }}
          </span>
        </div>
      </div>

      <!-- Voucher list — scrollable on mobile -->
      <div class="bg-indigo-deep rounded-xl border border-white/5 overflow-hidden">
        <div class="px-4 sm:px-5 py-3 border-b border-white/5">
          <h4 class="font-display text-sm font-semibold text-white/80">Vouchers</h4>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-sm font-body min-w-[420px]">
            <thead>
              <tr class="border-b border-white/5">
                <th class="text-left px-4 sm:px-5 py-2.5 text-slate font-medium text-xs uppercase tracking-wider">Code</th>
                <th class="text-left px-4 sm:px-5 py-2.5 text-slate font-medium text-xs uppercase tracking-wider">Status</th>
                <th class="text-left px-4 sm:px-5 py-2.5 text-slate font-medium text-xs uppercase tracking-wider">Sold At</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="voucher in batchStore.vouchers"
                :key="voucher.id"
                class="border-b border-white/5 last:border-0"
              >
                <td class="px-4 sm:px-5 py-3 text-signal-teal font-mono text-xs">{{ voucher.code }}</td>
                <td class="px-4 sm:px-5 py-3">
                  <span
                    :class="[
                      'px-2 py-0.5 rounded-full text-xs font-medium',
                      voucher.status === 'active'
                        ? 'bg-signal-teal/15 text-signal-teal'
                        : 'bg-slate/15 text-slate',
                    ]"
                  >
                    {{ voucher.status }}
                  </span>
                </td>
                <td class="px-4 sm:px-5 py-3 text-white/50 text-xs whitespace-nowrap">{{ formatDate(voucher.soldAt) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>
  </div>
</template>
