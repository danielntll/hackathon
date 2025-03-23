export type typePantryProductInputsRequired = {
  productID: string;
  itemCount: number;
  quantity: number | undefined;
  unit: string;
  pricePerItem: number | undefined;
  date: string | undefined;
  listUID?: string;
};
