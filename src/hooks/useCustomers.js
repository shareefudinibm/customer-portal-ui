import { useState, useEffect } from 'react';
import customerApi from '../services/customerApi';

/**
 * useCustomers — fetches the full customer list.
 * Falls back to mock data when the API is unavailable.
 */
function useCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    customerApi
      .getAll()
      .then((data) => {
        if (!cancelled) setCustomers(data);
      })
      .catch((err) => {
        if (!cancelled) {
          setCustomers([]);
          setError('API unavailable — please start the API and refresh.');
          console.error('Failed to fetch customers:', err && err.message ? err.message : err);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const addCustomer = (customer) => {
    setCustomers((prev) => [...prev, customer]);
  };

  return { customers, loading, error, addCustomer };
}

export default useCustomers;
