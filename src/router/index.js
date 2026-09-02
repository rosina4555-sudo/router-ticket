/**
 * Router Configuration
 *
 * Two route groups:
 *   - /dashboard/* — owner-facing (dark layout)
 *   - /store/*     — customer-facing (light layout)
 *
 * Route-level code splitting via lazy imports for fast initial load.
 */

import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  // ─── Dashboard (owner) ───
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '/dashboard',
    component: () => import('../layouts/DashboardLayout.vue'),
    children: [
      {
        path: '',
        name: 'dashboard-overview',
        component: () => import('../views/dashboard/Overview.vue'),
        meta: { title: 'Overview' },
      },
      {
        path: 'batches',
        name: 'dashboard-batches',
        component: () => import('../views/dashboard/Batches.vue'),
        meta: { title: 'Batches' },
      },
      {
        path: 'batches/:id',
        name: 'dashboard-batch-detail',
        component: () => import('../views/dashboard/BatchDetail.vue'),
        meta: { title: 'Batch Detail' },
      },
      {
        path: 'storefront',
        name: 'dashboard-storefront',
        component: () => import('../views/dashboard/Storefront.vue'),
        meta: { title: 'Storefront' },
      },
      {
        path: 'payouts',
        name: 'dashboard-payouts',
        component: () => import('../views/dashboard/Payouts.vue'),
        meta: { title: 'Payouts' },
      },
    ],
  },

  // ─── Storefront (customer) ───
  {
    path: '/store',
    component: () => import('../layouts/StorefrontLayout.vue'),
    children: [
      {
        path: '',
        name: 'store-plans',
        component: () => import('../views/storefront/Plans.vue'),
        meta: { title: 'Plans' },
      },
      {
        path: 'checkout/:planId',
        name: 'store-checkout',
        component: () => import('../views/storefront/Checkout.vue'),
        meta: { title: 'Checkout' },
      },
      {
        path: 'order-success',
        name: 'store-order-success',
        component: () => import('../views/storefront/OrderSuccess.vue'),
        meta: { title: 'Order Complete' },
      },
      {
        path: 'lookup',
        name: 'store-lookup',
        component: () => import('../views/storefront/PurchaseLookup.vue'),
        meta: { title: 'Find My Voucher' },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Update document title on navigation
router.afterEach((to) => {
  document.title = `${to.meta.title || 'RouterTicket'} — RouterTicket`
})

export default router
