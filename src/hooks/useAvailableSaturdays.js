import { useMemo } from 'react';
import { getNextOpenSaturdayKeys } from '../../shared/hackathonValidation';

/**
 * The next few genuinely open Saturdays — past the always-booked marketing
 * window and not already registered. Used only to pick a sensible default
 * month to open the calendar on and for the helper hint text; the calendar
 * itself accepts ANY open Saturday from that point forward, not just these.
 */
export function useAvailableSaturdays(bookedDates) {
  return useMemo(() => getNextOpenSaturdayKeys(bookedDates), [bookedDates]);
}
