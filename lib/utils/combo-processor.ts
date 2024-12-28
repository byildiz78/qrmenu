"use client";

import { ComboGroup, ComboItem } from '@/types/api';

// Combo gruplarını işle ve doğrula
export function processComboGroups(groups: ComboGroup[]): ComboGroup[] {
  return groups
    .filter(group => group.Items?.length > 0) // Boş grupları filtrele
    .map(group => ({
      ...group,
      Items: group.Items.map(item => ({
        MenuItemKey: item.MenuItemKey,
        MenuItemText: item.MenuItemText,
        Description: item.Description || '',
        ExtraPriceTakeOut_TL: item.ExtraPriceTakeOut_TL || 0,
        ExtraPriceDelivery_TL: item.ExtraPriceDelivery_TL || 0,
        DefaultQuantity: item.DefaultQuantity || 0,
        IsDefault: item.IsDefault || false,
        Badges: item.Badges || []
      }))
    }));
}

// Combo seçimlerinin geçerliliğini kontrol et
export function validateComboSelections(
  groups: ComboGroup[],
  selections: Record<string, { quantity: number }[]>
): { isValid: boolean; error?: string } {
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
}

// Combo fiyatını hesapla
export function calculateComboPrice(
  basePrice: number,
  selections: Record<string, { item: ComboItem; quantity: number }[]>
): number {
  let total = basePrice;
  
  Object.values(selections).flat().forEach(selection => {
    total += selection.item.ExtraPriceTakeOut_TL * selection.quantity;
  });
  
  return total;
}