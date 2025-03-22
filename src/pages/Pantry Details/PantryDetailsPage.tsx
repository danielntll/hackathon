import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useContextLanguage } from "../../context/contextLanguage";
import styles from "./PantryDetailsPage.module.css";
import { text } from "./text";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { route__HomePage } from "../Home/route";
import PantryProductBaseInfo from "../../components/Pantry__Product__Base__Info/PantryProductBaseInfo";
import { route__PantryDetailsPage } from "./route";
import { typePantryProduct } from "../../types/typePantryProduct";
import { mockPantryItemExpiring } from "../../mock/mockPantryItemExpiring";
import PantryProductManageQuantity from "../../components/Pantry__Product__Manage__Quantity/PantryProductManageQuantity";
import PantryProductExpireDateList from "../../components/Pantry__Product__ExpireDate__List/PantryProductExpireDateList";

const PantryDetailsPage: React.FC = () => {
  //VARIABLES ------------------------
  const { l } = useContextLanguage();
  const { pantryProductID }: any = useParams<any>();
  //USE STATES -----------------------
  const [pantryProduct, setPantryProduct] = useState<
    typePantryProduct | undefined
  >(undefined);
  const [loaded, setLoaded] = useState<boolean>(false);
  //USE EFFECTS ----------------------
  useEffect(() => {
    if (pantryProductID) {
      _fetchPantryProduct(pantryProductID);
    }
  }, [pantryProductID]);
  //FUNCTIONS ------------------------
  async function _fetchPantryProduct(pantryProductID: string) {
    setLoaded(false);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const pantryProduct = mockPantryItemExpiring.find(
      (pantryProduct: typePantryProduct) =>
        pantryProduct.uid === pantryProductID
    );
    setPantryProduct(pantryProduct);
    setLoaded(true);
  }
  //RETURN COMPONENT -----------------
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              aria-hidden
              defaultHref={route__HomePage.path}
              text={text[l].back}
            />
          </IonButtons>
          <IonTitle>{route__PantryDetailsPage.tab[l]}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{route__PantryDetailsPage.tab[l]}</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* ----------------- PAGE CONTENT ------------------*/}
        <div className={styles.content}>
          <PantryProductBaseInfo
            loaded={loaded}
            subtitle={pantryProduct?.brand ?? ""}
            title={pantryProduct?.name ?? ""}
            imageUrl={pantryProduct?.image ?? ""}
          />
          <PantryProductManageQuantity
            loaded={loaded}
            pantryProductUID={pantryProduct?.uid ?? ""}
            pantryProductQuantity={pantryProduct?.quantity ?? 0}
          />
          <PantryProductExpireDateList
            loaded={loaded}
            pantryProductUID={pantryProduct?.uid ?? ""}
            pantryProductQuantity={pantryProduct?.quantity ?? 0}
            pantryProductExpireDate={pantryProduct?.expirationDate ?? ""}
          />
        </div>
        {/* ----------------- EXTRA UI ----------------------*/}
      </IonContent>
    </IonPage>
  );
};

export default PantryDetailsPage;
