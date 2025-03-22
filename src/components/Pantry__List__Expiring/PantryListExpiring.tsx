import { IonButton, IonLabel, IonList, IonListHeader } from "@ionic/react";
import { useContextLanguage } from "../../context/contextLanguage";
import "./PantryListExpiring.module.css";
import { text } from "./text";
import PantryItemExpiring from "../Pantry__Item__Expiring/PantryItemExpiring";
import { typePantryProduct } from "../../types/typePantryProduct";
import { useContextPantry } from "../../context/contextPantry";
interface ContainerProps {}

const PantryListExpiring: React.FC<ContainerProps> = (props) => {
  //VARIABLES ------------------------
  const { l } = useContextLanguage();
  const { pantryProducts } = useContextPantry();
  //FUNCTIONS ------------------------
  //USE STATES -----------------------
  //USE EFFECTS ----------------------
  //RETURN COMPONENT -----------------
  return (
    <IonList inset>
      <IonListHeader color={"light"}>
        <IonLabel>{text[l].title}</IonLabel>
        <IonButton>{text[l].exploreButton}</IonButton>
      </IonListHeader>
      {pantryProducts.map((item: typePantryProduct, index: number) => (
        <PantryItemExpiring key={index} {...item} />
      ))}
    </IonList>
  );
};

export default PantryListExpiring;
