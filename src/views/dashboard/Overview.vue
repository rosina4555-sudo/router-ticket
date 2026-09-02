<script setup>
import { onMounted } from 'vue'
import { useAnalyticsStore } from '../../stores/analytics'
import { useBatchesStore } from '../../stores/batches'
import StatCard from '../../components/shared/StatCard.vue'
import TearDivider from '../../components/shared/TearDivider.vue'

const analytics = useAnalyticsStore()
const batches = useBatchesStore()

onMounted(() => {
  analytics.loadStats()
  analytics.loadRecentSales(5)
  batches.loadBatches()
})

function formatCurrency(amount, currency = 'GHS') {
  return `${currency}${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`
}

function formatTime(dateStr) {
  if (!dateStr) return '—'
  const date = new Date(dateStr)
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
}
</script>

<template>
  <div class="space-y-6 min-w-0">
    <!-- Loading state -->
    <div v-if="analytics.loading" class="text-slate text-sm py-8 text-center font-body">
      Loading dashboard…
    </div>

    <template v-else-if="analytics.stats">
      <!-- Today's headline stats -->
      <div>
        <h3 class="font-display text-base font-semibold text-white/80 mb-4">Today</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <StatCard
            :value="analytics.stats.today.sold"
            label="Vouchers Sold"
            icon="🎫"
            color="teal"
          />
          <StatCard
            :value="formatCurrency(analytics.stats.today.revenue)"
            label="Revenue"
            icon="💰"
            color="amber"
          />
          <StatCard
            :value="analytics.stats.today.newCustomers"
            label="New Customers"
            icon="👤"
            color="white"
          />
          <StatCard
            :value="analytics.stats.totalStock"
            label="Stock Remaining"
            icon="📦"
            color="teal"
          />
        </div>
      </div>

      <!-- Store health -->
      <div class="bg-indigo-deep rounded-xl p-4 sm:p-5 border border-white/5">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <p class="text-slate text-sm font-body mb-1">Store Uptime</p>
            <p class="font-display text-2xl font-bold text-signal-teal tabular-nums">
              {{ analytics.stats.storeUptime }}%
            </p>
          </div>
          <div class="flex items-center gap-1">
            <span class="text-slate text-xs font-body">This week:</span>
            <span class="font-display text-sm font-semibold text-white tabular-nums">
              {{ analytics.stats.week.sold }} sold
            </span>
          </div>
        </div>
      </div>

      <TearDivider label="Recent Sales" />

      <!-- Recent sales table — scrollable on mobile -->
      <div class="bg-indigo-deep rounded-xl border border-white/5 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-sm font-body min-w-[480px]">
            <thead>
              <tr class="border-b border-white/5">
                <th class="text-left px-4 sm:px-5 py-3 text-slate font-medium text-xs uppercase tracking-wider">Time</th>
                <th class="text-left px-4 sm:px-5 py-3 text-slate font-medium text-xs uppercase tracking-wider">Plan</th>
                <th class="text-left px-4 sm:px-5 py-3 text-slate font-medium text-xs uppercase tracking-wider">Code</th>
                <th class="text-right px-4 sm:px-5 py-3 text-slate font-medium text-xs uppercase tracking-wider">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="sale in analytics.recentSales"
                :key="sale.id"
                class="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors"
              >
                <td class="px-4 sm:px-5 py-3 text-white/70 tabular-nums whitespace-nowrap">{{ formatTime(sale.createdAt) }}</td>
                <td class="px-4 sm:px-5 py-3 text-white whitespace-nowrap">{{ sale.planId }}</td>
                <td class="px-4 sm:px-5 py-3 text-signal-teal font-mono text-xs">{{ sale.voucherCode }}</td>
                <td class="px-4 sm:px-5 py-3 text-ticket-amber font-semibold text-right tabular-nums whitespace-nowrap">
                  {{ formatCurrency(sale.amount) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>
  </div>
</template>
