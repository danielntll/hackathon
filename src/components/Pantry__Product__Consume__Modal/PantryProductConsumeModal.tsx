import {
  IonAccordion,
  IonAccordionGroup,
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonNote,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import { useContextLanguage } from "../../context/contextLanguage";
import "./PantryProductConsumeModal.module.css";
import { text } from "./text";
import { useState } from "react";
import { checkmark, remove, refresh } from "ionicons/icons";
import { useContextPantry } from "../../context/contextPantry";
import { add } from "ionicons/icons";
import { format, parseISO } from "date-fns";
import { enumMealType } from "../../enums/enumMealType";

interface ContainerProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onDidDismiss: () => void;
  quantity: number;
  pantryProductUID: string;
  pantryProductUnit: string;
  openFoodProductID: string;
}

const PantryProductConsumeModal: React.FC<ContainerProps> = (props) => {
  //VARIABLES ------------------------
  const { l } = useContextLanguage();
  const { addPantryProductConsumptionEvent } = useContextPantry();

  //FUNCTIONS ------------------------
  function decrementQuantity() {
    setQuantity(quantity > 0 ? quantity - 1 : 0);
  }
  function incrementQuantity() {
    setQuantity(quantity < props.quantity ? quantity + 1 : props.quantity);
  }
  function handleQuantityChange(value: string) {
    const newQuantity = parseInt(value);
    if (isNaN(newQuantity)) {
      setQuantity(0);
    } else {
      setQuantity(Math.min(Math.max(0, newQuantity), props.quantity));
    }
  }

  async function handleSave() {
    setIsSaving(true);
    await addPantryProductConsumptionEvent({
      uid: "",
      productUID: props.pantryProductUID,
      openFoodProductID: props.openFoodProductID,
      quantity: quantity,
      mealType: mealType,
      date: date,
    });

    setIsSaving(false);
    props.setIsOpen(false);
  }

  function formatDate(value: string): string {
    return format(parseISO(value), "MMM dd yyyy HH:mm");
  }

  //USE STATES -----------------------
  const [quantity, setQuantity] = useState<number>(props.quantity);
  const [date, setDate] = useState<string>(
    formatDate(new Date().toISOString())
  );
  const [mealType, setMealType] = useState<enumMealType>(enumMealType.snack);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  //USE EFFECTS ----------------------
  //RETURN COMPONENT -----------------
  return (
    <IonModal isOpen={props.isOpen}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton color="medium" onClick={() => props.setIsOpen(false)}>
              {text[l].buttonClose}
            </IonButton>
          </IonButtons>
          <IonTitle>{text[l].title}</IonTitle>
          <IonButtons slot="end">
            <IonButton
              color="success"
              onClick={handleSave}
              disabled={isSaving || quantity === 0}
            >
              {isSaving && <IonSpinner color={"success"} />}
              {text[l].buttonSave}
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {/* ----------------- QUANTITY ----------------------*/}
        <>
          <div className="ion-padding-top">
            <IonLabel>
              <p className="ion-padding-horizontal">
                {text[l].infoConsume
                  .replace("{quantity}", quantity.toString())
                  .replace("{propQuantity}", props.quantity.toString())}
              </p>
            </IonLabel>
            <IonList inset>
              <IonItem>
                <IonInput
                  label={
                    text[l].quantity + " (" + props.pantryProductUnit + ")"
                  }
                  type="number"
                  labelPlacement="stacked"
                  value={quantity.toString()}
                  onIonInput={(e) => handleQuantityChange(e.detail.value!)}
                  placeholder={text[l].quantity}
                ></IonInput>
                <IonButton
                  className="ion-margin-end"
                  size="small"
                  fill="outline"
                  onClick={decrementQuantity}
                >
                  <IonIcon icon={remove} />
                </IonButton>
                <IonButton
                  size="small"
                  fill="outline"
                  onClick={incrementQuantity}
                  disabled={quantity === props.quantity}
                >
                  <IonIcon icon={add} />
                </IonButton>
              </IonItem>
              <IonItem>
                <IonButton
                  slot="start"
                  size="small"
                  fill="clear"
                  color={"medium"}
                  onClick={() => setQuantity(0)}
                  disabled={quantity === 0}
                >
                  Ripristina
                  <IonIcon icon={refresh} />
                </IonButton>
                <IonButton
                  slot="end"
                  size="small"
                  disabled={quantity === props.quantity}
                  fill="outline"
                  onClick={() => setQuantity(props.quantity)}
                >
                  Aggiungi tutto
                  <IonIcon icon={checkmark} />
                </IonButton>
              </IonItem>
            </IonList>
          </div>
          <div className="ion-padding-horizontal">
            <IonLabel>
              {quantity === props.quantity && <p>{text[l].consumeAll}</p>}
            </IonLabel>
          </div>
        </>
        {/* ----------------- CATEGORY CONSUME ----------------------*/}
        <>
          <IonList inset>
            <IonItem>
              <IonSelect
                label={text[l].mealType}
                value={mealType}
                onIonChange={(e) => setMealType(e.detail.value)}
              >
                {Object.values(enumMealType).map((type) => (
                  <IonSelectOption key={type} value={type}>
                    {text[l][type]}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
          </IonList>
        </>
        {/* ----------------- DATE ----------------------*/}
        <>
          <IonList inset>
            <IonAccordionGroup>
              <IonAccordion value="data">
                <IonItem slot="header">
                  <IonLabel>{text[l].dateLabel}</IonLabel>
                  <IonNote slot="end" id="start-date">
                    {date}
                  </IonNote>
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
        </>
      </IonContent>
    </IonModal>
  );
};

export default PantryProductConsumeModal;
