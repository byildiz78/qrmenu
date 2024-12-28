"use client";

import { ComboGroup, ComboItem } from '@/types/api';
import { Button } from '@/components/ui/button';
import { Price } from '@/components/ui/price';
import { Minus, Plus } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface ComboGroupItemProps {
  item: ComboItem;
  group: ComboGroup;
  quantity: number;
  onSelect: (quantity: number) => void;
}

export function ComboGroupItem({ item, group, quantity, onSelect }: ComboGroupItemProps) {
  const canIncrease = group.MaxQuantity === 0 || quantity < group.MaxQuantity;
  
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-medium">{item.MenuItemText}</h4>
          {item.ExtraPriceTakeOut_TL > 0 && (
            <Price 
              amount={item.ExtraPriceTakeOut_TL} 
              className="text-sm text-muted-foreground"
            />
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            disabled={quantity === 0}
            onClick={() => onSelect(Math.max(0, quantity - 1))}
          >
            <Minus className="h-4 w-4" />
          </Button>
          
          <span className="w-8 text-center">{quantity}</span>
          
          <Button
            variant="outline"
            size="icon"
            disabled={!canIncrease}
            onClick={() => onSelect(quantity + 1)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}