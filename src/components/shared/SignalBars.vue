<script setup>
/**
 * SignalBars — four-bar glyph for live/active state.
 *
 * Props:
 *   level (1-4): how many bars are filled
 *   size ('sm' | 'md' | 'lg'): bar height scale
 *   active (boolean): whether to show teal fill
 */
const props = defineProps({
  level: { type: Number, default: 4, validator: v => v >= 0 && v <= 4 },
  size: { type: String, default: 'md', validator: v => ['sm', 'md', 'lg'].includes(v) },
  active: { type: Boolean, default: true },
})

const sizeClasses = {
  sm: 'w-0.5',
  md: 'w-1',
  lg: 'w-1.5',
}

const heightClasses = {
  sm: ['h-1.5', 'h-2', 'h-2.5', 'h-3'],
  md: ['h-2', 'h-3', 'h-3.5', 'h-4'],
  lg: ['h-2.5', 'h-3.5', 'h-4', 'h-5'],
}

const barWidth = sizeClasses[props.size]
</script>

<template>
  <div class="inline-flex items-end gap-[2px]">
    <span
      v-for="i in 4"
      :key="i"
      :class="[
        barWidth,
        heightClasses[size][i - 1],
        'rounded-full transition-colors',
        i <= level && active ? 'bg-signal-teal' : 'bg-slate/30',
      ]"
    />
  </div>
</template>
