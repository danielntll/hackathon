import {
  IonAccordion,
  IonAccordionGroup,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
} from "@ionic/react";
import { useContextLanguage } from "../../context/contextLanguage";
import "./PantryProductDescriptionModal.module.css";
import { text } from "./text";
import { useEffect, useState } from "react";
interface ContainerProps {
  scannedID: string;
}

const PantryProductDescriptionModal: React.FC<ContainerProps> = (props) => {
  //VARIABLES ------------------------
  const { l } = useContextLanguage();
  //USE STATES -----------------------
  const [loaded, setLoaded] = useState<boolean>(false);
  const [nutriScore, setNutriScore] = useState<string>("");
  //USE EFFECTS ----------------------
  useEffect(() => {
    console.log(props.scannedID);
  }, [props.scannedID]);
  //FUNCTIONS ------------------------

  const getInformations = async (id: string) => {
    setLoaded(false);
    try {
      const [nutriScore, quantityUnitInfo] = await Promise.all([]);

      setNutriScore(nutriScore);
    } catch (error) {
      console.error("Error fetching data from OpenFoodFacts:", error);
    } finally {
      setLoaded(true);
    }
  };
  //RETURN COMPONENT -----------------
  return (
    <div className="container">
      <IonList inset>
        <IonAccordionGroup value="start">
          <IonAccordion value="start">
            <IonItem slot="header">
              <IonLabel>{text[l].nutriScore}</IonLabel>
              <IonNote slot="end" id="start-date">
                {text[l].nutriScoreValue}
              </IonNote>
            </IonItem>
          </IonAccordion>
        </IonAccordionGroup>
      </IonList>
    </div>
  );
};

export default PantryProductDescriptionModal;
