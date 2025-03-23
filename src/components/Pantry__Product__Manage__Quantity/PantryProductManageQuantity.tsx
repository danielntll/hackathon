import {
  IonList,
  IonLabel,
  IonItem,
  IonNote,
  IonButton,
  IonIcon,
  IonSkeletonText,
  IonText,
} from "@ionic/react";
import { useContextLanguage } from "../../context/contextLanguage";
import "./PantryProductManageQuantity.module.css";
import { text } from "./text";
import { restaurantOutline } from "ionicons/icons";
import PantryProductConsumeModal from "../Pantry__Product__Consume__Modal/PantryProductConsumeModal";
import { useEffect, useState } from "react";
import PantryProductDeleteModal from "../Pantry__Product__Delete__Modal/PantryProductDeleteModal";
import { typePantryProduct } from "../../types/type__Pantry__Product";
import { useContextPantry } from "../../context/contextPantry";
interface ContainerProps {
  pantryProductUID: string;
  loaded: boolean;
}

const PantryProductManageQuantity: React.FC<ContainerProps> = (props) => {
  //VARIABLES ------------------------
  const { l } = useContextLanguage();
  const { pantryProducts } = useContextPantry();
  //USE STATES -----------------------
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false);
  const [pantryProduct, setPantryProduct] = useState<
    typePantryProduct | undefined
  >(undefined);
  //USE EFFECTS ----------------------
  useEffect(() => {
    const fetchPantryProduct = async () => {
      const pantryProduct = pantryProducts.find(
        (pantryProduct) => pantryProduct.uid === props.pantryProductUID
      );
      setPantryProduct(pantryProduct);
    };
    fetchPantryProduct();
  }, [props.pantryProductUID, pantryProducts]);
  //FUNCTIONS ------------------------
  //RETURN COMPONENT -----------------
  return (
    <>
      <IonList inset>
        <IonItem color={"light"}>
          <IonLabel>{text[l].pieces}</IonLabel>
          <IonNote>{pantryProduct?.itemCount}</IonNote>
        </IonItem>
        <IonItem color={"light"}>
          <IonLabel>
            {text[l].quantity}
            <IonText color={"medium"}>
              <p>
                {text[l].unit}: {pantryProduct?.unit}
              </p>
            </IonText>
          </IonLabel>
          <IonNote>
            {props.loaded ? (
              pantryProduct?.quantity
            ) : (
              <IonSkeletonText
                animated={true}
                style={{ width: "40px", height: "25px", borderRadius: "8px" }}
              />
            )}
          </IonNote>
        </IonItem>
        <IonItem color={"light"}>
          <IonButton
            slot="start"
            fill="clear"
            color="danger"
            disabled={
              pantryProduct?.quantity === 0 ||
              !props.loaded ||
              pantryProduct === undefined
            }
            onClick={() => setIsOpenDelete(true)}
          >
            {text[l].delete}
          </IonButton>
          <IonButton
            slot="end"
            fill="clear"
            disabled={
              pantryProduct?.quantity === 0 ||
              !props.loaded ||
              pantryProduct === undefined
            }
            color="primary"
            onClick={() => setIsOpen(true)}
          >
            {text[l].consume}
            <IonIcon
              className="ion-margin-start-icon"
              icon={restaurantOutline}
            />
          </IonButton>
        </IonItem>
      </IonList>

      {/* ----------------- MODAL ----------------------*/}
      <PantryProductConsumeModal
        openFoodProductID={pantryProduct?.openFoodProductID ?? ""}
        pantryProductUnit={pantryProduct?.unit ?? ""}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onDidDismiss={() => setIsOpen(false)}
        quantity={pantryProduct?.quantity ?? 0}
        pantryProductUID={props.pantryProductUID}
      />
      <PantryProductDeleteModal
        isOpen={isOpenDelete}
        setIsOpen={setIsOpenDelete}
        onDidDimiss={() => setIsOpenDelete(false)}
        pantryProductUID={props.pantryProductUID}
      />
    </>
  );
};

export default PantryProductManageQuantity;
