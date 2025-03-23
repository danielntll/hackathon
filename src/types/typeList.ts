import { typeFirebaseDataStructure } from "./typeFirebaseDataStructure";

export interface typeList extends typeFirebaseDataStructure {
  name: string;
  productsIDs: typeListProduct[];
}

export interface typeListProduct {
  productID: string;
  quantity: number;
}
