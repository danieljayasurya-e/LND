import { useCallback, useEffect, useState } from 'react';
import { fetchBookedDates } from '../services/hackathonApi';

/**
 * Loads already-booked hackathon dates so the date picker can grey them
 * out in red before the user even tries to submit.
 */
export function useBookedDates({ enabled = true } = {}) {
  const [bookedDates, setBookedDates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const refetch = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const dates = await fetchBookedDates();
      setBookedDates(dates);
    } catch (err) {
      setError(err.message || 'Could not load booked dates.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;
    refetch();
  }, [enabled, refetch]);

  return { bookedDates, loading, error, refetch };
}
