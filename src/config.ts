import { QueryClient } from '@tanstack/react-query';

export const API_URL = import.meta.env.VITE_API_URL;
export const queryClient = new QueryClient();
