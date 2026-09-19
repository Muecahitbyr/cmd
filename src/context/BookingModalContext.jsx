import { createContext, useContext, useState, useCallback, useMemo } from 'react';

const BookingModalContext = createContext(null);

export function BookingModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [presetService, setPresetService] = useState('');

  const openBooking = useCallback((service = '') => {
    setPresetService(service);
    setIsOpen(true);
  }, []);

  const closeBooking = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ isOpen, presetService, openBooking, closeBooking }),
    [isOpen, presetService, openBooking, closeBooking],
  );

  return <BookingModalContext.Provider value={value}>{children}</BookingModalContext.Provider>;
}

export function useBookingModal() {
  const ctx = useContext(BookingModalContext);
  if (!ctx) throw new Error('useBookingModal must be used within a BookingModalProvider');
  return ctx;
}
