import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Category, Product } from '@/types';
import { fetchMenu, mapApiDataToApp } from '@/lib/api';

interface MenuState {
  categories: Category[];
  products: Product[];
  isLoading: boolean;
  error: string | null;
  lastFetch: number | null;
  fetchData: () => Promise<void>;
}

export const useMenuStore = create<MenuState>()(
  persist(
    (set, get) => ({
      categories: [],
      products: [],
      isLoading: false,
      error: null,
      lastFetch: null,
      fetchData: async () => {
        try {
          // Check if we need to fetch new data (cache for 5 minutes)
          const now = Date.now();
          const lastFetch = get().lastFetch;
          if (lastFetch && now - lastFetch < 5 * 60 * 1000) {
            return; // Use cached data
          }

          set({ isLoading: true, error: null });
          const apiData = await fetchMenu();
          const { categories, products } = mapApiDataToApp(apiData);
          set({ 
            categories, 
            products, 
            isLoading: false,
            lastFetch: now
          });
        } catch (error) {
          set({ error: 'Menü yüklenirken bir hata oluştu', isLoading: false });
        }
      }
    }),
    {
      name: 'menu-storage',
      partialize: (state) => ({
        categories: state.categories,
        products: state.products,
        lastFetch: state.lastFetch
      })
    }
  )
);