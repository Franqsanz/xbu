import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getAllSearchBooks } from '@services/api';
import { registerAgentTools } from '@utils/agentTools';

/**
 * Publica las tools de WebMCP mientras el layout está montado. Va en el layout
 * y no en main.tsx porque las tools de navegación necesitan el router.
 */
export function useAgentTools() {
  const navigate = useNavigate();

  useEffect(() => {
    return registerAgentTools({
      navigate: (path) => navigate(path),
      searchBooks: getAllSearchBooks,
    });
  }, [navigate]);
}
