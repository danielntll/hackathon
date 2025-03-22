import { createContext, useContext, useState } from "react";
import { typePantryProduct } from "../types/typePantryProduct";
import { mockPantryItemExpiring } from "../mock/mockPantryItemExpiring";
import { typeEvent__PantryProduct__Consumption } from "../types/typeEvent__PantryProduct__Consumption";
import { typeEvent__PantryProduct__Delete } from "../types/typeEvent__PantryProduct__Delete";
type typeContextPantry = {
  pantryProducts: typePantryProduct[];
  updatePantryProductQuantity: (uid: string, quantity: number) => void;
  addConsumptionEvent: (
    event: typeEvent__PantryProduct__Consumption
  ) => Promise<void>;
  deletePantryProduct: (uid: string) => Promise<void>;
};

const ContextPantry = createContext<typeContextPantry>({
  pantryProducts: [],
  updatePantryProductQuantity: () => {},
  addConsumptionEvent: () => Promise.resolve(),
  deletePantryProduct: () => Promise.resolve(),
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
  async function addConsumptionEvent(
    event: typeEvent__PantryProduct__Consumption
  ) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(event);
  }
  async function deletePantryProduct(uid: string) {
    setPantryProducts((prev) =>
      prev.filter((pantryProduct) => pantryProduct.uid !== uid)
    );
  }
  // Return ---------------------------
  return (
    <ContextPantry.Provider
      value={{
        pantryProducts,
        updatePantryProductQuantity,
        addConsumptionEvent,
        deletePantryProduct,
      }}
    >
      {children}
    </ContextPantry.Provider>
  );
};
