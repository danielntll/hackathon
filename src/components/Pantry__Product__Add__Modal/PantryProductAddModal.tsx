import { IonButton, IonModal, IonSpinner, IonTitle } from "@ionic/react";
import { IonButtons } from "@ionic/react";
import { IonHeader, IonToolbar } from "@ionic/react";
import { IonContent } from "@ionic/react";
import { useContextLanguage } from "../../context/contextLanguage";
import "./PantryProductAddModal.module.css";
import { text } from "./text";
import { useState, useEffect } from "react";
import PantryProductBaseInfo from "../Pantry__Product__Base__Info/PantryProductBaseInfo";

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  //USE EFFECTS ----------------------
  useEffect(() => {
    getInformations(props.scannedID);
  }, [props.scannedID]);
  //FUNCTIONS ------------------------
  const handleSave = () => {};

  const getInformations = async (id: string) => {
    setIsLoading(true);
    // Fetch data from OpenFoodFacts API
    const apiUrl = `https://world.openfoodfacts.org/api/v0/product/${id}.json`;
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error fetching data from OpenFoodFacts:", error);
    } finally {
      setIsLoading(false);
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
        <PantryProductBaseInfo
          subtitle={data.product.name}
          title={data.product.name}
          imageUrl={data.product.image_url}
          loaded={isLoading}
        />
      </IonContent>
    </IonModal>
  );
};

export default PantryProductAddModal;
