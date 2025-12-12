'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

interface PerformanceContextType {
  isHeavyRendering: boolean;
  startHeavyRendering: () => void;
  stopHeavyRendering: () => void;
}

const PerformanceContext = createContext<PerformanceContextType>({
  isHeavyRendering: false,
  startHeavyRendering: () => {},
  stopHeavyRendering: () => {},
});

export const usePerformance = () => useContext(PerformanceContext);

export const PerformanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isHeavyRendering, setIsHeavyRendering] = useState(false);

  const startHeavyRendering = useCallback(() => {
    console.log('⏸️ Pausing cursor effects for heavy rendering');
    setIsHeavyRendering(true);
  }, []);

  const stopHeavyRendering = useCallback(() => {
    console.log('▶️ Resuming cursor effects');
    setIsHeavyRendering(false);
  }, []);

  return (
    <PerformanceContext.Provider
      value={{
        isHeavyRendering,
        startHeavyRendering,
        stopHeavyRendering,
      }}
    >
      {children}
    </PerformanceContext.Provider>
  );
};

