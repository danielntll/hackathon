import { add } from "ionicons/icons";
import "./ExpenseAddFabButton.module.css";
import { text } from "./text";
import { IonFab, IonFabButton, IonIcon } from "@ionic/react";

import { useState } from "react";
import PantryProductAddModal from "../Pantry__Product__Add__Modal/PantryProductAddModal";
interface ContainerProps {}

const ExpenseAddFabButton: React.FC<ContainerProps> = (props) => {
  //VARIABLES ------------------------
  //USE STATES -----------------------
  const [isOpen, setIsOpen] = useState<boolean>(true);
  //USE EFFECTS ----------------------
  //FUNCTIONS ------------------------
  const handleOpenModal = () => {
    setIsOpen(true);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
  };
  //RETURN COMPONENT -----------------
  return (
    <>
      <IonFab slot="fixed" vertical="bottom" horizontal="center">
        <IonFabButton onClick={handleOpenModal}>
          <IonIcon icon={add}></IonIcon>
        </IonFabButton>
      </IonFab>
      {/* ----------------- MODAL ----------------------*/}
      <PantryProductAddModal
        isOpen={isOpen}
        setIsOpen={handleCloseModal}
        scannedID="3017620422003"
      />
    </>
  );
};

export default ExpenseAddFabButton;
