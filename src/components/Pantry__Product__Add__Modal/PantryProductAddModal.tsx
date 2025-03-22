import {
  IonButton,
  IonLabel,
  IonModal,
  IonSegment,
  IonSegmentButton,
  IonSegmentContent,
  IonSegmentView,
  IonSpinner,
  IonTitle,
} from "@ionic/react";
import { IonButtons } from "@ionic/react";
import { IonHeader, IonToolbar } from "@ionic/react";
import { IonContent } from "@ionic/react";
import { useContextLanguage } from "../../context/contextLanguage";
import "./PantryProductAddModal.module.css";
import { text } from "./text";
import { useState, useEffect } from "react";
import PantryProductBaseInfo from "../Pantry__Product__Base__Info/PantryProductBaseInfo";
import {
  getBasicProductInfo,
  getProductQuantityUnitInfo,
} from "../../utils/openFoodApis";
import {
  typeOpenFoodBasicInfo,
  typeOpenFoodQuantityUnitInfo,
} from "../../types/typeOpenFoodBasicInfo";
import PantryProductAddRegistrationModal from "../Pantry__Product__Add__Registration__Modal/PantryProductAddRegistrationModal";

interface ContainerProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  scannedID: string;
}

const PantryProductAddModal: React.FC<ContainerProps> = (props) => {
  //VARIABLES ------------------------
  const { l } = useContextLanguage();
  //USE STATES -----------------------
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [basicInfo, setBasicInfo] = useState<typeOpenFoodBasicInfo | undefined>(
    undefined
  );
  const [quantityUnitInfo, setQuantityUnitInfo] = useState<
    typeOpenFoodQuantityUnitInfo | undefined
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
      const [basicInfo, quantityUnitInfo] = await Promise.all([
        getBasicProductInfo(id),
        getProductQuantityUnitInfo(id),
      ]);

      setBasicInfo(basicInfo);
      setQuantityUnitInfo(quantityUnitInfo);
    } catch (error) {
      console.error("Error fetching data from OpenFoodFacts:", error);
    } finally {
      setLoaded(true);
    }
  };

  const handleClose = () => {
    setIsSaving(false);
    setLoaded(false);
    setBasicInfo(undefined);
    setQuantityUnitInfo(undefined);
    props.setIsOpen(false);
  };

  //RETURN COMPONENT -----------------
  return (
    <IonModal isOpen={props.isOpen}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton color="medium" onClick={handleClose}>
              {text[l].buttonClose}
            </IonButton>
          </IonButtons>
          <IonTitle>{text[l].title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {/* ----------------- BASIC INFO ----------------------*/}
        <PantryProductBaseInfo
          subtitle={basicInfo?.brands_tags.join(", ") || ""}
          title={basicInfo?.name || ""}
          imageUrl={basicInfo?.image_url || ""}
          loaded={loaded}
        />
        {/* ----------------- BASIC INFO ----------------------*/}
        <div className="ion-padding">
          <IonSegment value="first">
            <IonSegmentButton value="first" contentId="first">
              <IonLabel>Aggiungi prodotto</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="second" contentId="second">
              <IonLabel>Info prodotto</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </div>
        <IonSegmentView>
          <IonSegmentContent id="first">
            <PantryProductAddRegistrationModal
              loaded={loaded}
              quantityUnitInfo={quantityUnitInfo}
              scannedID={props.scannedID}
            />
          </IonSegmentContent>
          <IonSegmentContent id="second">Second</IonSegmentContent>
        </IonSegmentView>
      </IonContent>
    </IonModal>
  );
};

export default PantryProductAddModal;
