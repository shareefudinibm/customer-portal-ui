import { useState, useEffect } from 'react';
import customerApi from '../services/customerApi';
import mockCustomers from '../models/mockCustomers';

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
      .catch(() => {
        if (!cancelled) {
          setCustomers(mockCustomers);
          setError('API unavailable — showing mock data.');
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
