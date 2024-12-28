"use client";

import { useState } from 'react';
import { ComboGroup as ComboGroupType, ComboItem } from '@/types/api';
import { ComboSelections } from '@/types/combo';
import { ComboGroup } from './combo-group';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ComboSelectorProps {
  groups: ComboGroupType[];
  basePrice: number;
  onAddToCart: (selections: ComboSelections) => void;
}

export function ComboSelector({ groups, basePrice, onAddToCart }: ComboSelectorProps) {
  const [selections, setSelections] = useState<ComboSelections>({});
  const { toast } = useToast();

  const validateSelections = () => {
    for (const group of groups) {
      const groupSelections = selections[group.GroupName] || [];
      const totalQuantity = groupSelections.reduce((sum, s) => sum + s.quantity, 0);
      
      if (group.IsForcedGroup && totalQuantity < group.ForcedQuantity) {
        return {
          isValid: false,
          error: `${group.GroupName} için ${group.ForcedQuantity} adet seçim yapmalısınız`
        };
      }
      
      if (group.MaxQuantity > 0 && totalQuantity > group.MaxQuantity) {
        return {
          isValid: false,
          error: `${group.GroupName} için en fazla ${group.MaxQuantity} adet seçebilirsiniz`
        };
      }
    }
    
    return { isValid: true };
  };

  const handleSelect = (groupName: string, item: ComboItem, quantity: number) => {
    setSelections(prev => {
      const group = groups.find(g => g.GroupName === groupName);
      const currentSelections = prev[groupName] || [];
      const totalQuantity = currentSelections.reduce((sum, s) => 
        s.item.MenuItemKey !== item.MenuItemKey ? sum + s.quantity : sum, 0
      ) + quantity;

      // Maksimum seçim kontrolü
      if (group?.MaxQuantity && totalQuantity > group.MaxQuantity) {
        toast({
          title: "Maksimum Seçim Sınırı",
          description: `${groupName} için en fazla ${group.MaxQuantity} adet seçebilirsiniz`,
          variant: "destructive"
        });
        return prev;
      }

      return {
        ...prev,
        [groupName]: [
          ...currentSelections.filter(s => s.item.MenuItemKey !== item.MenuItemKey),
          ...(quantity > 0 ? [{ groupName, item, quantity }] : [])
        ]
      };
    });
  };

  const handleAddToCart = () => {
    const validation = validateSelections();
    
    if (!validation.isValid) {
      toast({
        title: "Eksik Seçim",
        description: validation.error,
        variant: "destructive"
      });
      return;
    }
    
    onAddToCart(selections);
  };

  const calculateTotal = () => {
    let total = basePrice;
    Object.values(selections).flat().forEach(selection => {
      total += selection.item.ExtraPriceTakeOut_TL * selection.quantity;
    });
    return total;
  };

  return (
    <motion.div 
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <AnimatePresence mode="wait">
        {groups.map((group) => (
          <motion.div
            key={group.GroupName}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <ComboGroup
              group={group}
              selections={selections}
              onSelect={handleSelect}
            />
          </motion.div>
        ))}
      </AnimatePresence>
      
      <div className="sticky bottom-0 bg-background/95 backdrop-blur-lg border-t p-4">
        <Button 
          className="w-full gap-2" 
          size="lg"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="h-4 w-4" />
          Sepete Ekle ({calculateTotal().toFixed(2)} ₺)
        </Button>
      </div>
    </motion.div>
  );
}