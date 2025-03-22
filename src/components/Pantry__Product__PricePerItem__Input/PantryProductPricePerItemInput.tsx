import { IonItem, IonInput } from "@ionic/react";
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
        label={text[l].pricePerItem}
        labelPlacement="stacked"
        clearInput
        type="number"
        placeholder="Inserisci il prezzo"
        value={props.pricePerItem?.toString() ?? undefined}
        onIonInput={(e) => props.setPricePerItem(Number(e.detail.value))}
      />
    </IonItem>
  );
};

export default PantryProductPricePerItemInput;
