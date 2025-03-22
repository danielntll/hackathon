import { IonItem, IonLabel, IonList } from "@ionic/react";
import { useContextLanguage } from "../../context/contextLanguage";
import "./PantryProductExpireDateList.module.css";
import { text } from "./text";

interface ContainerProps {
  pantryProductUID: string;
  pantryProductQuantity: number;
  loaded: boolean;
  pantryProductExpireDate: string;
}

const PantryProductExpireDateList: React.FC<ContainerProps> = (props) => {
  //VARIABLES ------------------------
  const { l } = useContextLanguage();
  //USE STATES -----------------------
  //USE EFFECTS ----------------------
  //FUNCTIONS ------------------------
  //RETURN COMPONENT -----------------
  return (
    <IonList inset>
      <IonItem color={"light"}>
        <IonLabel>
          <p>{text[l].title}</p>
        </IonLabel>
      </IonItem>
    </IonList>
  );
};

export default PantryProductExpireDateList;
