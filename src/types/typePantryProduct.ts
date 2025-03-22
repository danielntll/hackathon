import { typeFirebaseDataStructure } from "./typeFirebaseDataStructure";

export interface typePantryProduct extends typeFirebaseDataStructure {
  name: string;
  quantity: number;
  expirationDate: string;
  image: string;
  unit: enumPantryUnit;
  brand: string;
  externalUID?: string;
}

export enum enumPantryUnit {
  unit = "unit",
  g = "g",
  ml = "ml",
  l = "l",
  kg = "kg",
  pc = "pc",
}
