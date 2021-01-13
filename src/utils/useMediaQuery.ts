import { useState, useEffect } from 'react';

export const SCREEN_SIZES = {
  SMALL: '(min-width: 640px)',
  MEDIUM: '(min-width: 768px)',
  LARGE: '(min-width: 1024px)',
  XL: '(min-width: 1280px)',
};

export default function useMediaQuery(query: string) {
  const [match, setMatch] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const updateMatch = () => setMatch(window.matchMedia(query).matches);

    updateMatch();

    window.matchMedia(query).addEventListener('change', updateMatch);

    // remove listener on unmount
    return () => {
      window.matchMedia(query).removeEventListener('change', updateMatch);
    };
  }, [query]);

  return match;
}
