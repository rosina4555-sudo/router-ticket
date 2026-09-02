<script setup>
/**
 * TicketCard — the perforated/notched stub card from the design brief.
 *
 * Only used for things that *are* tickets: plans, vouchers, batches.
 * NOT for generic containers like settings or forms.
 *
 * Props:
 *   variant ('default' | 'highlight'): amber border for highlighted plan
 */
defineProps({
  variant: { type: String, default: 'default' },
})
</script>

<template>
  <div
    :class="[
      'relative bg-white rounded-xl border-2 shadow-sm overflow-hidden transition-all',
      variant === 'highlight'
        ? 'border-ticket-amber shadow-ticket-amber/10'
        : 'border-slate/15 hover:border-signal-teal/40',
    ]"
  >
    <!-- Top notch circles (perforation motif) -->
    <div class="absolute top-0 left-0 right-0 flex justify-between px-1 -translate-y-1/2 pointer-events-none">
      <span class="w-3 h-3 rounded-full bg-cloud-white border-2 border-inherit" :class="variant === 'highlight' ? 'border-ticket-amber' : 'border-slate/15'" />
      <span class="w-3 h-3 rounded-full bg-cloud-white border-2 border-inherit" :class="variant === 'highlight' ? 'border-ticket-amber' : 'border-slate/15'" />
    </div>

    <!-- Card content -->
    <div class="p-5 pt-4">
      <slot />
    </div>

    <!-- Perforation line -->
    <div class="mx-4 border-t-2 border-dashed border-slate/25" />

    <!-- Bottom section (CTA area) -->
    <div class="p-4 pt-3">
      <slot name="cta" />
    </div>
  </div>
</template>
