import { createContext, useContext, useState } from "react";
import { typePantryProduct } from "../types/typePantryProduct";
import { mockPantryItemExpiring } from "../mock/mockPantryItemExpiring";
type typeContextPantry = {
  pantryProducts: typePantryProduct[];
  updatePantryProductQuantity: (uid: string, quantity: number) => void;
};

const ContextPantry = createContext<typeContextPantry>({
  pantryProducts: [],
  updatePantryProductQuantity: () => {},
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
  // Return ---------------------------
  return (
    <ContextPantry.Provider
      value={{ pantryProducts, updatePantryProductQuantity }}
    >
      {children}
    </ContextPantry.Provider>
  );
};
