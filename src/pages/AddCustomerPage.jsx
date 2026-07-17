import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import customerApi from '../services/customerApi';
import { CustomerStatus } from '../models/Customer';

const STATUS_OPTIONS = [CustomerStatus.ACTIVE, CustomerStatus.INACTIVE, CustomerStatus.PREMIUM];

const formStyle = { display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '400px' };
const labelStyle = { fontSize: '13px', fontWeight: 600, color: '#57606a', marginBottom: '4px', display: 'block' };
const inputStyle = {
  padding: '8px 12px',
  border: '1px solid #e5e7eb',
  borderRadius: '6px',
  fontSize: '14px',
  width: '100%',
  boxSizing: 'border-box',
};
const btnStyle = {
  padding: '9px 18px',
  background: '#3b82d4',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  fontSize: '14px',
  fontWeight: 600,
  cursor: 'pointer',
  alignSelf: 'flex-start',
};
const errorStyle = { color: '#b91c1c', fontSize: '13px' };

/**
 * AddCustomerPage — form to create a new customer via POST /api/customers.
 */
function AddCustomerPage() {
  const navigate = useNavigate();

  const [name, setName]       = useState('');
  const [email, setEmail]     = useState('');
  const [status, setStatus]   = useState(CustomerStatus.ACTIVE);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError]   = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    if (!name.trim() || name.trim().length < 2) {
      setFormError('Name must be at least 2 characters.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setFormError('Please enter a valid email address.');
      return;
    }

    try {
      setSubmitting(true);
      await customerApi.create({ name: name.trim(), email: email.trim(), status });
      navigate('/customers');
    } catch {
      setFormError('Failed to create customer. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1 style={{ fontSize: '22px', marginBottom: '20px' }}>Add Customer</h1>
      <form style={formStyle} onSubmit={handleSubmit}>
        <div>
          <label style={labelStyle} htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            style={inputStyle}
            required
          />
        </div>

        <div>
          <label style={labelStyle} htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="user@example.com"
            style={inputStyle}
            required
          />
        </div>

        <div>
          <label style={labelStyle} htmlFor="status">Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={inputStyle}
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {formError && <p style={errorStyle}>{formError}</p>}

        <button type="submit" style={btnStyle} disabled={submitting}>
          {submitting ? 'Saving…' : 'Add Customer'}
        </button>
      </form>
    </div>
  );
}

export default AddCustomerPage;
