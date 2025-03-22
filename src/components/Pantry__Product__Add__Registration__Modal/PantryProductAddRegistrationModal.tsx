import { IonList } from "@ionic/react";
import { useContextLanguage } from "../../context/contextLanguage";
import "./PantryProductAddRegistrationModal.module.css";
import { text } from "./text";
import { useState, useEffect } from "react";
import PantryProductQuantityInput from "../Pantry__Product__Quantity__Input/PantryProductQuantityInput";
import PantryProductUnitInput from "../Pantry__Product__Unit__Input/PantryProductUnitInput";
import { enumPantryUnit } from "../../enums/enumPantryUnit";
import { typeOpenFoodQuantityUnitInfo } from "../../types/typeOpenFoodBasicInfo";
interface ContainerProps {
  quantityUnitInfo?: typeOpenFoodQuantityUnitInfo;
  loaded: boolean;
}

const PantryProductAddRegistrationModal: React.FC<ContainerProps> = (props) => {
  //VARIABLES ------------------------
  const { l } = useContextLanguage();
  //USE STATES -----------------------
  const [quantity, setQuantity] = useState<number>(0);
  const [unit, setUnit] = useState<enumPantryUnit>(enumPantryUnit.g);
  //USE EFFECTS ----------------------
  useEffect(() => {
    if (props.quantityUnitInfo) {
      setQuantity(parseInt(props.quantityUnitInfo.product_quantity));
      setUnit(props.quantityUnitInfo.product_quantity_unit);
    }
  }, [props.quantityUnitInfo]);
  //FUNCTIONS ------------------------
  //RETURN COMPONENT -----------------
  return (
    <div>
      <IonList inset>
        {props.loaded && (
          <>
            <PantryProductQuantityInput
              quantity={quantity}
              setQuantity={setQuantity}
              disableAdd={false}
              disableRemove={false}
              loaded={props.loaded}
            />
            <PantryProductUnitInput unit={unit} setUnit={setUnit} />
          </>
        )}
      </IonList>
    </div>
  );
};

export default PantryProductAddRegistrationModal;
