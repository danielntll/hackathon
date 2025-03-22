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
import { getBasicProductInfo } from "../../utils/openFoodApis";
import { typeOpenFoodBasicInfo } from "../../types/typeOpenFoodBasicInfo";
import PantryProductAddRegistrationModal from "../Pantry__Product__Add__Registration__Modal/PantryProductAddRegistrationModal";

interface ContainerProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  scannedID: string;
}

const PantryProductAddModal: React.FC<ContainerProps> = (props) => {
  //VARIABLES ------------------------
  const { l } = useContextLanguage();
  const baseUrl = import.meta.env.VITE_OPENFOODFACTS_API_URL;
  //USE STATES -----------------------
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [basicInfo, setBasicInfo] = useState<typeOpenFoodBasicInfo | undefined>(
    undefined
  );
  //USE EFFECTS ----------------------
  useEffect(() => {
    getInformations(props.scannedID);
  }, [props.scannedID]);
  //FUNCTIONS ------------------------
  const handleSave = () => {};

  const getInformations = async (id: string) => {
    setLoaded(false);
    try {
      const basicInfo: typeOpenFoodBasicInfo = await getBasicProductInfo(id);
      setBasicInfo(basicInfo);
    } catch (error) {
      console.error("Error fetching data from OpenFoodFacts:", error);
    } finally {
      setLoaded(true);
    }
  };

  //RETURN COMPONENT -----------------
  return (
    <IonModal isOpen={props.isOpen}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton color="medium" onClick={() => props.setIsOpen(false)}>
              {text[l].buttonClose}
            </IonButton>
          </IonButtons>
          <IonTitle>{text[l].title}</IonTitle>
          <IonButtons slot="end">
            <IonButton color="success" onClick={handleSave} disabled={isSaving}>
              {isSaving && <IonSpinner color={"success"} />}
              {text[l].buttonSave}
            </IonButton>
          </IonButtons>
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
              <IonLabel>Registra dettagli</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="second" contentId="second">
              <IonLabel>Info prodotto</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </div>
        <IonSegmentView>
          <IonSegmentContent id="first">
            <PantryProductAddRegistrationModal />
          </IonSegmentContent>
          <IonSegmentContent id="second">Second</IonSegmentContent>
        </IonSegmentView>
      </IonContent>
    </IonModal>
  );
};

export default PantryProductAddModal;
