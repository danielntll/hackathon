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
import { useState } from "react";
import PantryProductDeleteModal from "../Pantry__Product__Delete__Modal/PantryProductDeleteModal";

interface ContainerProps {
  pantryProductUID: string;
  pantryProductQuantity: number;
  pantryProductUnit: string;
  loaded: boolean;
}

const PantryProductManageQuantity: React.FC<ContainerProps> = (props) => {
  //VARIABLES ------------------------
  const { l } = useContextLanguage();
  //USE STATES -----------------------
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false);
  //USE EFFECTS ----------------------
  //FUNCTIONS ------------------------
  //RETURN COMPONENT -----------------
  return (
    <>
      <IonList inset>
        <IonItem color={"light"}>
          <IonLabel>
            {text[l].quantity}
            <IonText color={"medium"}>
              <p>
                {text[l].unit}: {props.pantryProductUnit}
              </p>
            </IonText>
          </IonLabel>
          <IonNote className="ion-margin-end">
            {props.loaded ? (
              props.pantryProductQuantity
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
            disabled={props.pantryProductQuantity === 0 || !props.loaded}
            onClick={() => setIsOpenDelete(true)}
          >
            {text[l].delete}
          </IonButton>
          <IonButton
            slot="end"
            fill="clear"
            disabled={props.pantryProductQuantity === 0 || !props.loaded}
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
        pantryProductUnit={props.pantryProductUnit}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onDidDismiss={() => setIsOpen(false)}
        quantity={props.pantryProductQuantity}
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
