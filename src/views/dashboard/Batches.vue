<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useBatchesStore } from '../../stores/batches'
import { useStorefrontStore } from '../../stores/storefront'
import SignalBars from '../../components/shared/SignalBars.vue'

const router = useRouter()
const batchStore = useBatchesStore()
const storefrontStore = useStorefrontStore()

onMounted(() => {
  batchStore.loadBatches()
  storefrontStore.loadConfig()
})

function getPlanName(planId) {
  const plan = storefrontStore.plans.find(p => p.id === planId)
  return plan ? plan.name : planId
}

function stockPercentage(batch) {
  return Math.round((batch.activeCount / batch.totalVouchers) * 100)
}

function stockLevel(batch) {
  const pct = stockPercentage(batch)
  if (pct > 50) return 4
  if (pct > 25) return 3
  if (pct > 10) return 2
  return 1
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
</script>

<template>
  <div class="space-y-6 min-w-0">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
      <h3 class="font-display text-xl font-bold text-white">Voucher Batches</h3>
      <span class="text-sm text-slate font-body">
        {{ batchStore.activeBatches.length }} active batches
      </span>
    </div>

    <!-- Loading -->
    <div v-if="batchStore.loading" class="text-slate text-sm py-8 text-center font-body">
      Loading batches…
    </div>

    <!-- Batch grid -->
    <div v-else class="grid gap-4 md:grid-cols-2">
      <button
        v-for="batch in batchStore.batches"
        :key="batch.id"
        @click="router.push(`/dashboard/batches/${batch.id}`)"
        class="bg-indigo-deep rounded-xl p-5 border border-white/5 text-left hover:border-signal-teal/30 transition-all group"
      >
        <!-- Header row -->
        <div class="flex items-start justify-between mb-3">
          <div>
            <h4 class="font-display text-base font-semibold text-white group-hover:text-signal-teal transition-colors">
              {{ batch.name }}
            </h4>
            <p class="text-xs text-slate font-body mt-0.5">
              {{ getPlanName(batch.planId) }}
            </p>
          </div>
          <span
            :class="[
              'px-2 py-0.5 rounded-full text-xs font-medium font-body',
              batch.status === 'active'
                ? 'bg-signal-teal/15 text-signal-teal'
                : 'bg-slate/15 text-slate',
            ]"
          >
            {{ batch.status }}
          </span>
        </div>

        <!-- Stock bar -->
        <div class="mt-3">
          <div class="flex items-center justify-between mb-1.5">
            <div class="flex items-center gap-2">
              <SignalBars
                :level="batch.status === 'depleted' ? 0 : stockLevel(batch)"
                size="sm"
                :active="batch.status === 'active'"
              />
              <span class="text-xs text-slate font-body">Stock</span>
            </div>
            <span class="text-xs text-white/70 font-mono tabular-nums">
              {{ batch.activeCount }} / {{ batch.totalVouchers }}
            </span>
          </div>
          <div class="h-1.5 bg-ink-navy rounded-full overflow-hidden">
            <div
              :class="[
                'h-full rounded-full transition-all',
                stockPercentage(batch) > 50 ? 'bg-signal-teal' :
                stockPercentage(batch) > 20 ? 'bg-ticket-amber' : 'bg-red-400',
              ]"
              :style="{ width: stockPercentage(batch) + '%' }"
            />
          </div>
        </div>

        <!-- Meta row -->
        <div class="mt-3 flex items-center justify-between text-xs text-slate font-body">
          <span>Imported {{ formatDate(batch.importedAt) }}</span>
          <span class="font-mono text-white/50">{{ batch.prefix }}-{{ batch.id.split('-')[1] }}</span>
        </div>
      </button>
    </div>
  </div>
</template>
