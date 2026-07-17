/**
 * Customer model — mirrors the backend Customer entity.
 * Status values are sourced from shared-business-rules/CustomerStatusRules.js
 */

export const CustomerStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  PREMIUM: 'PREMIUM',
};

/**
 * @typedef {Object} Customer
 * @property {number} id
 * @property {string} name
 * @property {string} email
 * @property {'ACTIVE'|'INACTIVE'|'PREMIUM'} status
 */
