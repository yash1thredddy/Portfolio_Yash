'use client';
import { useEffect, useState } from 'react';
import { usePerformance } from '@/contexts/PerformanceContext';

import fluidCursor from '@/hooks/use-FluidCursor';

const FluidCursor = () => {
  const [isLowPerformance, setIsLowPerformance] = useState(false);
  const { isHeavyRendering } = usePerformance();

  useEffect(() => {
    // Check if device might struggle with effects
    const checkPerformance = () => {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
      
      if (isMobile || isLowEnd) {
        setIsLowPerformance(true);
      }
    };

    checkPerformance();

    const canvas = document.getElementById('fluid');
    if (canvas && !isLowPerformance) {
      fluidCursor();
    }
  }, [isLowPerformance]);

  // Don't render on low-performance devices
  if (isLowPerformance) {
    return null;
  }

  return (
    <div 
      className="fixed top-0 left-0 z-0 pointer-events-none opacity-50 transition-opacity duration-300"
      style={{ 
        opacity: isHeavyRendering ? 0 : 0.5,
        visibility: isHeavyRendering ? 'hidden' : 'visible'
      }}
    >
      <canvas 
        id="fluid" 
        className="h-screen w-screen" 
        style={{ 
          willChange: 'contents',
          contain: 'strict'
        }} 
      />
    </div>
  );
};
export default FluidCursor;
