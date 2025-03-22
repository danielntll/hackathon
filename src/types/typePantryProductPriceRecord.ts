import { typeFirebaseDataStructure } from "./typeFirebaseDataStructure";

export interface typePantryProductPriceRecord
  extends typeFirebaseDataStructure {
  price: number;
  date: string;
  supermarket?: string;
  isPromotion?: boolean;
}
