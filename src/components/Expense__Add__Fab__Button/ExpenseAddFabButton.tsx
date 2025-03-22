import { add } from "ionicons/icons";
import "./ExpenseAddFabButton.module.css";
import { text } from "./text";
import { IonFab, IonFabButton, IonIcon } from "@ionic/react";

import { useEffect, useState } from "react";
import PantryProductAddModal from "../Pantry__Product__Add__Modal/PantryProductAddModal";
interface ContainerProps {}

const ExpenseAddFabButton: React.FC<ContainerProps> = (props) => {
  //VARIABLES ------------------------
  //USE STATES -----------------------
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scannedID, setScannedID] = useState<string | undefined>(undefined);
  //USE EFFECTS ----------------------
  useEffect(() => {
    if (scannedID) {
      setIsOpen(true);
    }
  }, [scannedID]);
  //FUNCTIONS ------------------------
  function getScannedID() {
    setScannedID("3017620422003");
  }
  function handleOpenModal() {
    setIsOpen(true);
  }
  function handleCloseModal() {
    setIsOpen(false);
    setScannedID(undefined);
  }
  //RETURN COMPONENT -----------------
  return (
    <>
      <IonFab slot="fixed" vertical="bottom" horizontal="center">
        <IonFabButton onClick={getScannedID}>
          <IonIcon icon={add}></IonIcon>
        </IonFabButton>
      </IonFab>
      {/* ----------------- MODAL ----------------------*/}
      <PantryProductAddModal
        isOpen={isOpen}
        setIsOpen={handleCloseModal}
        scannedID={scannedID ?? ""}
      />
    </>
  );
};

export default ExpenseAddFabButton;
