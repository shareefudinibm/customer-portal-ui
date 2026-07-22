import React, { useState } from 'react';
import CustomerTable from '../components/CustomerTable';
import useCustomers from '../hooks/useCustomers';

const inputStyle = {
  padding: '8px 12px',
  border: '1px solid #e5e7eb',
  borderRadius: '6px',
  fontSize: '14px',
  width: '100%',
  maxWidth: '320px',
  boxSizing: 'border-box',
};

/**
 * CustomersPage — lists all customers with a live search box.
 */
function CustomersPage() {
  const { customers, loading, error } = useCustomers();
  const [search, setSearch] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });

  const handleSort = (key) => {
    setSortConfig((prev) =>
      prev.key === key
        ? { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' }
        : { key, direction: 'asc' }
    );
  };

  if (loading) return <p>Loading customers…</p>;

  return (
    <div>
      <h1 style={{ fontSize: '22px', marginBottom: '8px' }}>Customers</h1>
      {error && <p style={{ color: '#b45309', marginBottom: '12px' }}>{error}</p>}

      <div style={{ marginBottom: '16px' }}>
        <input
          type="text"
          placeholder="Search by name, email or status…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={inputStyle}
        />
      </div>

      <CustomerTable customers={customers} searchQuery={search} sortConfig={sortConfig} onSort={handleSort} />
    </div>
  );
}

export default CustomersPage;
