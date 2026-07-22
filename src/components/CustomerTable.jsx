import React from 'react';
import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';

const tableStyle = { width: '100%', borderCollapse: 'collapse', fontSize: '14px' };
const thStyle = {
  textAlign: 'left',
  padding: '10px 12px',
  borderBottom: '2px solid #e5e7eb',
  color: '#57606a',
  fontWeight: 600,
  fontSize: '12px',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
};
const sortableHeaderButtonStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  padding: 0,
  border: 'none',
  background: 'none',
  color: 'inherit',
  font: 'inherit',
  fontWeight: 'inherit',
  letterSpacing: 'inherit',
  textTransform: 'inherit',
  cursor: 'pointer',
};
const sortIndicatorStyle = {
  fontSize: '11px',
  lineHeight: 1,
  color: '#1f2328',
};
const srOnlyStyle = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: 0,
};
const tdStyle = { padding: '10px 12px', borderBottom: '1px solid #e5e7eb', color: '#1f2328' };
const detailsLinkStyle = { color: '#0969da', textDecoration: 'none', fontWeight: 600 };

const getNextSortDirectionLabel = (isActive, direction) => {
  if (!isActive) return 'ascending';
  return direction === 'asc' ? 'descending' : 'ascending';
};

const getSortIndicator = (isActive, direction) => {
  if (!isActive) return '↕';
  return direction === 'asc' ? '↑' : '↓';
};

function CustomerTable({ customers, searchQuery, sortConfig, onSort }) {
  const filtered = customers.filter((c) => {
    const q = searchQuery.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.status.toLowerCase().includes(q)
    );
  });

  const sortedCustomers = [...filtered].sort((a, b) => {
    if (!sortConfig?.key) return 0;

    const left = String(a[sortConfig.key] ?? '').toLowerCase();
    const right = String(b[sortConfig.key] ?? '').toLowerCase();
    const comparison = left.localeCompare(right);

    if (comparison === 0) return 0;

    return sortConfig.direction === 'desc' ? -comparison : comparison;
  });

  if (sortedCustomers.length === 0) {
    return (
      <p style={{ color: '#57606a', padding: '16px 0' }}>
        No customers match your search.
      </p>
    );
  }

  const nameSortActive = sortConfig?.key === 'name';
  const emailSortActive = sortConfig?.key === 'email';

  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          <th style={thStyle}>ID</th>
          <th
            style={thStyle}
            aria-sort={nameSortActive ? (sortConfig.direction === 'asc' ? 'ascending' : 'descending') : 'none'}
          >
            <button
              type="button"
              onClick={() => onSort('name')}
              style={sortableHeaderButtonStyle}
              aria-label={`Sort by name ${getNextSortDirectionLabel(nameSortActive, sortConfig?.direction)}`}
            >
              <span>Name</span>
              <span aria-hidden="true" style={sortIndicatorStyle}>
                {getSortIndicator(nameSortActive, sortConfig?.direction)}
              </span>
              <span style={srOnlyStyle}>
                {nameSortActive ? `Currently sorted ${sortConfig.direction}` : 'Not currently sorted'}
              </span>
            </button>
          </th>
          <th
            style={thStyle}
            aria-sort={emailSortActive ? (sortConfig.direction === 'asc' ? 'ascending' : 'descending') : 'none'}
          >
            <button
              type="button"
              onClick={() => onSort('email')}
              style={sortableHeaderButtonStyle}
              aria-label={`Sort by email ${getNextSortDirectionLabel(emailSortActive, sortConfig?.direction)}`}
            >
              <span>Email</span>
              <span aria-hidden="true" style={sortIndicatorStyle}>
                {getSortIndicator(emailSortActive, sortConfig?.direction)}
              </span>
              <span style={srOnlyStyle}>
                {emailSortActive ? `Currently sorted ${sortConfig.direction}` : 'Not currently sorted'}
              </span>
            </button>
          </th>
          <th style={thStyle}>Status</th>
          <th style={thStyle}>Details</th>
        </tr>
      </thead>
      <tbody>
        {sortedCustomers.map((c) => (
          <tr key={c.id}>
            <td style={tdStyle}>{c.id}</td>
            <td style={tdStyle}>{c.name}</td>
            <td style={tdStyle}>{c.email}</td>
            <td style={tdStyle}>
              <StatusBadge status={c.status} />
            </td>
            <td style={tdStyle}>
              <Link to={`/customers/${c.id}`} style={detailsLinkStyle}>
                View details
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CustomerTable;
