<script setup>
import { RouterLink } from 'vue-router'
import { useStorefrontStore } from '../../stores/storefront'

const store = useStorefrontStore()
</script>

<template>
  <footer class="bg-white border-t border-slate/10 mt-auto">
    <div class="max-w-lg mx-auto px-4 sm:px-6 py-8">
      <!-- Links -->
      <div class="grid grid-cols-2 gap-6 mb-6">
        <div>
          <h4 class="font-display text-[11px] font-semibold text-ink-navy uppercase tracking-wider mb-3">Help</h4>
          <ul class="space-y-2 text-sm font-body">
            <li>
              <RouterLink to="/store/lookup" class="text-slate hover:text-signal-teal transition-colors">
                Find my voucher
              </RouterLink>
            </li>
            <li>
              <a href="#how-it-works" class="text-slate hover:text-signal-teal transition-colors">
                How it works
              </a>
            </li>
            <li>
              <a href="#faq" class="text-slate hover:text-signal-teal transition-colors">
                FAQ
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 class="font-display text-[11px] font-semibold text-ink-navy uppercase tracking-wider mb-3">Contact</h4>
          <ul class="space-y-2 text-sm font-body">
            <li v-if="store.config?.contactPhone">
              <a :href="`tel:${store.config.contactPhone.replace(/\s/g, '')}`" class="text-slate hover:text-signal-teal transition-colors">
                {{ store.config.contactPhone }}
              </a>
            </li>
            <li v-if="store.config?.location" class="text-slate text-xs">
              {{ store.config.location }}
            </li>
          </ul>
        </div>
      </div>

      <!-- Color strip accent -->
      <div class="flex gap-1 mb-6">
        <span class="h-0.5 flex-1 rounded-full bg-signal-teal" />
        <span class="h-0.5 flex-1 rounded-full bg-ticket-amber" />
        <span class="h-0.5 flex-1 rounded-full bg-signal-teal" />
      </div>

      <!-- How it works -->
      <div id="how-it-works" class="mb-6">
        <h4 class="font-display text-[11px] font-semibold text-ink-navy uppercase tracking-wider mb-3">How it works</h4>
        <ol class="text-sm text-slate font-body space-y-1.5 list-decimal list-inside">
          <li>Choose a data plan</li>
          <li>Pay with Mobile Money</li>
          <li>Receive your voucher code via SMS</li>
          <li>Connect to the hotspot and enter your code</li>
        </ol>
      </div>

      <!-- Payment methods -->
      <div class="mb-6">
        <p class="text-[11px] text-slate/50 font-body uppercase tracking-wider mb-2">Payments</p>
        <div class="flex items-center gap-2">
          <span class="px-2.5 py-1 bg-cloud-white rounded text-xs text-slate font-body">MTN MoMo</span>
          <span class="px-2.5 py-1 bg-cloud-white rounded text-xs text-slate font-body">Vodafone Cash</span>
          <span class="px-2.5 py-1 bg-cloud-white rounded text-xs text-slate font-body">AirtelTigo</span>
        </div>
      </div>

      <!-- Bottom -->
      <div class="border-t border-slate/10 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <p class="text-xs text-slate/50 font-body">
          © {{ new Date().getFullYear() }} {{ store.storeDisplayName }}
        </p>
        <p class="text-[10px] text-slate/40 font-body">
          Powered by RouterTicket
        </p>
      </div>
    </div>
  </footer>
</template>
