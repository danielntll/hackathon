import {
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonSkeletonText,
  IonSpinner,
} from "@ionic/react";
import { useContextLanguage } from "../../context/contextLanguage";
import "./PantryProductUnitInput.module.css";
import { text } from "./text";
import { enumPantryUnit } from "../../enums/enumPantryUnit";
import "./PantryProductUnitInput.module.css";

interface ContainerProps {
  unit: enumPantryUnit;
  setUnit: (unit: enumPantryUnit) => void;
  loaded: boolean;
}

const PantryProductUnitInput: React.FC<ContainerProps> = (props) => {
  //VARIABLES ------------------------
  const { l } = useContextLanguage();
  //USE STATES -----------------------
  //USE EFFECTS ----------------------
  //FUNCTIONS ------------------------
  //RETURN COMPONENT -----------------
  return (
    <IonItem>
      {props.loaded ? (
        <IonSelect
          label={text[l].label}
          placeholder={text[l].placeholder}
          value={props.unit}
          onIonChange={(e) => props.setUnit(e.detail.value as enumPantryUnit)}
        >
          {Object.values(enumPantryUnit).map((unit) => (
            <IonSelectOption key={unit} value={unit}>
              {unit}
            </IonSelectOption>
          ))}
        </IonSelect>
      ) : (
        <>
          <IonLabel>{text[l].label}</IonLabel>
          <IonSpinner></IonSpinner>
        </>
      )}
    </IonItem>
  );
};

export default PantryProductUnitInput;
