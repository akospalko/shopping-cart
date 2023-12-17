// React hook for handling scroll header logic
import { useState, useEffect } from 'react';

const useScrollHeader = (scrollThresholdToShowHeader: number = 150) => {
  // STATE
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);
  
  // EFFECT
  useEffect(() => {
    const handleScroll = () => {
      // Current scroll position
      const currentScrollPosition = window.scrollY;

      // Determine whether to show or hide the header based on scroll direction and position
      if (currentScrollPosition >= 0 && currentScrollPosition <= scrollThresholdToShowHeader) {
        // At the top of the page, show the header
        setShowHeader(true);
      } else if (currentScrollPosition > lastScrollPosition) {
        // Scrolling down, hide the header
        setShowHeader(false);
      } else {
        // Scrolling up, show the header if past the threshold
        setShowHeader(currentScrollPosition > scrollThresholdToShowHeader);
      }

      // Update last scroll position
      setLastScrollPosition(currentScrollPosition);
    };

    // Attach scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Detach event listener on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollPosition, scrollThresholdToShowHeader]);

  return { showHeader };
};

export default useScrollHeader;
