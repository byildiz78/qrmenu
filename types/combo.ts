export interface ComboSelection {
  groupName: string;
  item: ComboItem;
  quantity: number;
}

export interface ComboSelections {
  [groupName: string]: ComboSelection[];
}

export interface ComboValidation {
  isValid: boolean;
  errors: { [groupName: string]: string };
}