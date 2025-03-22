import { createContext, useContext, useState } from "react";
import { typePantryProduct } from "../types/typePantryProduct";
import { mockPantryItemExpiring } from "../mock/mockPantryItemExpiring";
import { typeEvent__PantryProduct__Consumption } from "../types/typeEvent__PantryProduct__Consumption";
import { typeEvent__PantryProduct__Delete } from "../types/typeEvent__PantryProduct__Delete";
type typeContextPantry = {
  pantryProducts: typePantryProduct[];
  updatePantryProductQuantity: (uid: string, quantity: number) => void;
  addPantryProductConsumptionEvent: (
    event: typeEvent__PantryProduct__Consumption
  ) => Promise<void>;
  deletePantryProduct: (
    event: typeEvent__PantryProduct__Delete
  ) => Promise<void>;
  getPantryProductByUID: (
    uid: string
  ) => Promise<typePantryProduct | undefined>;
  updatePantryProductExpirationDate: (
    uid: string,
    expirationDate: string
  ) => Promise<void>;
  getLastPriceByProductID: (productID: string) => Promise<number>;
};

const ContextPantry = createContext<typeContextPantry>({
  pantryProducts: [],
  updatePantryProductQuantity: () => {},
  addPantryProductConsumptionEvent: () => Promise.resolve(),
  deletePantryProduct: () => Promise.resolve(),
  getPantryProductByUID: () => Promise.resolve(undefined),
  updatePantryProductExpirationDate: () => Promise.resolve(),
  getLastPriceByProductID: () => Promise.resolve(0),
});

export const useContextPantry = () => useContext(ContextPantry);

export const ContextPantryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Variables ------------------------
  // UseStates ---------------------------
  const [pantryProducts, setPantryProducts] = useState<typePantryProduct[]>(
    mockPantryItemExpiring
  );

  // UseEffects -----------------------
  // Functions ------------------------
  function updatePantryProductQuantity(uid: string, quantity: number) {
    setPantryProducts((prev) =>
      prev.map((pantryProduct) =>
        pantryProduct.uid === uid
          ? { ...pantryProduct, quantity }
          : pantryProduct
      )
    );
  }
  async function addPantryProductConsumptionEvent(
    event: typeEvent__PantryProduct__Consumption
  ) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(event);
  }
  async function deletePantryProduct(event: typeEvent__PantryProduct__Delete) {
    setPantryProducts((prev) =>
      prev.filter((pantryProduct) => pantryProduct.uid !== event.productUID)
    );
  }
  async function getPantryProductByUID(uid: string) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return pantryProducts.find((pantryProduct) => pantryProduct.uid === uid);
  }
  async function updatePantryProductExpirationDate(
    uid: string,
    expirationDate: string
  ) {
    setPantryProducts((prev) =>
      prev.map((pantryProduct) =>
        pantryProduct.uid === uid
          ? { ...pantryProduct, expirationDate }
          : pantryProduct
      )
    );
  }
  async function getLastPriceByProductID(productID: string) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return 2;
  }
  // Return ---------------------------
  return (
    <ContextPantry.Provider
      value={{
        pantryProducts,
        updatePantryProductQuantity,
        updatePantryProductExpirationDate,
        addPantryProductConsumptionEvent,
        deletePantryProduct,
        getPantryProductByUID,
        getLastPriceByProductID,
      }}
    >
      {children}
    </ContextPantry.Provider>
  );
};
