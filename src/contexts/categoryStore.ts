import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface CategoryType {
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  isCategoryActive: (location: Location) => boolean;
}

const disabledRoutes = ['/explore', '/most-viewed'];

export const useCategoryStore = create(
  persist<CategoryType>(
    (set) => ({
      selectedCategory: null,
      setSelectedCategory: (category: string | null) => {
        set({ selectedCategory: category });
      },
      isCategoryActive: (location) => {
        return !disabledRoutes.some((route) => location.pathname.startsWith(route));
      },
    }),
    {
      name: 'category',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
