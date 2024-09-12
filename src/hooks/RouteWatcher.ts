import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function RouteWatcher() {
  const location = useLocation();
  const disabledRoutes = ['/explore', '/book/view/'];

  const isDisabled = disabledRoutes.some((route) =>
    location.pathname.startsWith(route),
  );

  useEffect(() => {
    if (!isDisabled) {
      window.sessionStorage.removeItem('/explore');
    }
  }, [location, isDisabled]);

  return null;
}
