import {
  IonAccordion,
  IonAccordionGroup,
  IonBadge,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
} from "@ionic/react";
import { useContextLanguage } from "../../context/contextLanguage";
import "./PantryProductDescriptionModal.module.css";
import { text } from "./text";
import { useEffect, useState } from "react";
import { getProductNutriScore } from "../../utils/openFoodApis";
import {
  typeOpenFoodNutriScore,
  typeOpenFoodNutriScoreData,
} from "../../types/type__OpenFood__NutriScore";
import {
  batteryHalf,
  thumbsDownOutline,
  thumbsUp,
  thumbsUpOutline,
} from "ionicons/icons";

interface ContainerProps {
  scannedID: string;
}

const PantryProductDescriptionModal: React.FC<ContainerProps> = (props) => {
  //VARIABLES ------------------------
  const { l } = useContextLanguage();
  //USE STATES -----------------------
  const [loaded, setLoaded] = useState<boolean>(false);
  const [nutriScore, setNutriScore] = useState<
    typeOpenFoodNutriScore | undefined
  >(undefined);
  //USE EFFECTS ----------------------
  useEffect(() => {
    if (props.scannedID) {
      getInformations(props.scannedID);
    }
  }, [props.scannedID]);
  //FUNCTIONS ------------------------

  const getInformations = async (id: string) => {
    setLoaded(false);
    try {
      const [nutriScore] = await Promise.all([getProductNutriScore(id)]);
      console.log(nutriScore);
      setNutriScore(nutriScore);
    } catch (error) {
      console.error("Error fetching data from OpenFoodFacts:", error);
    } finally {
      setLoaded(true);
    }
  };

  function getNutriScoreColor(score: string | undefined): string {
    if (!score) return "medium";
    score = score.toLowerCase();
    if (score === "a" || score === "b") return "success";
    if (score === "c") return "warning";
    return "danger";
  }
  //RETURN COMPONENT -----------------
  return (
    <div className="container">
      <IonList inset>
        <IonAccordionGroup value="start">
          <IonAccordion value="start">
            <IonItem slot="header">
              <IonLabel>{text[l].nutriScore}</IonLabel>
              <IonBadge
                className="ion-margin-end"
                color={getNutriScoreColor(nutriScore?.nutri_score)}
              >
                <b>{nutriScore?.nutri_score?.toUpperCase()}</b>
              </IonBadge>
            </IonItem>
            <div slot="content">
              {nutriScore?.nutri_score_data.positive.map(
                (item: typeOpenFoodNutriScoreData, index: number) => (
                  <IonItem key={index + item.id}>
                    <IonIcon
                      className="ion-margin-end"
                      icon={thumbsUpOutline}
                      color={"success"}
                    />
                    <IonLabel>
                      <h2>{item.id}</h2>
                      <p>
                        Value: {item.value ?? 0} {item.unit}
                      </p>
                    </IonLabel>
                    <IonNote slot="end">
                      {item.points} / {item.points_max}
                    </IonNote>
                  </IonItem>
                )
              )}
              {nutriScore?.nutri_score_data.negative.map(
                (item: typeOpenFoodNutriScoreData, index: number) => (
                  <IonItem key={index + item.id}>
                    <IonIcon
                      className="ion-margin-end"
                      icon={thumbsDownOutline}
                      color={"danger"}
                    />
                    <IonLabel>
                      <h2>{item.id}</h2>
                      <p>
                        Value: {item.value ?? 0} {item.unit}
                      </p>
                    </IonLabel>
                    <IonNote slot="end">
                      {item.points} / {item.points_max}
                    </IonNote>
                  </IonItem>
                )
              )}
            </div>
          </IonAccordion>
        </IonAccordionGroup>
      </IonList>
    </div>
  );
};

export default PantryProductDescriptionModal;
