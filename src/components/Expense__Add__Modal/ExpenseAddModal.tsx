import {
  IonAccordion,
  IonAccordionGroup,
  IonContent,
  IonDatetime,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonTextarea,
} from "@ionic/react";
import { IonButton, IonTitle, IonToolbar } from "@ionic/react";
import { IonButtons } from "@ionic/react";
import { IonHeader } from "@ionic/react";
import { IonModal } from "@ionic/react";
import "./ExpenseAddModal.module.css";
import { text } from "./text";
import { useContextLanguage } from "../../context/contextLanguage";
import { useState } from "react";
import { format, parseISO } from "date-fns";
interface ContainerProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const ExpenseAddModal: React.FC<ContainerProps> = (props) => {
  //VARIABLES ------------------------
  const { l } = useContextLanguage();
  //FUNCTIONS ------------------------
  function formatDate(value: string): string {
    return format(parseISO(value), "MMM dd yyyy HH:mm");
  }
  //USE STATES -----------------------
  const [date, setDate] = useState<string>(
    formatDate(new Date().toISOString())
  );
  //USE EFFECTS ----------------------
  //RETURN COMPONENT -----------------
  return (
    <IonModal isOpen={props.isOpen}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton color="medium" onClick={() => props.setIsOpen(false)}>
              {text[l].closeButton}
            </IonButton>
          </IonButtons>
          <IonTitle>{text[l].modalTitle}</IonTitle>
          <IonButtons slot="end">
            <IonButton color="success">{text[l].saveButton}</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList inset>
          <IonItem>
            <IonInput
              labelPlacement="stacked"
              label={text[l].costLabel}
              placeholder={text[l].costPlaceholder}
            />
          </IonItem>
          <IonItem>
            <IonTextarea
              labelPlacement="stacked"
              rows={5}
              label={text[l].descriptionLabel}
              placeholder={text[l].descriptionPlaceholder}
            />
          </IonItem>
        </IonList>
        <IonList inset>
          <IonAccordionGroup>
            <IonAccordion value="first">
              <IonItem slot="header">
                <IonLabel>{text[l].dateLabel}</IonLabel>
                <IonNote id="start-date">{date}</IonNote>
              </IonItem>
              <IonDatetime
                slot="content"
                presentation="date-time"
                id="datetime-start"
                onIonChange={(ev) => {
                  const value = Array.isArray(ev.detail.value)
                    ? ev.detail.value[0]
                    : ev.detail.value;
                  setDate(formatDate(value!));
                }}
              ></IonDatetime>
            </IonAccordion>
          </IonAccordionGroup>
        </IonList>
      </IonContent>
    </IonModal>
  );
};

export default ExpenseAddModal;
