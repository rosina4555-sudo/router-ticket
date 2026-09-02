# RouterTicket — Design Brief

A visual identity for a platform where hotspot business owners import MikroTik voucher batches, manage stock, and sell through personalized storefronts. The design should feel like it was built *for* this trade specifically — not skinned onto it.

## Where the identity comes from

Two objects define this world: the **voucher ticket** (a physical strip with a code, torn from a batch, worth a fixed amount of data or time) and the **signal** (the thing being sold — connectivity, shown as bars). Everything below is built from those two shapes instead of generic dashboard chrome.

---

## Color

| Name | Hex | Role |
|---|---|---|
| Ink Navy | `#12172B` | Dark base — owner dashboard background, primary text on light surfaces |
| Indigo Deep | `#232C56` | Panels, dashboard cards, sidebar |
| Signal Teal | `#14B8A6` | Primary accent — active/live states, primary buttons, "connected" |
| Ticket Amber | `#F0A202` | Secondary accent — ticket value, price tags, stock warnings |
| Cloud White | `#F8F9FB` | Light base — storefront background |
| Slate | `#5B6478` | Muted text, borders, secondary labels |

Reasoning: navy + teal reads as "network/trust" without falling into the near-black-plus-neon-accent template. Amber (not terracotta) carries the "ticket/value" association — closer to a raffle stub or currency note than a warm-cream-and-clay palette. The two accents are used for different jobs (teal = system state, amber = commercial value) so they never compete on the same element.

## Typography

- **Display / headlines — Space Grotesk.** Geometric grotesque with a slightly mechanical, technical edge — reads as infrastructure/network without being cold. Use at heavier weights (600–700) for hero numbers and section titles.
- **Body / UI — General Sans (fallback: IBM Plex Sans).** Clean and neutral at small sizes, which matters because owners will read dense tables of stock, sales, and customer data. Avoid Inter — it's the most common default and won't feel distinct.
- **Codes / data — IBM Plex Mono.** Reserved specifically for voucher codes, PINs, batch IDs, MAC addresses. This is functional, not decorative: monospacing here helps owners and customers scan codes accurately, since digits and letters won't be confused for each other.

Set body copy no wider than ~75 characters. Use tabular figures for any numeric column (stock counts, revenue) so digits align.

## Layout concept

Two distinct moods for two distinct audiences, sharing one system:

**Dashboard (owner-facing)** — dense, dark (Ink Navy/Indigo Deep), built for someone checking stock and sales daily.
```
┌─────────────────────────────────────────┐
│ RouterTicket          [Store: online ●]  │
├──────────┬──────────────────────────────┤
│ Overview │  Today            ▮▮▮▮▮▯ 78%  │
│ Batches  │  ┌────────┐ ┌────────┐        │
│ Storefront│  │ Sold   │ │ Stock  │        │
│ Payouts  │  │  312   │ │  1,204 │        │
│          │  └────────┘ └────────┘        │
│          │  ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈   │
│          │  Recent tickets sold           │
└──────────┴──────────────────────────────┘
```
The dotted line is a literal tear-line motif, used as a section divider instead of a plain hairline — it's a rule that ties back to the product rather than a default border.

**Storefront (customer-facing)** — light (Cloud White), mobile-first, minimal, fast to load on the kind of connection someone is buying data to fix. One plan per ticket-shaped card:
```
 ╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄╮
 ┊  1GB · 24hrs           ┊
 ┊  GH₵5                  ┊
 ┊                        ┊
 ●┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄●   ← perforation
 ┊  Buy now               ┊
 ╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄╯
```
Small notch circles at the card's left and right edges plus a dashed tear-line above the CTA — this is the "ticket-stub card," used instead of the generic uniform-rounded-corner card kit. Reserve it for the storefront's plan cards specifically, not every container on the page, so it stays meaningful rather than decorative.

## Principles

1. **Cards are tickets, not containers.** The perforated/notched stub treatment is specific to things that *are* a ticket (a plan, a voucher, a batch) — never applied to unrelated UI like settings panels or forms.
2. **Signal bars as status language.** A small four-bar glyph (like a wifi indicator) marks live/active state — store online, batch active, connection health — instead of a generic colored dot everywhere.
3. **Two moods, one system.** Dashboard is dark, dense, and numeric; storefront is light, sparse, and built for a five-second decision on a small screen. Same type and color tokens, different density.
4. **Numbers are the hero, not hairline labels.** Stock counts and sales figures get the large Space Grotesk treatment; skip small-caps eyebrow labels above them.

---

Want me to take this into an actual component mockup (dashboard screen or a storefront ticket card) next?
