import { createContext, useContext, useState, useEffect } from "react";
import { typePantryProduct } from "../types/type__Pantry__Product";
import { typeEvent__PantryProduct__Consumption } from "../types/typeEvent__PantryProduct__Consumption";
import { typeEvent__PantryProduct__Delete } from "../types/typeEvent__PantryProduct__Delete";
import { typePantryProductInputsRequired } from "../types/type__Pantry__Product__Inputs__Required";
import { typePantryProductPriceRecordInput } from "../types/type__Pantry__Product__Price__Record__Input";
import { useDataContext } from "./contextData";

type typeContextPantry = {
  pantryProducts: typePantryProduct[];
  updatePantryProductQuantity: (uid: string, quantity: number) => Promise<void>;
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
  addPantryProductPriceRecord: (
    inputs: typePantryProductPriceRecordInput
  ) => Promise<void>;
  addPantryProduct: (inputs: typePantryProductInputsRequired) => Promise<void>;
};

const ContextPantry = createContext<typeContextPantry>({
  pantryProducts: [],
  updatePantryProductQuantity: () => Promise.resolve(),
  addPantryProductConsumptionEvent: () => Promise.resolve(),
  deletePantryProduct: () => Promise.resolve(),
  getPantryProductByUID: () => Promise.resolve(undefined),
  updatePantryProductExpirationDate: () => Promise.resolve(),
  getLastPriceByProductID: () => Promise.resolve(0),
  addPantryProductPriceRecord: () => Promise.resolve(),
  addPantryProduct: () => Promise.resolve(),
});

export const useContextPantry = () => useContext(ContextPantry);

export const ContextPantryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Variables ------------------------
  const {
    getCollectionData,
    addDocument,
    updateDocument,
    deleteDocument,
    getDocumentById,
  } = useDataContext();
  const COLLECTION_PANTRY = "pantryProducts";
  const COLLECTION_CONSUMPTION = "consumptionEvents";
  const COLLECTION_PRICES = "priceRecords";

  // UseStates ---------------------------
  const [pantryProducts, setPantryProducts] = useState<typePantryProduct[]>([]);

  // UseEffects -----------------------
  useEffect(() => {
    fetchPantryProducts();
  }, []);

  // Functions ------------------------
  async function fetchPantryProducts() {
    const data = await getCollectionData<typePantryProduct>(COLLECTION_PANTRY);
    if (data) {
      setPantryProducts(data);
    }
  }

  async function updatePantryProductQuantity(uid: string, quantity: number) {
    await updateDocument(COLLECTION_PANTRY, uid, { quantity });
    setPantryProducts((prev) =>
      prev.map((product) =>
        product.uid === uid ? { ...product, quantity } : product
      )
    );
  }

  async function addPantryProductConsumptionEvent(
    event: typeEvent__PantryProduct__Consumption
  ) {
    await addDocument(COLLECTION_CONSUMPTION, event);
    const product = pantryProducts.find((p) => p.uid === event.productUID);
    if (product) {
      await updatePantryProductQuantity(
        event.productUID,
        (product.quantity ?? 0) - event.quantity
      );
    }
  }

  async function deletePantryProduct(event: typeEvent__PantryProduct__Delete) {
    await deleteDocument(COLLECTION_PANTRY, event.productUID);
    setPantryProducts((prev) =>
      prev.filter((product) => product.uid !== event.productUID)
    );
  }

  async function getPantryProductByUID(uid: string) {
    const product = pantryProducts.find(
      (pantryProduct) => pantryProduct.uid === uid
    );
    if (product) {
      return product;
    }
    const productFromDB = await getDocumentById<typePantryProduct>(
      COLLECTION_PANTRY,
      uid
    );
    return productFromDB || undefined;
  }

  async function updatePantryProductExpirationDate(
    uid: string,
    expirationDate: string
  ) {
    await updateDocument(COLLECTION_PANTRY, uid, { expirationDate });
    setPantryProducts((prev) =>
      prev.map((product) =>
        product.uid === uid ? { ...product, expirationDate } : product
      )
    );
  }

  async function getLastPriceByProductID(productID: string) {
    const prices = await getCollectionData<{ price: number }>(
      COLLECTION_PRICES
    );
    if (!prices || prices.length === 0) return 0;
    return prices[prices.length - 1].price;
  }

  async function addPantryProductPriceRecord(
    inputs: typePantryProductPriceRecordInput
  ) {
    await addDocument(COLLECTION_PRICES, inputs);
  }

  async function addPantryProduct(inputs: typePantryProductInputsRequired) {
    const cleanInputs = removeUndefinedFields(inputs);
    console.log("cleanInputs", cleanInputs);
    const newProduct = await addDocument<typePantryProduct>(
      COLLECTION_PANTRY,
      cleanInputs as typePantryProduct
    );
    if (newProduct) {
      setPantryProducts((prev) => [...prev, newProduct]);
    }
  }
  function removeUndefinedFields<T extends object>(obj: T): Partial<T> {
    const cleanObj = { ...obj };
    Object.keys(cleanObj).forEach((key) => {
      if (cleanObj[key as keyof T] === undefined) {
        delete cleanObj[key as keyof T];
      }
    });
    return cleanObj;
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
        addPantryProductPriceRecord,
        addPantryProduct,
      }}
    >
      {children}
    </ContextPantry.Provider>
  );
};
