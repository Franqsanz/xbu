import { useEffect, useState } from 'react';

type NetworkState = 'online' | 'offline' | 'slow';

export function useNetworkState(): NetworkState {
  const [networkState, setNetworkState] = useState<NetworkState>('online');

  useEffect(() => {
    function handleNetworkChange() {
      if (navigator.onLine) {
        // Comprobar si la velocidad de conexión es lenta o no
        const connection =
          (navigator as any).connection ||
          (navigator as any).mozConnection ||
          (navigator as any).webkitConnection;

        if (connection) {
          const effectiveType = connection.effectiveType;

          if (
            effectiveType === 'slow-2g' ||
            effectiveType === '2g' ||
            effectiveType === '3g'
          ) {
            setNetworkState('slow');
          } else {
            setNetworkState('online');
          }
        } else {
          setNetworkState('online');
        }
      } else {
        setNetworkState('offline');
      }
    }

    window.addEventListener('online', handleNetworkChange);
    window.addEventListener('offline', handleNetworkChange);
    handleNetworkChange();

    return () => {
      window.removeEventListener('online', handleNetworkChange);
      window.removeEventListener('offline', handleNetworkChange);
    };
  }, []);

  return networkState;
}
