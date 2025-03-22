import { enumPantryUnit } from "../enums/enumPantryUnit";

export type typeOpenFoodBasicInfo = {
  name: string;
  image_url: string;
  brands_tags: string[];
};

export type typeOpenFoodQuantityUnitInfo = {
  product_quantity_unit: enumPantryUnit;
  product_quantity: string;
};
