import {
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonHeader,
  IonIcon,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { IonModal } from "@ionic/react";
import { useContextLanguage } from "../../context/contextLanguage";
import "./PantryProductExpireDateUpdateModal.module.css";
import { text } from "./text";
import { useState } from "react";
interface ContainerProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onDidDismiss: () => void;
}

const PantryProductExpireDateUpdateModal: React.FC<ContainerProps> = (
  props
) => {
  //VARIABLES ------------------------
  const { l } = useContextLanguage();
  //USE STATES -----------------------
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  //USE EFFECTS ----------------------
  //FUNCTIONS ------------------------
  //RETURN COMPONENT -----------------
  return (
    <IonModal
      isOpen={props.isOpen}
      keepContentsMounted={true}
      onDidDismiss={props.onDidDismiss}
    >
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton color="medium" onClick={() => props.setIsOpen(false)}>
              {text[l].close}
            </IonButton>
          </IonButtons>
          <IonTitle>{text[l].title}</IonTitle>
          <IonButtons slot="end">
            <IonButton
              color="success"
              disabled={isUpdating}
              onClick={() => props.setIsOpen(false)}
            >
              {isUpdating && <IonSpinner color={"success"} />}
              {text[l].save}
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonDatetime
          id="datetime"
          presentation="date-time"
          value="2023-11-02T01:22:00"
          formatOptions={{
            date: {
              weekday: "short",
              month: "long",
              day: "2-digit",
            },
            time: {
              hour: "2-digit",
              minute: "2-digit",
            },
          }}
        ></IonDatetime>
      </IonContent>
    </IonModal>
  );
};

export default PantryProductExpireDateUpdateModal;
