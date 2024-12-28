import ProductContent from './product-content';
import { fetchMenu } from '@/lib/api';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  try {
    const menuData = await fetchMenu();
    // Extract all product IDs from the menu data
    const productIds = menuData.flatMap(category => 
      category.Items.map(item => ({
        id: item.MenuItemKey
      }))
    );
    return productIds;
  } catch (error) {
    console.error('Error generating product paths:', error);
    return [];
  }
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  try {
    const menuData = await fetchMenu();
    const productExists = menuData.some(category => 
      category.Items.some(item => item.MenuItemKey === params.id)
    );
    
    if (!productExists) {
      notFound();
    }

    return <ProductContent params={params} />;
  } catch (error) {
    console.error('Error in product page:', error);
    throw error;
  }
}