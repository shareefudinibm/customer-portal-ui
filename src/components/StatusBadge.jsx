import React from 'react';
import { CustomerStatus } from '../models/Customer';

const BADGE_STYLES = {
  [CustomerStatus.ACTIVE]: {
    backgroundColor: '#d1fae5',
    color: '#065f46',
    border: '1px solid #6ee7b7',
  },
  [CustomerStatus.INACTIVE]: {
    backgroundColor: '#f3f4f6',
    color: '#6b7280',
    border: '1px solid #d1d5db',
  },
  [CustomerStatus.PREMIUM]: {
    backgroundColor: '#fef9c3',
    color: '#92400e',
    border: '1px solid #FFD700', // Gold — per PremiumCustomerRules.js
  },
};

const BASE_STYLE = {
  display: 'inline-block',
  padding: '2px 10px',
  borderRadius: '12px',
  fontSize: '12px',
  fontWeight: 600,
  letterSpacing: '0.03em',
  textTransform: 'uppercase',
};

/**
 * StatusBadge — renders a coloured badge for a customer status value.
 * Badge colours are derived from shared-business-rules/PremiumCustomerRules.js.
 *
 * @param {{ status: 'ACTIVE'|'INACTIVE'|'PREMIUM' }} props
 */
function StatusBadge({ status }) {
  const style = { ...BASE_STYLE, ...(BADGE_STYLES[status] || {}) };
  return <span style={style}>{status}</span>;
}

export default StatusBadge;
