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
          const hasData = get().categories.length > 0 && get().products.length > 0;
          
          // Use cached data if available and recent
          if (lastFetch && hasData && now - lastFetch < 5 * 60 * 1000) {
            return;
          }

          set({ isLoading: true, error: null });
          
          // Add timeout to prevent infinite loading
          const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => reject(new Error('Request timeout')), 10000);
          });

          const fetchPromise = fetchMenu();
          const apiData = await Promise.race([fetchPromise, timeoutPromise]);

          if (!apiData || !Array.isArray(apiData)) {
            throw new Error('Invalid menu data received');
          }

          const { categories, products } = mapApiDataToApp(apiData);
          
          if (!categories.length || !products.length) {
            throw new Error('No menu data available');
          }

          set({ 
            categories, 
            products, 
            isLoading: false,
            lastFetch: now,
            error: null
          });
        } catch (error) {
          // Keep existing data if available
          const currentState = get();
          set({ 
            isLoading: false,
            error: 'Menü yüklenirken bir hata oluştu',
            categories: currentState.categories,
            products: currentState.products
          });
          console.error('Menu fetch error:', error);
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