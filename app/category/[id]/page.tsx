import { fetchMenu } from '@/lib/api';
import CategoryContent from './category-content';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  try {
    const menuData = await fetchMenu();
    return menuData.map((category) => ({
      id: category.MenuGroupKey,
    }));
  } catch (error) {
    console.error('Error generating category paths:', error);
    return [];
  }
}

interface CategoryPageProps {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  try {
    const menuData = await fetchMenu();
    const categoryExists = menuData.some(cat => cat.MenuGroupKey === params.id);
    
    if (!categoryExists) {
      notFound();
    }

    return <CategoryContent params={params} />;
  } catch (error) {
    console.error('Error in category page:', error);
    throw error;
  }
}
