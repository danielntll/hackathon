import {
  IonButton,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonSkeletonText,
  IonSpinner,
  IonText,
} from "@ionic/react";
import { useContextLanguage } from "../../context/contextLanguage";
import "./PantryProductQuantityInput.module.css";
import { text } from "./text";
import { remove, add } from "ionicons/icons";

interface ContainerProps {
  quantity: number | undefined;
  setQuantity: (quantity: number | undefined) => void;
  disableAdd?: boolean;
  disableRemove?: boolean;
  loaded: boolean;
}

const PantryProductQuantityInput: React.FC<ContainerProps> = (props) => {
  //VARIABLES ------------------------
  const { l } = useContextLanguage();
  //USE STATES -----------------------
  //USE EFFECTS ----------------------
  //FUNCTIONS ------------------------
  function decrementQuantity() {
    props.setQuantity(
      props.quantity && props.quantity > 0 ? props.quantity - 1 : 0
    );
  }
  function incrementQuantity() {
    props.setQuantity(
      props.quantity && props.quantity > 0 ? props.quantity + 1 : 0
    );
  }
  function handleQuantityChange(value: string) {
    const newQuantity = parseInt(value);
    if (isNaN(newQuantity) || newQuantity < 0) {
      props.setQuantity(0);
    } else {
      props.setQuantity(Math.min(Math.max(0, newQuantity), 0));
    }
  }
  //RETURN COMPONENT -----------------
  return (
    <IonItem>
      {props.loaded ? (
        <IonInput
          label={text[l].quantity}
          type="number"
          labelPlacement="stacked"
          value={props.quantity?.toString() ?? undefined}
          onIonChange={(e) => handleQuantityChange(e.detail.value!)}
          placeholder={text[l].quantity}
        />
      ) : (
        <IonLabel>
          <IonText>
            <p style={{ fontSize: "12px" }}>{text[l].quantity}</p>
          </IonText>
          <IonSkeletonText
            animated={true}
            style={{ width: "20%", height: "15px", borderRadius: "4px" }}
          />
        </IonLabel>
      )}
      {props.loaded ? (
        <>
          <IonButton
            className="ion-margin-end"
            size="small"
            fill="outline"
            onClick={decrementQuantity}
            disabled={props.disableRemove}
          >
            <IonIcon icon={remove} />
          </IonButton>
          <IonButton
            size="small"
            fill="outline"
            onClick={incrementQuantity}
            disabled={props.disableAdd}
          >
            <IonIcon icon={add} />
          </IonButton>
        </>
      ) : (
        <>
          <IonSpinner />
        </>
      )}
    </IonItem>
  );
};

export default PantryProductQuantityInput;
