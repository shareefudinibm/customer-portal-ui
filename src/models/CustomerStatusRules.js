/**
 * CustomerStatusRules.js
 * Shared Business Rules — Local copy for customer-portal-ui
 *
 * Defines the canonical set of customer status values.
 */

export const CustomerStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  PREMIUM: 'PREMIUM',
};

export const VALID_STATUSES = Object.values(CustomerStatus);

export function isValidStatus(status) {
  return VALID_STATUSES.includes(status);
}
