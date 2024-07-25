import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useScrollRestoration(loading) {
  const location = useLocation();

  useEffect(() => {
    function handleScroll() {
      sessionStorage.setItem(location.key, JSON.stringify(window.scrollY));
    }

    window.addEventListener('scroll', handleScroll);

    const scrollPosition = sessionStorage.getItem(location.key);
    if (scrollPosition && !loading) {
      window.scrollTo(0, JSON.parse(scrollPosition));
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.key, loading]);
}
