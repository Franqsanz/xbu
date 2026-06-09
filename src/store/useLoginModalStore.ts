import { create } from 'zustand';

interface LoginModalState {
  isOpen: boolean;
  reason: string | null;
  suppress: boolean;
  open: (reason?: string) => void;
  close: () => void;
  setSuppress: (value: boolean) => void;
}

export const useLoginModalStore = create<LoginModalState>((set) => ({
  isOpen: false,
  reason: null,
  suppress: false,
  open: (reason) =>
    set((state) =>
      state.suppress ? state : { ...state, isOpen: true, reason: reason ?? null },
    ),
  close: () => set({ isOpen: false, reason: null }),
  setSuppress: (value) => set({ suppress: value }),
}));
