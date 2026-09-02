<script setup>
/**
 * TearDivider — the dashed perforation line used as a section divider.
 * Ties back to the physical voucher ticket motif.
 */
defineProps({
  label: { type: String, default: '' },
})
</script>

<template>
  <div class="relative my-6">
    <hr class="tear-divider" />
    <span
      v-if="label"
      class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-ink-navy px-3 text-xs text-slate uppercase tracking-wider font-body"
    >
      {{ label }}
    </span>
  </div>
</template>
