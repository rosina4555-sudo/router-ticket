<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const voucherCode = computed(() => route.query.code || 'RTK-XXXX-XXXX')
const planName = computed(() => route.query.plan || 'your plan')
</script>

<template>
  <div class="text-center py-8 space-y-6">
    <!-- Success checkmark -->
    <div class="w-16 h-16 rounded-full bg-signal-teal/15 flex items-center justify-center mx-auto">
      <span class="text-3xl">✓</span>
    </div>

    <div>
      <h2 class="font-display text-xl font-bold text-ink-navy">Payment Successful!</h2>
      <p class="text-sm text-slate font-body mt-1">
        Your {{ planName }} voucher is ready
      </p>
    </div>

    <!-- Voucher code card -->
    <div class="bg-white rounded-xl p-6 border-2 border-signal-teal/20 space-y-3">
      <p class="text-xs text-slate font-body uppercase tracking-wider">Your voucher code</p>
      <p class="font-mono text-2xl font-semibold text-signal-teal tracking-wider">
        {{ voucherCode }}
      </p>
      <p class="text-xs text-slate font-body">
        Enter this code on your MikroTik hotspot login page
      </p>
    </div>

    <!-- Actions -->
    <div class="space-y-3 pt-4">
      <button
        @click="router.push('/store')"
        class="w-full py-3 bg-signal-teal text-ink-navy rounded-lg text-sm font-semibold font-body hover:bg-signal-teal/90 transition-colors active:scale-[0.98]"
      >
        Buy another plan
      </button>
      <p class="text-xs text-slate font-body">
        This code has also been sent to your phone via SMS
      </p>
    </div>
  </div>
</template>
