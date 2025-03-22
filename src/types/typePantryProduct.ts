import { enumPantryUnit } from "../enums/enumPantryUnit";
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
