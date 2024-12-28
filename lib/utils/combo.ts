import { ComboGroup, ComboItem } from '@/types/api';

export function processComboGroups(groups: ComboGroup[]): ComboGroup[] {
  return groups.map(group => ({
    ...group,
    Items: group.Items.map(item => ({
      ...item,
      // Ensure default values
      DefaultQuantity: item.DefaultQuantity || 0,
      IsDefault: item.IsDefault || false,
      ExtraPriceTakeOut_TL: item.ExtraPriceTakeOut_TL || 0
    }))
  }));
}

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