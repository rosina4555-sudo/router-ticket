<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStorefrontStore } from '../../stores/storefront'
import { orders as ordersApi } from '../../api'
import TicketCard from '../../components/shared/TicketCard.vue'

const route = useRoute()
const router = useRouter()
const store = useStorefrontStore()

const phone = ref('')
const processing = ref(false)
const error = ref('')

const plan = computed(() =>
  store.publicPlans.find(p => p.id === route.params.planId)
)

onMounted(async () => {
  if (!store.publicPlans.length) {
    await store.loadPublicPlans()
  }
  if (!plan.value) {
    error.value = 'Plan not found'
  }
})

async function handleCheckout() {
  if (!phone.value || processing.value) return
  processing.value = true
  error.value = ''

  try {
    const order = await ordersApi.createOrder(route.params.planId, phone.value)
    router.push({
      name: 'store-order-success',
      query: { code: order.voucherCode, plan: order.plan?.name },
    })
  } catch (err) {
    error.value = err.message || 'Something went wrong. Please try again.'
    processing.value = false
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Back button -->
    <button
      @click="router.push('/store')"
      class="text-sm text-slate hover:text-ink-navy font-body transition-colors flex items-center gap-1"
    >
      ← Back to plans
    </button>

    <!-- Error state -->
    <div v-if="error && !plan" class="text-center py-12">
      <p class="text-slate font-body">{{ error }}</p>
    </div>

    <template v-else-if="plan">
      <!-- Selected plan -->
      <TicketCard>
        <div class="text-center">
          <p class="font-display text-2xl font-bold text-ink-navy">
            {{ plan.dataAmount }}
          </p>
          <p class="text-sm text-slate font-body">{{ plan.duration }}</p>
          <p class="font-display text-xl font-bold text-ticket-amber tabular-nums mt-2">
            {{ plan.currency }}{{ plan.price.toFixed(2) }}
          </p>
        </div>
      </TicketCard>

      <!-- Phone number form -->
      <div class="bg-white rounded-xl p-5 border border-slate/15 space-y-4">
        <div>
          <label class="block text-xs text-slate font-body mb-1.5 uppercase tracking-wider">
            Phone Number (for voucher delivery)
          </label>
          <input
            v-model="phone"
            type="tel"
            placeholder="+233 24 000 0000"
            class="w-full bg-cloud-white border border-slate/20 rounded-lg px-4 py-3 text-sm text-ink-navy font-body focus:outline-none focus:border-signal-teal transition-colors"
          />
        </div>

        <div v-if="error" class="text-sm text-red-500 font-body">{{ error }}</div>

        <button
          @click="handleCheckout"
          :disabled="!phone || processing"
          class="w-full py-3 bg-signal-teal text-ink-navy rounded-lg text-sm font-semibold font-body hover:bg-signal-teal/90 transition-colors disabled:opacity-50 active:scale-[0.98]"
        >
          {{ processing ? 'Processing payment…' : `Pay ${plan.currency}${plan.price.toFixed(2)}` }}
        </button>

        <p class="text-center text-xs text-slate font-body">
          You'll receive your voucher code via SMS after payment
        </p>
      </div>
    </template>
  </div>
</template>
