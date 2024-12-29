import { ApiCategory, MenuApiResponse } from '@/types/api';
import { Product, Category } from '@/types';
import { getNextProductImage, getNextCategoryImage } from './utils/mock-images';
import { getRandomCalories, getRandomDescription } from './utils/mock-data';
import { processComboGroups } from './utils/combo-processor';

const API_URL = 'https://srv7.robotpos.com/kiosk2025/kioskService.asmx/getKioskMenu';

export async function fetchMenu(): Promise<ApiCategory[]> {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        currentMenuLastUpdateDateTime: "2000-01-01"
      }),
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: MenuApiResponse = await response.json();
    
    if (!data?.d?.Menu || !Array.isArray(data.d.Menu)) {
      throw new Error('Invalid API response format');
    }

    return data.d.Menu;
  } catch (error) {
    console.error('Error fetching menu:', error);
    // Return fallback data for build time
    return [
      {
        MenuGroupKey: "fallback-category-1",
        MenuGroupText: "Main Menu",
        Items: [
          {
            MenuItemKey: "fallback-item-1",
            MenuItemText: "Sample Item 1",
            Description: "A delicious sample item",
            TakeOutPrice_TL: 100,
            DeliveryPrice_TL: 100,
            Badges: [],
            Combo: [],
            IsMainCombo: false
          }
        ]
      }
    ];
  }
}

export function mapApiDataToApp(apiData: ApiCategory[]): { 
  categories: Category[],
  products: Product[] 
} {
  if (!Array.isArray(apiData) || !apiData.length) {
    throw new Error('Invalid or empty API data');
  }

  const categories: Category[] = apiData.map(cat => ({
    id: cat.MenuGroupKey,
    name: cat.MenuGroupText,
    image: getNextCategoryImage()
  }));

  const products: Product[] = apiData.flatMap(cat => 
    cat.Items.map(item => {
      const combo = item.Combo || [];
      const hasValidCombo = combo.length > 0 && combo.some(group => 
        group.Items?.length > 0
      );

      const baseProduct = {
        id: item.MenuItemKey,
        name: item.MenuItemText,
        description: item.Description || getRandomDescription(),
        price: item.TakeOutPrice_TL,
        image: getNextProductImage(),
        category: cat.MenuGroupKey,
        isSpicy: item.Badges?.includes('Acılı') ?? false,
        isVegetarian: item.Badges?.includes('Vejetaryen') ?? false,
        rating: 4.9,
        calories: getRandomCalories(),
        prepTime: 15 + Math.floor(Math.random() * 20),
      };

      if (hasValidCombo) {
        return {
          ...baseProduct,
          isCombo: true,
          Combo: processComboGroups(combo)
        };
      }

      return baseProduct;
    })
  );

  return { categories, products };
}
