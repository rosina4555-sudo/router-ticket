/**
 * Batches API
 *
 * CRUD operations for MikroTik voucher batches.
 * Currently backed by mock handlers — swap import to httpClient for live.
 */

// When live: import * as http from '../lib/httpClient'
import * as mock from '../mocks/handlers'

export const fetchBatches = mock.fetchBatches
export const fetchBatchById = mock.fetchBatchById
export const fetchVouchersByBatchId = mock.fetchVouchersByBatchId
