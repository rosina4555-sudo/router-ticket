<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStorefrontStore } from '../../stores/storefront'
import TicketCard from '../../components/shared/TicketCard.vue'

const router = useRouter()
const store = useStorefrontStore()

onMounted(() => {
  if (!store.publicPlans.length) store.loadPublicPlans()
})

function buyPlan(planId) {
  router.push(`/store/checkout/${planId}`)
}
</script>

<template>
  <div class="space-y-6">
    <!-- Store header -->
    <div class="text-center py-4">
      <h2 class="font-display text-2xl font-bold text-ink-navy">
        {{ store.storeDisplayName }}
      </h2>
      <p v-if="store.config" class="text-sm text-slate font-body mt-1">
        {{ store.config.tagline }}
      </p>
    </div>

    <!-- Loading -->
    <div v-if="store.loading" class="text-slate text-sm py-8 text-center font-body">
      Loading plans…
    </div>

    <!-- Plans grid -->
    <div v-else class="space-y-4">
      <TicketCard
        v-for="plan in store.publicPlans"
        :key="plan.id"
        :variant="plan.price <= 10 ? 'highlight' : 'default'"
      >
        <!-- Plan info (above perforation) -->
        <div class="flex items-center justify-between">
          <div>
            <p class="font-display text-lg font-bold text-ink-navy">
              {{ plan.dataAmount }}
            </p>
            <p class="text-sm text-slate font-body">{{ plan.duration }}</p>
          </div>
          <p class="font-display text-xl font-bold text-ticket-amber tabular-nums">
            {{ plan.currency }}{{ plan.price.toFixed(0) }}
          </p>
        </div>

        <!-- CTA (below perforation) -->
        <template #cta>
          <button
            @click="buyPlan(plan.id)"
            class="w-full py-2.5 rounded-lg text-sm font-semibold font-body transition-colors
              bg-signal-teal text-ink-navy hover:bg-signal-teal/90 active:scale-[0.98]"
          >
            Buy now
          </button>
        </template>
      </TicketCard>
    </div>

    <!-- Footer info -->
    <p class="text-center text-xs text-slate font-body py-4">
      Payments via Mobile Money · Instant voucher delivery
    </p>
  </div>
</template>
