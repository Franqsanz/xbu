import { useEffect } from 'react';

import { useAuth } from '@contexts/AuthContext';
import { useUnreadNotificationsCount } from '@hooks/queries';

const TITLE_PREFIX_RE = /^\(\d+\)\s/;

export function useUnreadTitleBadge() {
  const { userData } = useAuth();
  const { data } = useUnreadNotificationsCount(!!userData);
  const count = (data as any)?.count ?? 0;

  useEffect(() => {
    const baseTitle = document.title.replace(TITLE_PREFIX_RE, '');
    document.title =
      count > 0 ? `(${count > 99 ? '99+' : count}) ${baseTitle}` : baseTitle;
  }, [count]);
}
