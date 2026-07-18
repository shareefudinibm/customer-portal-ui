/**
 * Customer model — mirrors the backend Customer entity.
 * Status values are sourced from ./CustomerStatusRules.js
 */

export { CustomerStatus } from './CustomerStatusRules.js';

/**
 * @typedef {Object} Customer
 * @property {number} id
 * @property {string} name
 * @property {string} email
 * @property {'ACTIVE'|'INACTIVE'|'PREMIUM'} status
 */
