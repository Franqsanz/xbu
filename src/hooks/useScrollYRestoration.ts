import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useScrollYRestoration(loading: boolean) {
  const location = useLocation();

  useLayoutEffect(() => {
    function handleScroll() {
      sessionStorage.setItem(location.pathname, JSON.stringify(window.scrollY));
    }

    window.addEventListener('scroll', handleScroll);

    const scrollPosition = window.sessionStorage.getItem(location.pathname);

    if (scrollPosition && !loading) {
      window.scrollTo(0, JSON.parse(scrollPosition));
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname, loading]);
}
