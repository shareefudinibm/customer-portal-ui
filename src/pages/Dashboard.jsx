import React from 'react';
import { CustomerStatus } from '../models/Customer';
import useCustomers from '../hooks/useCustomers';

const cardStyle = {
  background: '#f7f8fa',
  border: '1px solid #e5e7eb',
  borderRadius: '8px',
  padding: '20px 24px',
  minWidth: '160px',
  flex: '1',
};
const labelStyle = { fontSize: '12px', color: '#57606a', textTransform: 'uppercase', letterSpacing: '0.05em' };
const valueStyle = { fontSize: '32px', fontWeight: 700, color: '#1f2328', margin: '8px 0 0' };

function MetricCard({ label, value }) {
  return (
    <div style={cardStyle}>
      <div style={labelStyle}>{label}</div>
      <div style={valueStyle}>{value}</div>
    </div>
  );
}

/**
 * Dashboard — shows Total, Active, and Premium customer counts.
 * Premium customers are highlighted per PremiumCustomerRules.js.
 */
function Dashboard() {
  const { customers, loading, error } = useCustomers();

  const total   = customers.length;
  const active  = customers.filter((c) => c.status === CustomerStatus.ACTIVE).length;
  const premium = customers.filter((c) => c.status === CustomerStatus.PREMIUM).length;

  if (loading) return <p>Loading dashboard…</p>;

  return (
    <div>
      <h1 style={{ fontSize: '22px', marginBottom: '8px' }}>Dashboard</h1>
      {error && <p style={{ color: '#b45309', marginBottom: '12px' }}>{error}</p>}
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '16px' }}>
        <MetricCard label="Total Customers"   value={total} />
        <MetricCard label="Active Customers"  value={active} />
        <MetricCard label="Premium Customers" value={premium} />
      </div>
    </div>
  );
}

export default Dashboard;
