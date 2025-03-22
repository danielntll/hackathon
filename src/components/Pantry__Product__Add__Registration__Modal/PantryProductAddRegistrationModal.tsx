import { IonLabel, IonList } from "@ionic/react";
import { useContextLanguage } from "../../context/contextLanguage";
import "./PantryProductAddRegistrationModal.module.css";
import { text } from "./text";
import { useState, useEffect } from "react";
import PantryProductQuantityInput from "../Pantry__Product__Quantity__Input/PantryProductQuantityInput";
import PantryProductUnitInput from "../Pantry__Product__Unit__Input/PantryProductUnitInput";
import { enumPantryUnit } from "../../enums/enumPantryUnit";
import { typeOpenFoodQuantityUnitInfo } from "../../types/typeOpenFoodBasicInfo";
import PantryProductItemCountInput from "../Pantry__Product__ItemCount__Input/PantryProductItemCountInput";
interface ContainerProps {
  quantityUnitInfo?: typeOpenFoodQuantityUnitInfo;
  loaded: boolean;
}

const PantryProductAddRegistrationModal: React.FC<ContainerProps> = (props) => {
  //VARIABLES ------------------------
  const { l } = useContextLanguage();
  //USE STATES -----------------------
  const [itemCount, setItemCount] = useState<number>(1);
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
        <PantryProductItemCountInput
          itemCount={itemCount}
          setItemCount={setItemCount}
          loaded={props.loaded}
        />
      </IonList>
      <div>
        <IonList inset>
          <PantryProductQuantityInput
            quantity={quantity}
            setQuantity={setQuantity}
            disableAdd={false}
            disableRemove={false}
            loaded={props.loaded}
          />
          <PantryProductUnitInput
            loaded={props.loaded}
            unit={unit}
            setUnit={setUnit}
          />
        </IonList>
        <IonLabel>
          <p className="ion-padding-horizontal">{text[l].quantityInputInfo}</p>
        </IonLabel>
      </div>
    </div>
  );
};

export default PantryProductAddRegistrationModal;
