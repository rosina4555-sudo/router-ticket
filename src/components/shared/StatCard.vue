<script setup>
/**
 * StatCard — big number + label, designed for dashboard metrics.
 *
 * The brief says: "Numbers are the hero, not hairline labels."
 * So the number gets Space Grotesk at heavy weight.
 *
 * Props:
 *   value (string|number): the hero number
 *   label (string): description below
 *   icon (string): optional icon emoji
 *   color ('teal' | 'amber' | 'white'): accent color for the number
 */
defineProps({
  value: { type: [String, Number], required: true },
  label: { type: String, required: true },
  icon: { type: String, default: '' },
  color: { type: String, default: 'teal' },
})

const colorClasses = {
  teal: 'text-signal-teal',
  amber: 'text-ticket-amber',
  white: 'text-white',
}
</script>

<template>
  <div class="bg-indigo-deep rounded-xl p-5 border border-white/5">
    <div class="flex items-start justify-between">
      <div>
        <p class="text-slate text-sm font-body mb-1">{{ label }}</p>
        <p
          :class="['font-display text-3xl font-bold tabular-nums', colorClasses[color]]"
        >
          {{ value }}
        </p>
      </div>
      <span v-if="icon" class="text-2xl opacity-60">{{ icon }}</span>
    </div>
  </div>
</template>
