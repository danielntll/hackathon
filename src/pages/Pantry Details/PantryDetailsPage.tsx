import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonSegmentContent,
  IonSegmentView,
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
import { typePantryProduct } from "../../types/type__Pantry__Product";
import PantryProductManageQuantity from "../../components/Pantry__Product__Manage__Quantity/PantryProductManageQuantity";
import PantryProductExpireDateList from "../../components/Pantry__Product__ExpireDate__List/PantryProductExpireDateList";
import { useContextPantry } from "../../context/contextPantry";
import { typeOpenFoodBasicInfo } from "../../types/typeOpenFoodBasicInfo";
import { getBasicProductInfo } from "../../utils/openFoodApis";
import PantryProductStatsConsumpionList from "../../components/Pantry__Product__Stats__Consumpion__List/PantryProductStatsConsumpionList";
const PantryDetailsPage: React.FC = () => {
  //VARIABLES ------------------------
  const { l } = useContextLanguage();
  const { pantryProductID }: any = useParams<any>();
  const { getPantryProductByUID } = useContextPantry();
  //USE STATES -----------------------
  const [pantryProduct, setPantryProduct] = useState<
    typePantryProduct | undefined
  >(undefined);

  const [openFoodProductBasicInfo, setOpenFoodProductBasicInfo] = useState<
    typeOpenFoodBasicInfo | undefined
  >(undefined);
  const [loaded, setLoaded] = useState<boolean>(false);
  //USE EFFECTS ----------------------
  useEffect(() => {
    if (pantryProductID) {
      loadPantryProduct(pantryProductID);
    }
  }, [pantryProductID]);
  //FUNCTIONS ------------------------
  async function loadPantryProduct(pantryProductID: string) {
    setLoaded(false);
    const pantryProduct = await getPantryProductByUID(pantryProductID);
    setPantryProduct(pantryProduct);
    const openFoodProductBasicInfo = await getBasicProductInfo(
      pantryProduct?.openFoodProductID ?? ""
    );
    setOpenFoodProductBasicInfo(openFoodProductBasicInfo);
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
            subtitle={openFoodProductBasicInfo?.brands_tags.join(", ") ?? ""}
            title={openFoodProductBasicInfo?.name ?? ""}
            imageUrl={openFoodProductBasicInfo?.image_url ?? ""}
          />
        </div>
        <div className="ion-padding">
          <IonSegment value="dispensa">
            <IonSegmentButton value="dispensa" contentId="dispensa">
              <IonLabel>{text[l].dispensa}</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="descrizione" contentId="descrizione">
              <IonLabel>{text[l].descrizione}</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </div>

        <IonSegmentView>
          <IonSegmentContent id="dispensa">
            <div>
              <IonList inset>
                <IonItem color="light">
                  <IonLabel>
                    <h2>Prezzo acquisto</h2>
                  </IonLabel>
                  <IonNote>{pantryProduct?.pricePerItem} €</IonNote>
                </IonItem>
              </IonList>
              <PantryProductExpireDateList
                loaded={loaded}
                pantryProductUID={pantryProduct?.uid ?? ""}
              />
              <PantryProductManageQuantity
                loaded={loaded}
                pantryProductUID={pantryProduct?.uid ?? ""}
              />
              <PantryProductStatsConsumpionList
                loaded={loaded}
                pantryProductUID={pantryProduct?.uid ?? ""}
                openFoodProductID={pantryProduct?.openFoodProductID ?? ""}
              />
            </div>
          </IonSegmentContent>
          <IonSegmentContent id="descrizione">
            <div>CHIAMATA API PER RECUPERARE LA DESCRIZIONE</div>
          </IonSegmentContent>
        </IonSegmentView>
        {/* ----------------- EXTRA UI ----------------------*/}
      </IonContent>
    </IonPage>
  );
};

export default PantryDetailsPage;
