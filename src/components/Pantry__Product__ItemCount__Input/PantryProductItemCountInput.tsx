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
import "./PantryProductItemCountInput.module.css";
import { text } from "./text";
import { remove, add } from "ionicons/icons";

interface ContainerProps {
  itemCount: number;
  setItemCount: (itemCount: number) => void;
  loaded: boolean;
}

const PantryProductItemCountInput: React.FC<ContainerProps> = (props) => {
  //VARIABLES ------------------------
  const { l } = useContextLanguage();
  //USE STATES -----------------------
  //USE EFFECTS ----------------------
  //FUNCTIONS ------------------------
  function decrementItemCount() {
    props.setItemCount(props.itemCount > 1 ? props.itemCount - 1 : 1);
  }
  function incrementItemCount() {
    props.setItemCount(props.itemCount + 1);
  }
  function handleItemCountChange(value: string) {
    const newItemCount = parseInt(value);
    if (isNaN(newItemCount) || newItemCount < 1) {
      props.setItemCount(1);
    } else {
      props.setItemCount(Math.max(1, newItemCount));
    }
  }
  //RETURN COMPONENT -----------------
  return (
    <IonItem>
      {props.loaded ? (
        <IonInput
          label={text[l].itemCount}
          type="number"
          min={1}
          labelPlacement="stacked"
          value={props.itemCount.toString()}
          onIonChange={(e) => handleItemCountChange(e.detail.value!)}
          placeholder={text[l].itemCount}
        />
      ) : (
        <IonLabel>
          <IonText>
            <p style={{ fontSize: "12px" }}>{text[l].itemCount}</p>
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
            onClick={decrementItemCount}
            disabled={props.itemCount === 1}
          >
            <IonIcon icon={remove} />
          </IonButton>
          <IonButton size="small" fill="outline" onClick={incrementItemCount}>
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

export default PantryProductItemCountInput;
