import React, { useState } from 'react';
import CustomerTable from '../components/CustomerTable';
import useCustomers from '../hooks/useCustomers';

// Shared inline styling for the search input so the control remains consistent
// with the rest of the page layout.
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
 * CustomersPage
 *
 * Renders the customer listing view.
 * - Loads customer data through the custom hook.
 * - Tracks the user's search input locally.
 * - Passes the current search term to CustomerTable for filtering/display.
 */
function CustomersPage() {
  // Retrieve customer data and request state from the shared hook.
  const { customers, loading, error } = useCustomers();
  // Store the current search text entered by the user.
  const [search, setSearch] = useState('');

  // Show a simple loading state while customer data is being fetched.
  if (loading) return <p>Loading customers…</p>;

  return (
    <div>
      <h1 style={{ fontSize: '22px', marginBottom: '8px' }}>Customers</h1>
      {/* Display any non-blocking data retrieval error above the search box. */}
      {error && <p style={{ color: '#b45309', marginBottom: '12px' }}>{error}</p>}

      <div style={{ marginBottom: '16px' }}>
        <input
          type="text"
          placeholder="Search by name, email or status…"
          value={search}
          // Update the local search state as the user types.
          onChange={(e) => setSearch(e.target.value)}
          style={inputStyle}
        />
      </div>

      {/* Render the customer table and provide the active search query. */}
      <CustomerTable customers={customers} searchQuery={search} />
    </div>
  );
}

export default CustomersPage;
