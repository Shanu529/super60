import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const EventModalContext = createContext(null)

export function EventModalProvider({ children }) {
  const [activeEvent, setActiveEvent] = useState(null)

  const openEvent = useCallback((event) => setActiveEvent(event), [])
  const closeEvent = useCallback(() => setActiveEvent(null), [])

  const value = useMemo(() => ({ activeEvent, openEvent, closeEvent }), [activeEvent, openEvent, closeEvent])

  return <EventModalContext.Provider value={value}>{children}</EventModalContext.Provider>
}

export function useEventModal() {
  const ctx = useContext(EventModalContext)
  if (!ctx) {
    throw new Error('useEventModal must be used within an EventModalProvider')
  }
  return ctx
}
