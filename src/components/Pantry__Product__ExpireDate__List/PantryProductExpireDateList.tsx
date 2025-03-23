import {
  IonBadge,
  IonItem,
  IonLabel,
  IonList,
  IonText,
  IonSkeletonText,
  IonButton,
} from "@ionic/react";
import { useContextLanguage } from "../../context/contextLanguage";
import "./PantryProductExpireDateList.module.css";
import { text } from "./text";
import { daysUntilExpiration } from "../../utils/daysUntilExpiration";
import { useEffect } from "react";
import { useState } from "react";
import { typeExpirationData } from "../../types/typeExpirationData";
import PantryProductExpireDateUpdateModal from "../Pantry__Product__ExpireDate__Update__Modal/PantryProductExpireDateUpdateModal";
import { typePantryProduct } from "../../types/type__Pantry__Product";
import { useContextPantry } from "../../context/contextPantry";
interface ContainerProps {
  loaded: boolean;
  pantryProductUID: string;
}

const PantryProductExpireDateList: React.FC<ContainerProps> = (props) => {
  //VARIABLES ------------------------
  const { l } = useContextLanguage();
  const { pantryProducts } = useContextPantry();
  //USE STATES -----------------------
  const [expirationData, setExpirationData] = useState<typeExpirationData>({
    days: undefined,
    color: "primary",
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [pantryProduct, setPantryProduct] = useState<
    typePantryProduct | undefined
  >(undefined);
  //USE EFFECTS ----------------------

  useEffect(() => {
    const pantryProduct = pantryProducts.find(
      (pantryProduct) => pantryProduct.uid === props.pantryProductUID
    );
    const expirationData = daysUntilExpiration(pantryProduct?.expirationDate);
    setExpirationData(expirationData);
    setPantryProduct(pantryProduct);
  }, [pantryProducts, props.pantryProductUID]);
  //FUNCTIONS ------------------------
  //RETURN COMPONENT -----------------
  return (
    <>
      <IonList inset>
        <IonItem color={"light"}>
          <IonLabel>
            {text[l].title}
            <IonText color={"medium"}>
              {props.loaded ? (
                <p>{pantryProduct?.expirationDate}</p>
              ) : (
                <IonSkeletonText
                  animated={true}
                  style={{ width: "60%", height: "10px", borderRadius: "2px" }}
                />
              )}
            </IonText>
          </IonLabel>
          {props.loaded ? (
            expirationData.days !== undefined && (
              <IonBadge color={expirationData.color}>
                {expirationData.days} {text[l].days}
              </IonBadge>
            )
          ) : (
            <IonSkeletonText
              animated={true}
              style={{ width: "20%", height: "20px", borderRadius: "12px" }}
            />
          )}
        </IonItem>
        <IonItem color={"light"}>
          <IonButton
            slot="start"
            color="medium"
            fill="clear"
            disabled={!props.loaded}
            onClick={() => setIsOpen(true)}
          >
            {text[l].update}
          </IonButton>
        </IonItem>
      </IonList>
      {/* ---  MODAL ---------------------- */}
      <PantryProductExpireDateUpdateModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onDidDismiss={() => setIsOpen(false)}
        productId={props.pantryProductUID}
        currentExpirationDate={pantryProduct?.expirationDate ?? ""}
      />
    </>
  );
};

export default PantryProductExpireDateList;
