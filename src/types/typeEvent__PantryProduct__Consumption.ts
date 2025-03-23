import { enumMealType } from "../enums/enumMealType";
import { typeFirebaseDataStructure } from "./typeFirebaseDataStructure";

export interface typeEvent__PantryProduct__Consumption
  extends typeFirebaseDataStructure {
  productUID: string;
  openFoodProductID: string;
  quantity: number;
  date: string;
  mealType: enumMealType;
}
