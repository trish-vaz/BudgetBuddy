import { createContext, useContext, useState } from 'react';

const ActivityContext = createContext(null);

/**
 * Provides a session-scoped activity feed shared across all pages.
 * Each item: { id, type, icon, title, detail, timestamp }
 */
export function ActivityProvider({ children }) {
  const [activity, setActivity] = useState([]);

  function addActivity(item) {
    setActivity((prev) => [
      {
        ...item,
        id: Date.now() + Math.random(),
        timestamp: new Date(),
      },
      ...prev,
    ].slice(0, 20)); // keep last 20
  }

  return (
    <ActivityContext.Provider value={{ activity, addActivity }}>
      {children}
    </ActivityContext.Provider>
  );
}

export function useActivity() {
  const ctx = useContext(ActivityContext);
  if (!ctx) throw new Error('useActivity must be used within ActivityProvider');
  return ctx;
}
