import { IonAvatar, IonItem, IonLabel } from "@ionic/react";
import { IonList } from "@ionic/react";
import { useContextLanguage } from "../../context/contextLanguage";
import { useDataContext } from "../../context/contextData";
import { useEffect, useState } from "react";
import "./ExpensesOverviewStrendMonth.module.css";
import { text } from "./text";
import { Timestamp } from "firebase/firestore";
import { getBasicProductInfo } from "../../utils/openFoodApis";
import { typeOpenFoodBasicInfo } from "../../types/type__Open__Food__Basic__Info";

interface ContainerProps {
  month: Date;
}

type PriceRecord = {
  price: number;
  openFoodProductID: string;
  createdAt: Timestamp;
  byUserUID: string;
  productName: string;
};

const ExpensesOverviewStrendMonth: React.FC<ContainerProps> = (props) => {
  //VARIABLES ------------------------
  const { l } = useContextLanguage();
  const { getPaginationCollectionDataWithMultipleWhere } = useDataContext();

  //USE STATES -----------------------
  const [products, setProducts] = useState<PriceRecord[]>([]);
  const [totalSpent, setTotalSpent] = useState(0);
  const [openFoodProducts, setOpenFoodProducts] = useState<
    Record<string, typeOpenFoodBasicInfo>
  >({});

  //USE EFFECTS ----------------------
  useEffect(() => {
    fetchMonthProducts();
  }, [props.month]);

  useEffect(() => {
    fetchOpenFoodProducts();
  }, [products]);

  //FUNCTIONS ------------------------
  async function fetchOpenFoodProducts() {
    try {
      // Otteniamo gli ID univoci
      const uniqueProductIds = Array.from(
        new Set(products.map((product) => product.openFoodProductID))
      );

      // Per ogni ID univoco, recuperiamo le informazioni se non le abbiamo già
      const newProducts: Record<string, typeOpenFoodBasicInfo> = {
        ...openFoodProducts,
      };

      await Promise.all(
        uniqueProductIds.map(async (id) => {
          if (!openFoodProducts[id]) {
            try {
              const info = await getBasicProductInfo(id);
              newProducts[id] = info;
            } catch (error) {
              console.error(
                `Errore nel recupero delle info per il prodotto ${id}:`,
                error
              );
            }
          }
        })
      );

      setOpenFoodProducts(newProducts);
    } catch (error) {
      console.error("Errore nel recupero delle informazioni OpenFood:", error);
    }
  }

  async function fetchMonthProducts() {
    try {
      // Creiamo le date di inizio e fine mese
      const startOfMonth = new Date(
        props.month.getFullYear(),
        props.month.getMonth(),
        1
      );
      const endOfMonth = new Date(
        props.month.getFullYear(),
        props.month.getMonth() + 1,
        0
      );

      // Convertiamo le date in Timestamp di Firebase
      const startTimestamp = Timestamp.fromDate(startOfMonth);
      const endTimestamp = Timestamp.fromDate(endOfMonth);

      const result =
        await getPaginationCollectionDataWithMultipleWhere<PriceRecord>(
          "priceRecords",
          100,
          undefined,
          [
            ["byUserUID", "==", "123"],
            ["createdAt", ">=", startTimestamp],
            ["createdAt", "<=", endTimestamp],
          ]
        );

      if (result) {
        setProducts(result.data);
        const total = result.data.reduce((acc, item) => acc + item.price, 0);
        setTotalSpent(total);
      }
    } catch (error: any) {
      console.error("Errore durante il recupero dei prodotti:", error);
      if (error.message.includes("requires an index")) {
        console.log(
          "URL per creare l'indice:",
          error.message.split("here: ")[1]
        );
      }
    }
  }

  //RETURN COMPONENT -----------------
  return (
    <IonList inset>
      <IonItem color={"light"}>
        <IonLabel>
          <h2>
            {props.month.toLocaleString("default", { month: "long" })} - Totale:
            €{totalSpent.toFixed(2)}
          </h2>
        </IonLabel>
      </IonItem>

      {products.map((product, index) => (
        <IonItem key={index} color={"light"}>
          <IonAvatar className="ion-margin-end">
            <img
              src={openFoodProducts[product.openFoodProductID]?.image_url}
              alt={openFoodProducts[product.openFoodProductID]?.name}
            />
          </IonAvatar>
          <IonLabel>
            <h3>
              {openFoodProducts[product.openFoodProductID]?.name ||
                "Prodotto senza nome"}
            </h3>
            <p>
              €{product.price.toFixed(2)} -{" "}
              {product.createdAt.toDate().toLocaleDateString()}
            </p>
          </IonLabel>
        </IonItem>
      ))}

      {products.length === 0 && (
        <IonItem color={"light"}>
          <IonLabel>
            <p>Nessun prodotto acquistato in questo mese</p>
          </IonLabel>
        </IonItem>
      )}
    </IonList>
  );
};

export default ExpensesOverviewStrendMonth;
