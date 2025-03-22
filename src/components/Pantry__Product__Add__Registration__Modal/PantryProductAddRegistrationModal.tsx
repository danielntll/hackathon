import { IonButton, IonIcon, IonInput, IonItem, IonList } from "@ionic/react";
import { useContextLanguage } from "../../context/contextLanguage";
import "./PantryProductAddRegistrationModal.module.css";
import { text } from "./text";
import { add } from "ionicons/icons";
import { remove } from "ionicons/icons";
import { useState } from "react";
interface ContainerProps {}

const PantryProductAddRegistrationModal: React.FC<ContainerProps> = (props) => {
  //VARIABLES ------------------------
  const { l } = useContextLanguage();
  //USE STATES -----------------------
  const [quantity, setQuantity] = useState<number>(0);
  //USE EFFECTS ----------------------
  //FUNCTIONS ------------------------
  function decrementQuantity() {
    setQuantity(quantity > 0 ? quantity - 1 : 0);
  }
  function incrementQuantity() {
    setQuantity(quantity + 1);
  }
  function handleQuantityChange(value: string) {
    const newQuantity = parseInt(value);
    if (isNaN(newQuantity) || newQuantity < 0) {
      setQuantity(0);
    } else {
      setQuantity(Math.min(Math.max(0, newQuantity), 0));
    }
  }
  //RETURN COMPONENT -----------------
  return (
    <div>
      <IonList inset>
        <IonItem>
          <IonInput
            label={text[l].quantity}
            type="number"
            labelPlacement="stacked"
            value={quantity.toString()}
            onIonChange={(e) => handleQuantityChange(e.detail.value!)}
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
          <IonButton size="small" fill="outline" onClick={incrementQuantity}>
            <IonIcon icon={add} />
          </IonButton>
        </IonItem>
      </IonList>
    </div>
  );
};

export default PantryProductAddRegistrationModal;
