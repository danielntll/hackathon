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

interface ContainerProps {
  loaded: boolean;
  pantryProductUID: string;
  pantryProductQuantity: number;
  pantryProductExpireDate: string;
}

const PantryProductExpireDateList: React.FC<ContainerProps> = (props) => {
  //VARIABLES ------------------------
  const { l } = useContextLanguage();
  //USE STATES -----------------------
  const [expirationData, setExpirationData] = useState<typeExpirationData>({
    days: 0,
    color: "primary",
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  //USE EFFECTS ----------------------
  useEffect(() => {
    const expirationData = daysUntilExpiration(props.pantryProductExpireDate);
    setExpirationData(expirationData);
  }, [props.pantryProductExpireDate]);
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
                <p>{props.pantryProductExpireDate}</p>
              ) : (
                <IonSkeletonText
                  animated={true}
                  style={{ width: "60%", height: "10px", borderRadius: "2px" }}
                />
              )}
            </IonText>
          </IonLabel>
          {props.loaded ? (
            <IonBadge color={expirationData.color}>
              {expirationData.days} {text[l].days}
            </IonBadge>
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
        currentExpirationDate={props.pantryProductExpireDate}
      />
    </>
  );
};

export default PantryProductExpireDateList;
