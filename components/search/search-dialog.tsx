"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMenuStore } from '@/store/menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Search, Tag, Star, Clock, Flame, Leaf } from 'lucide-react';
import { CategoryIcon } from '../layout/category-icon';
import { Badge } from '../ui/badge';
import { Price } from '../ui/price';
import { motion } from 'framer-motion';

export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const router = useRouter();
  const { products = [], categories = [] } = useMenuStore();

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(search.toLowerCase())
  );

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase()) ||
    product.description.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const onSelect = (value: string) => {
    setOpen(false);
    router.push(value);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="relative bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300 p-2 rounded-lg group">
          <Search className="h-5 w-5 text-white group-hover:scale-110 transition-transform duration-300" />
          <kbd className="absolute right-1 top-1 pointer-events-none hidden sm:inline-flex h-4 select-none items-center gap-1 rounded border bg-background/80 px-1.5 font-mono text-[10px] font-medium opacity-50">
            <span className="text-xs">⌘</span>K
          </kbd>
        </button>
      </DialogTrigger>
      <DialogContent className="p-0 gap-0 max-w-2xl">
        <DialogHeader className="px-4 pt-4 pb-2">
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Search className="h-5 w-5 text-primary" />
            Menüde Ara
          </DialogTitle>
        </DialogHeader>
        <Command shouldFilter={false} className="border-t">
          <CommandInput 
            placeholder="Ürün veya kategori ara..." 
            value={search}
            onValueChange={setSearch}
            className="border-none focus:ring-0"
          />
          <CommandList>
            <div className="px-3 pb-2">
              <p className="text-sm text-muted-foreground">
                Önerilen aramalar: <span className="text-primary">pizza, burger, salata, tatlı</span>
              </p>
            </div>
            {filteredCategories.length === 0 && filteredProducts.length === 0 && (
              <CommandEmpty className="py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                  <Tag className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="text-lg font-medium mb-2">Sonuç Bulunamadı</p>
                <p className="text-sm text-muted-foreground">
                  Farklı bir arama terimi deneyebilirsiniz
                </p>
              </CommandEmpty>
            )}
            {filteredCategories.length > 0 && (
              <CommandGroup heading="Kategoriler" className="px-2">
                <div className="grid grid-cols-2 gap-2">
                  {filteredCategories.map((category) => (
                    <CommandItem
                      key={category.id}
                      value={category.name}
                      onSelect={() => onSelect(`/category/${category.id}`)}
                      className="flex items-center gap-3 p-4 rounded-xl cursor-pointer group"
                    >
                      <div className="w-12 h-12 rounded-lg bg-secondary/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <CategoryIcon categoryId={category.id} className="h-6 w-6" />
                      </div>
                      <span className="font-medium">{category.name}</span>
                    </CommandItem>
                  ))}
                </div>
              </CommandGroup>
            )}
            {filteredProducts.length > 0 && (
              <CommandGroup heading="Ürünler" className="px-2">
                {filteredProducts.map((product) => {
                  const category = categories.find(c => c.id === product.category);
                  return (
                    <CommandItem
                      key={product.id}
                      value={product.name}
                      onSelect={() => onSelect(`/product/${product.id}`)}
                      className="flex items-center gap-4 p-4 rounded-xl cursor-pointer group"
                    >
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-secondary shrink-0 group-hover:shadow-lg transition-all">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        {product.isCombo && (
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                            <Badge className="absolute bottom-1 left-1 bg-primary/90 text-[10px]">
                              Menü
                            </Badge>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className="font-medium truncate">{product.name}</h3>
                          <Price amount={product.price} className="shrink-0 text-sm font-medium" />
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-1 mb-2">
                          {product.description}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          {category && (
                            <span className="flex items-center gap-1">
                              <CategoryIcon categoryId={category.id} className="h-3 w-3" />
                              {category.name}
                            </span>
                          )}
                          {product.rating && (
                            <span className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-400 stroke-yellow-400" />
                              {product.rating}
                            </span>
                          )}
                          {product.prepTime && (
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {product.prepTime} dk
                            </span>
                          )}
                          {product.isSpicy && (
                            <span className="flex items-center gap-1 text-red-500">
                              <Flame className="h-3 w-3" />
                              Acılı
                            </span>
                          )}
                          {product.isVegetarian && (
                            <span className="flex items-center gap-1 text-green-500">
                              <Leaf className="h-3 w-3" />
                              Vejetaryen
                            </span>
                          )}
                        </div>
                      </div>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}