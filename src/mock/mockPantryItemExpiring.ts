import { typePantryProduct, enumPantryUnit } from "../types/typePantryProduct";

export const mockPantryItemExpiring: typePantryProduct[] = [
  // Scaduto
  {
    uid: "1",
    name: "Yogurt",
    quantity: 5,
    expirationDate: "20/03/2025",
    image: "https://ionicframework.com/docs/img/demos/avatar.svg",
    unit: enumPantryUnit.unit,
    brand: "Swiss",
    externalUID: "1",
  },
  // In scadenza
  {
    uid: "2",
    name: "Mele",
    quantity: 3,
    expirationDate: "25/03/2025",
    image: "https://ionicframework.com/docs/img/demos/avatar.svg",
    unit: enumPantryUnit.unit,
    brand: "Fruver",
    externalUID: "2",
  },

  // Non scaduto
  {
    uid: "3",
    name: "Pasta",
    quantity: 100,
    expirationDate: "30/03/2025",
    image: "https://ionicframework.com/docs/img/demos/avatar.svg",
    unit: enumPantryUnit.g,
    brand: "Barilla",
    externalUID: "3",
  },
];
