import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SignalBars from '../components/shared/SignalBars.vue'
import StatCard from '../components/shared/StatCard.vue'
import TearDivider from '../components/shared/TearDivider.vue'

describe('SignalBars', () => {
  it('renders 4 bars', () => {
    const wrapper = mount(SignalBars)
    expect(wrapper.findAll('span').length).toBe(4)
  })

  it('fills bars up to level', () => {
    const wrapper = mount(SignalBars, { props: { level: 2 } })
    const bars = wrapper.findAll('span')
    // First 2 should be teal (filled), last 2 muted
    expect(bars[0].classes()).toContain('bg-signal-teal')
    expect(bars[1].classes()).toContain('bg-signal-teal')
    expect(bars[2].classes()).toContain('bg-slate/30')
    expect(bars[3].classes()).toContain('bg-slate/30')
  })

  it('renders all bars muted when level is 0', () => {
    const wrapper = mount(SignalBars, { props: { level: 0 } })
    wrapper.findAll('span').forEach(bar => {
      expect(bar.classes()).toContain('bg-slate/30')
    })
  })

  it('applies size classes correctly', () => {
    const sm = mount(SignalBars, { props: { size: 'sm' } })
    expect(sm.findAll('span')[0].classes()).toContain('w-0.5')
    const lg = mount(SignalBars, { props: { size: 'lg' } })
    expect(lg.findAll('span')[0].classes()).toContain('w-1.5')
  })
})

describe('StatCard', () => {
  it('renders value and label', () => {
    const wrapper = mount(StatCard, {
      props: { value: 42, label: 'Test Metric' },
    })
    expect(wrapper.text()).toContain('42')
    expect(wrapper.text()).toContain('Test Metric')
  })

  it('applies color class', () => {
    const wrapper = mount(StatCard, {
      props: { value: 100, label: 'Revenue', color: 'amber' },
    })
    const paragraphs = wrapper.findAll('p')
    const valueP = paragraphs.find(p => p.text() === '100')
    expect(valueP.classes()).toContain('text-ticket-amber')
  })

  it('renders icon when provided', () => {
    const wrapper = mount(StatCard, {
      props: { value: 10, label: 'Sales', icon: '🎫' },
    })
    expect(wrapper.text()).toContain('🎫')
  })
})

describe('TearDivider', () => {
  it('renders without label', () => {
    const wrapper = mount(TearDivider)
    expect(wrapper.find('hr').exists()).toBe(true)
    expect(wrapper.text()).toBe('')
  })

  it('renders with label', () => {
    const wrapper = mount(TearDivider, {
      props: { label: 'Section Title' },
    })
    expect(wrapper.text()).toContain('Section Title')
  })
})
