import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import StatusBadge from '../components/StatusBadge';
import customerApi from '../services/customerApi';

const pageStyle = {
  display: 'grid',
  gap: '20px',
};
const cardStyle = {
  border: '1px solid #e5e7eb',
  borderRadius: '12px',
  padding: '24px',
  backgroundColor: '#ffffff',
  boxShadow: '0 1px 2px rgba(31, 35, 40, 0.04)',
};
const headerRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '12px',
  flexWrap: 'wrap',
};
const backLinkStyle = {
  color: '#0969da',
  textDecoration: 'none',
  fontWeight: 600,
};
const detailsGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: '16px',
};
const fieldCardStyle = {
  padding: '16px',
  border: '1px solid #e5e7eb',
  borderRadius: '10px',
  backgroundColor: '#f6f8fa',
};
const labelStyle = {
  marginBottom: '8px',
  color: '#57606a',
  fontSize: '12px',
  fontWeight: 700,
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
};
const valueStyle = {
  margin: 0,
  color: '#1f2328',
  fontSize: '16px',
  fontWeight: 600,
  wordBreak: 'break-word',
};

function CustomerDetailsPage() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    customerApi
      .getById(id)
      .then((data) => {
        if (!cancelled) {
          setCustomer(data);
          setError(null);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setCustomer(null);
          setError(err?.response?.status === 404 ? 'Customer not found.' : 'Unable to load customer details.');
          console.error('Failed to fetch customer details:', err && err.message ? err.message : err);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) return <p>Loading customer details…</p>;

  return (
    <div style={pageStyle}>
      <div style={headerRowStyle}>
        <div>
          <h1 style={{ fontSize: '22px', margin: '0 0 8px' }}>Customer Details</h1>
          <p style={{ margin: 0, color: '#57606a' }}>Read-only view of the selected customer.</p>
        </div>
        <Link to="/customers" style={backLinkStyle}>
          ← Back to customers
        </Link>
      </div>

      {error ? (
        <p style={{ color: '#b42318', margin: 0 }}>{error}</p>
      ) : (
        <section style={cardStyle} aria-label="Customer details">
          <div style={detailsGridStyle}>
            <div style={fieldCardStyle}>
              <p style={labelStyle}>Name</p>
              <p style={valueStyle}>{customer?.name ?? '—'}</p>
            </div>
            <div style={fieldCardStyle}>
              <p style={labelStyle}>Email</p>
              <p style={valueStyle}>{customer?.email ?? '—'}</p>
            </div>
            <div style={fieldCardStyle}>
              <p style={labelStyle}>Status</p>
              <StatusBadge status={customer?.status} />
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default CustomerDetailsPage;
