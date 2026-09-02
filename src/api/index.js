/**
 * API Abstraction Layer
 *
 * All data fetching goes through this layer. Swap `mockClient` for `httpClient`
 * when integrating live APIs — no component or store changes needed.
 *
 * Convention:
 *   - Each domain module (batches, storefront, etc.) exports async functions
 *   - Functions return plain objects (no class instances)
 *   - Errors are thrown as plain Error objects with a `code` property
 */

import * as batchesApi from './batches'
import * as storefrontApi from './storefront'
import * as analyticsApi from './analytics'
import * as payoutsApi from './payouts'
import * as ordersApi from './orders'

export const batches = batchesApi
export const storefront = storefrontApi
export const analytics = analyticsApi
export const payouts = payoutsApi
export const orders = ordersApi
