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
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        currentMenuLastUpdateDateTime: "2000-01-01"
      })
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data: MenuApiResponse = await response.json();
    return data.d.Menu;
  } catch (error) {
    console.error('Error fetching menu:', error);
    throw error;
  }
}

export function mapApiDataToApp(apiData: ApiCategory[]): { 
  categories: Category[],
  products: Product[] 
} {
  const categories: Category[] = apiData.map(cat => ({
    id: cat.MenuGroupKey,
    name: cat.MenuGroupText,
    image: getNextCategoryImage()
  }));

  const products: Product[] = apiData.flatMap(cat => 
    cat.Items.map(item => {
      // Combo kontrolü ve işleme
      const hasValidCombo = item.Combo?.length > 0 && 
        item.Combo.some(group => group.Items?.length > 0);

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
          Combo: processComboGroups(item.Combo!)
        };
      }

      return baseProduct;
    })
  );

  return { categories, products };
}