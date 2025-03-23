import {
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonHeader,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { IonModal } from "@ionic/react";
import { useContextLanguage } from "../../context/contextLanguage";
import "./PantryProductExpireDateUpdateModal.module.css";
import { text } from "./text";
import { useState } from "react";
import { useContextPantry } from "../../context/contextPantry";
import { format, formatDate, parseISO } from "date-fns";

interface ContainerProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onDidDismiss: () => void;
  productId: string;
  currentExpirationDate: string;
}

const PantryProductExpireDateUpdateModal: React.FC<ContainerProps> = (
  props
) => {
  //VARIABLES ------------------------
  const { l } = useContextLanguage();
  const { updatePantryProductExpirationDate } = useContextPantry();

  //USE STATES -----------------------
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [expirationDate, setExpirationDate] = useState<string>(
    props.currentExpirationDate
  );

  //FUNCTIONS ------------------------
  function formatDate(value: string): string {
    return format(parseISO(value), "dd MMM yyyy");
  }
  const handleSave = async () => {
    try {
      setIsUpdating(true);
      await updatePantryProductExpirationDate(props.productId, expirationDate);
      props.setIsOpen(false);
    } catch (error) {
      console.error("Error updating expiration date:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancel = () => {
    setExpirationDate(props.currentExpirationDate);
    props.setIsOpen(false);
  };

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
            <IonButton color="medium" onClick={handleCancel}>
              {text[l].close}
            </IonButton>
          </IonButtons>
          <IonTitle>{text[l].title}</IonTitle>
          <IonButtons slot="end">
            <IonButton
              color="success"
              disabled={
                isUpdating || expirationDate === props.currentExpirationDate
              }
              onClick={handleSave}
            >
              {isUpdating && <IonSpinner name="crescent" />}
              {text[l].save}
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonDatetime
          id="datetime"
          presentation="date"
          value={expirationDate}
          onIonChange={(ev) => {
            const value = Array.isArray(ev.detail.value)
              ? ev.detail.value[0]
              : ev.detail.value;
            setExpirationDate(formatDate(value!));
          }}
          locale={l === "it_IT" ? "it-IT" : "en-GB"}
        ></IonDatetime>
      </IonContent>
    </IonModal>
  );
};

export default PantryProductExpireDateUpdateModal;
