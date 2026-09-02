# RouterTicket — Build Progress

## Current Status: Phase 1 Complete ✅

**Last Updated:** September 2, 2026
**Tests:** 37/37 passing
**Build:** ✅ Clean

---

## Phase 1 — Foundation & Core UI ✅ COMPLETED

### Architecture Layer
- [x] API abstraction layer (`src/api/`) — mock-first, swap-ready for live APIs
- [x] Mock data generators (`src/mocks/data.js`) — realistic MikroTik voucher data
- [x] Mock API handlers (`src/mocks/handlers.js`) — simulated network delay
- [x] Pinia stores: `batches`, `storefront`, `analytics`
- [x] Vue Router with lazy-loaded routes, two route groups (dashboard + storefront)

### Design System (per brief)
- [x] Tailwind v4 theme tokens: Ink Navy, Indigo Deep, Signal Teal, Ticket Amber, Cloud White, Slate
- [x] Font stack: Space Grotesk (display), IBM Plex Sans (body), IBM Plex Mono (codes)
- [x] `SignalBars` — wifi-style status glyph
- [x] `TicketCard` — perforated/notched stub card (storefront only)
- [x] `TearDivider` — dashed perforation section divider
- [x] `StatCard` — hero number + label for dashboard metrics

### Dashboard Views (Dark, Owner-Facing)
- [x] Overview — stats cards, store health, recent sales table
- [x] Batches — batch grid with stock bars and signal indicators
- [x] Batch Detail — individual voucher list with codes
- [x] Storefront Settings — store config form, status toggle, active plans
- [x] Payouts — request form + payout history table

### Storefront Views (Light, Customer-Facing)
- [x] Plans — ticket-stub plan cards with buy CTA
- [x] Checkout — phone entry + payment flow
- [x] Order Success — voucher code display
- [x] Purchase Lookup — find voucher by Paystack reference (route: `/store/lookup`)

### Testing
- [x] API layer tests (15 tests) — all CRUD operations, error cases, order lookup
- [x] Store tests (13 tests) — state, getters, actions
- [x] Component tests (9 tests) — SignalBars, StatCard, TearDivider

### Layouts
- [x] DashboardLayout — dark sidebar + header + content area
- [x] StorefrontLayout — light, mobile-first, minimal

---

## Phase 2 — Enhanced Interactivity (TODO)

- [ ] Batch import flow (CSV/file upload UI)
- [ ] Voucher code generation & batch creation
- [ ] Real-time stock updates (WebSocket mock)
- [ ] Charts for sales over time (weekly/monthly)
- [x] Customer order lookup by Paystack reference (`/store/lookup`)
- [ ] Storefront plan management (CRUD from dashboard)
- [x] Mobile responsive sidebar (hamburger menu with slide-in overlay)
- [x] Purchase Lookup — back button added
- [ ] Dark mode toggle for storefront (optional)
- [ ] Toast/notification system

## Phase 3 — API Integration (TODO)

- [ ] Replace mock handlers with real HTTP client
- [ ] MikroTik RouterOS API integration for voucher import
- [ ] Mobile Money payment gateway (MTN MoMo, Vodafone Cash)
- [ ] SMS gateway for voucher delivery
- [ ] Authentication & session management
- [ ] Error handling & retry logic
- [ ] Loading skeletons & optimistic updates

## Phase 4 — Production Readiness (TODO)

- [ ] E2E tests (Playwright or Cypress)
- [ ] Performance audit (Lighthouse)
- [ ] SEO meta tags for storefront
- [ ] PWA support for storefront (offline-capable)
- [ ] Analytics integration
- [ ] Deployment pipeline (Vercel/Netlify)

---

## File Structure

```
src/
├── api/                    # API abstraction layer (mock → live swap point)
│   ├── index.js            # Re-exports all domain modules
│   ├── batches.js          # Batch CRUD
│   ├── storefront.js       # Store config + plans
│   ├── analytics.js        # Dashboard stats
│   ├── payouts.js          # Payout operations
│   └── orders.js           # Checkout flow
├── mocks/                  # Mock data & handlers
│   ├── data.js             # Sample data generators
│   └── handlers.js         # Simulated API with delay
├── stores/                 # Pinia state management
│   ├── batches.js          # Batch state & actions
│   ├── storefront.js       # Store config state
│   └── analytics.js        # Dashboard analytics state
├── router/                 # Vue Router config
│   └── index.js            # Route definitions
├── layouts/                # Route-level layouts
│   ├── DashboardLayout.vue # Dark owner dashboard
│   └── StorefrontLayout.vue # Light customer storefront
├── components/
│   ├── shared/             # Design system primitives
│   │   ├── SignalBars.vue  # Wifi-style status bars
│   │   ├── TicketCard.vue  # Perforated stub card
│   │   ├── TearDivider.vue # Dashed section divider
│   │   └── StatCard.vue    # Hero number + label
│   └── dashboard/          # Dashboard-specific
│       ├── DashboardSidebar.vue
│       └── DashboardHeader.vue
├── views/
│   ├── dashboard/          # Owner-facing pages
│   │   ├── Overview.vue
│   │   ├── Batches.vue
│   │   ├── BatchDetail.vue
│   │   ├── Storefront.vue
│   │   └── Payouts.vue
│   └── storefront/         # Customer-facing pages
│       ├── Plans.vue
│       ├── Checkout.vue
│       ├── OrderSuccess.vue
│       └── PurchaseLookup.vue
├── composables/            # Shared composition functions (future)
├── utils/                  # Utility functions (future)
└── __tests__/              # Unit tests
    ├── api.test.js
    ├── stores.test.js
    └── components.test.js
```

---

## Key Decisions

1. **Mock-first API layer**: All data goes through `src/api/*.js` modules. Each module imports from `src/mocks/handlers.js`. To go live, just change the import to an HTTP client — zero component/store changes needed.

2. **Route-level code splitting**: Every view is lazy-loaded via dynamic imports. Dashboard and storefront are separate route groups with different layouts.

3. **Design tokens in Tailwind v4**: Colors and fonts are defined as CSS custom properties in `style.css` `@theme` block. Component classes reference these tokens directly.

4. **Ticket motif discipline**: The perforated/notched card treatment is ONLY used for things that are tickets (plans, vouchers, batches) — never for settings panels or forms.

5. **Two-mood separation**: Dashboard uses `bg-ink-navy` / `bg-indigo-deep` (dark). Storefront uses `bg-cloud-white` / `bg-white` (light). Same type scale, different density.
