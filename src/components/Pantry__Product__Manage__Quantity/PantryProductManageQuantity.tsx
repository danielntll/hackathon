import {
  IonList,
  IonLabel,
  IonItem,
  IonNote,
  IonButton,
  IonIcon,
  IonSkeletonText,
} from "@ionic/react";
import { useContextLanguage } from "../../context/contextLanguage";
import "./PantryProductManageQuantity.module.css";
import { text } from "./text";
import { restaurant } from "ionicons/icons";
import PantryProductConsumeModal from "../Pantry__Product__Consume__Modal/PantryProductConsumeModal";
import { useState } from "react";

interface ContainerProps {
  pantryProductUID: string;
  pantryProductQuantity: number;
  loaded: boolean;
}

const PantryProductManageQuantity: React.FC<ContainerProps> = (props) => {
  //VARIABLES ------------------------
  const { l } = useContextLanguage();
  //USE STATES -----------------------
  const [isOpen, setIsOpen] = useState(false);
  //USE EFFECTS ----------------------
  //FUNCTIONS ------------------------
  //RETURN COMPONENT -----------------
  return (
    <>
      <IonList inset>
        <IonItem color={"light"}>
          <IonLabel>
            <p>Quantità</p>
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
          <IonButton
            disabled={!props.loaded}
            fill="solid"
            color="primary"
            onClick={() => setIsOpen(true)}
          >
            <IonIcon icon={restaurant} />
          </IonButton>
        </IonItem>
      </IonList>

      <div className="ion-padding-horizontal">
        <IonLabel>
          <p>
            Clicca sul pulsante <IonIcon icon={restaurant} /> per registrare un
            consumo per questo prodotto aggiungendolo ad un pasto.
          </p>
        </IonLabel>
      </div>
      {/* ----------------- MODAL ----------------------*/}
      <PantryProductConsumeModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onDidDismiss={() => setIsOpen(false)}
        quantity={props.pantryProductQuantity}
      />
    </>
  );
};

export default PantryProductManageQuantity;
