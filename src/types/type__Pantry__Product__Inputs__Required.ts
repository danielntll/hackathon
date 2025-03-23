export interface typePantryProductInputsRequired {
  openFoodProductID?: string;
  itemCount: number;
  quantity: number | undefined;
  unit: string;
  pricePerItem: number | undefined;
  expirationDate: string | undefined;
  listUID?: string;
}
