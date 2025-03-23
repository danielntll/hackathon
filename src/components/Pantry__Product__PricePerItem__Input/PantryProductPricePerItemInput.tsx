import { IonItem, IonInput, IonText } from "@ionic/react";
import { useContextLanguage } from "../../context/contextLanguage";
import "./PantryProductPricePerItemInput.module.css";
import { text } from "./text";

interface ContainerProps {
  pricePerItem: number | undefined;
  setPricePerItem: (pricePerItem: number) => void;
}

const PantryProductPricePerItemInput: React.FC<ContainerProps> = (props) => {
  //VARIABLES ------------------------
  const { l } = useContextLanguage();
  //USE STATES -----------------------
  //USE EFFECTS ----------------------
  //FUNCTIONS ------------------------
  //RETURN COMPONENT -----------------
  return (
    <IonItem>
      <IonInput
        labelPlacement="stacked"
        clearInput
        type="number"
        placeholder={text[l].placeholder}
        value={props.pricePerItem?.toString() ?? undefined}
        onIonInput={(e) => props.setPricePerItem(Number(e.detail.value))}
      >
        <div slot="label">
          {text[l].pricePerItem}{" "}
          <IonText color="danger">({text[l].required})</IonText>
        </div>
      </IonInput>
    </IonItem>
  );
};

export default PantryProductPricePerItemInput;
