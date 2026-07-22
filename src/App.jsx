import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import CustomersPage from './pages/CustomersPage';
import AddCustomerPage from './pages/AddCustomerPage';
import CustomerDetailsPage from './pages/CustomerDetailsPage';

const navStyle = {
  background: '#1f2328',
  padding: '0 24px',
  display: 'flex',
  alignItems: 'center',
  gap: '24px',
  height: '52px',
};
const brandStyle = { color: '#ffffff', fontWeight: 700, fontSize: '16px', textDecoration: 'none' };
const linkStyle = { color: '#d1d5db', textDecoration: 'none', fontSize: '14px' };
const activeLinkStyle = { color: '#ffffff', fontWeight: 600 };
const mainStyle = { maxWidth: '900px', margin: '0 auto', padding: '28px 24px' };

function NavBar() {
  return (
    <nav style={navStyle}>
      <span style={brandStyle}>Customer Portal</span>
      <NavLink to="/"          style={({ isActive }) => ({ ...linkStyle, ...(isActive ? activeLinkStyle : {}) })}>Dashboard</NavLink>
      <NavLink to="/customers" style={({ isActive }) => ({ ...linkStyle, ...(isActive ? activeLinkStyle : {}) })}>Customers</NavLink>
      <NavLink to="/add"       style={({ isActive }) => ({ ...linkStyle, ...(isActive ? activeLinkStyle : {}) })}>Add Customer</NavLink>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <main style={mainStyle}>
        <Routes>
          <Route path="/"              element={<Dashboard />} />
          <Route path="/customers"     element={<CustomersPage />} />
          <Route path="/customers/:id" element={<CustomerDetailsPage />} />
          <Route path="/add"           element={<AddCustomerPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
