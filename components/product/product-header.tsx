"use client";

import { Button } from '@/components/ui/button';
import { ChevronLeft, Home } from 'lucide-react';
import Link from 'next/link';

interface ProductHeaderProps {
  categoryId: string;
}

export function ProductHeader({ categoryId }: ProductHeaderProps) {
  return (
    <div className="flex gap-2">
      <Link href="/">
        <Button variant="ghost" size="sm" className="hover:translate-x-1 transition-transform">
          <Home className="h-4 w-4" />
        </Button>
      </Link>
      <Link href={`/category/${categoryId}`}>
        <Button variant="ghost" size="sm" className="hover:translate-x-1 transition-transform">
          <ChevronLeft className="h-4 w-4 mr-2" />
          Geri Dön
        </Button>
      </Link>
    </div>
  );
}