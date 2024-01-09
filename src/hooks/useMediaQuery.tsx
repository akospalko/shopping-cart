// Match media query to current screen size
import { useState, useEffect } from "react";

const useMediaQuery = (query: string): boolean => {
  // STATE
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

  // EFFECT
  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    
    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQueryList.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQueryList.removeEventListener("change", handleMediaQueryChange);
    };
  }, [query]);

  return matches;
};

export default useMediaQuery;