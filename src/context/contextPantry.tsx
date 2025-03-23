import { createContext, useContext, useState, useEffect } from "react";
import { typePantryProduct } from "../types/type__Pantry__Product";
import { typeEvent__PantryProduct__Consumption } from "../types/typeEvent__PantryProduct__Consumption";
import { typeEvent__PantryProduct__Delete } from "../types/typeEvent__PantryProduct__Delete";
import { typePantryProductInputsRequired } from "../types/type__Pantry__Product__Inputs__Required";
import { typePantryProductPriceRecordInput } from "../types/type__Pantry__Product__Price__Record__Input";
import { useDataContext } from "./contextData";
import { Timestamp } from "firebase/firestore";

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
  addPantryProduct: (
    inputs: typePantryProductInputsRequired
  ) => Promise<string | undefined>;
  getTotalSpent: () => Promise<number>;
  getTotalSpentByDay: (day: Date) => Promise<number>;
  getConsumptionEventsByProductID: (
    productID: string
  ) => Promise<typeEvent__PantryProduct__Consumption[]>;
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
  addPantryProduct: () => Promise.resolve(""),
  getTotalSpent: () => Promise.resolve(0),
  getTotalSpentByDay: () => Promise.resolve(0),
  getConsumptionEventsByProductID: () => Promise.resolve([]),
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
    getPaginationCollectionData,
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
    const result = await getPaginationCollectionData<typePantryProduct>(
      COLLECTION_PANTRY,
      100,
      undefined,
      ["itemCount", ">", 0]
    );
    if (result) {
      setPantryProducts(result.data);
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
      const newQuantity = (product.quantity ?? 0) - event.quantity;
      await updatePantryProductQuantity(event.productUID, newQuantity);
      if (newQuantity === 0) {
        await deletePantryProduct({
          productUID: event.productUID,
          description: "Consumo",
        });
      }
    }
  }

  async function deletePantryProduct(event: typeEvent__PantryProduct__Delete) {
    await updateDocument(COLLECTION_PANTRY, event.productUID, { itemCount: 0 });
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
    const result = await getPaginationCollectionData<{
      price: number;
      openFoodProductID: string;
      createdAt: string;
      byUserUID: string;
    }>(COLLECTION_PRICES, 100, undefined, ["byUserUID", "==", "123"]);

    if (!result || result.data.length === 0) return 0;

    const filteredData = result.data
      .filter((item) => item.openFoodProductID === productID)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

    if (filteredData.length === 0) return 0;

    return filteredData[0].price;
  }

  async function getTotalSpent() {
    const result = await getPaginationCollectionData<{
      price: number;
      openFoodProductID: string;
      createdAt: string;
      byUserUID: string;
    }>(COLLECTION_PRICES, 100, undefined, ["byUserUID", "==", "123"]);

    if (!result || result.data.length === 0) return 0;

    return result.data.reduce((acc, item) => acc + item.price, 0);
  }

  async function getTotalSpentByDay(today: Date) {
    const result = await getPaginationCollectionData<{
      price: number;
      openFoodProductID: string;
      createdAt: Timestamp;
      byUserUID: string;
    }>(COLLECTION_PRICES, 100, undefined, ["byUserUID", "==", "123"]);

    if (!result || result.data.length === 0) return 0;
    today.setHours(0, 0, 0, 0);

    return result.data.reduce((acc, item) => {
      const itemDate = new Date(item.createdAt.toDate());
      console.log("itemDate", itemDate);
      console.log("today", today);
      itemDate.setHours(0, 0, 0, 0);

      if (itemDate.getTime() === today.getTime()) {
        return acc + item.price;
      }
      return acc;
    }, 0);
  }

  async function getConsumptionEventsByProductID(productID: string) {
    const result =
      await getPaginationCollectionData<typeEvent__PantryProduct__Consumption>(
        COLLECTION_CONSUMPTION,
        100,
        undefined,
        ["productUID", "==", productID]
      );
    console.log("result", result);
    return result?.data || [];
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
      return newProduct.uid;
    }
    return undefined;
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
        getTotalSpent,
        getTotalSpentByDay,
        getConsumptionEventsByProductID,
      }}
    >
      {children}
    </ContextPantry.Provider>
  );
};
