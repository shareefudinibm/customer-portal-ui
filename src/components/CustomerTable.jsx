import React from 'react';
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
const tdStyle = { padding: '10px 12px', borderBottom: '1px solid #e5e7eb', color: '#1f2328' };

/**
 * CustomerTable — renders a filterable list of customers. 
 *
 * @param {{ customers: Customer[], searchQuery: string }} props
 */
function CustomerTable({ customers, searchQuery }) {
  const filtered = customers.filter((c) => {
    const q = searchQuery.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.status.toLowerCase().includes(q)
    );
  });

  if (filtered.length === 0) {
    return (
      <p style={{ color: '#57606a', padding: '16px 0' }}>
        No customers match your search.
      </p>
    );
  }

  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          <th style={thStyle}>ID</th>
          <th style={thStyle}>Name</th>
          <th style={thStyle}>Email</th>
          <th style={thStyle}>Status</th>
        </tr>
      </thead>
      <tbody>
        {filtered.map((c) => (
          <tr key={c.id}>
            <td style={tdStyle}>{c.id}</td>
            <td style={tdStyle}>{c.name}</td>
            <td style={tdStyle}>{c.email}</td>
            <td style={tdStyle}>
              <StatusBadge status={c.status} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CustomerTable;
