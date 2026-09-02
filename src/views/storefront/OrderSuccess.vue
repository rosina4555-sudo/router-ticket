<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const voucherCode = computed(() => route.query.code || 'RTK-XXXX-XXXX')
const planName = computed(() => route.query.plan || 'your plan')

const copied = ref(false)

async function copyCode() {
  try {
    await navigator.clipboard.writeText(voucherCode.value)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  } catch {
    // Fallback for older browsers
    const el = document.createElement('textarea')
    el.value = voucherCode.value
    el.select()
    document.execCommand('copy')
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  }
}
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

      <!-- Copy button -->
      <button
        @click="copyCode"
        :class="[
          'inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium font-body transition-all',
          copied
            ? 'bg-signal-teal/15 text-signal-teal'
            : 'bg-cloud-white border border-slate/15 text-slate hover:text-ink-navy hover:border-slate/30',
        ]"
      >
        <svg v-if="!copied" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <rect x="9" y="9" width="13" height="13" rx="2" />
          <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
        </svg>
        <svg v-else class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        {{ copied ? 'Copied!' : 'Copy code' }}
      </button>

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
