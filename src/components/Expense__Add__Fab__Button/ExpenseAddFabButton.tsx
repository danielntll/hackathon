import { add } from "ionicons/icons";
import "./ExpenseAddFabButton.module.css";
import { text } from "./text";
import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
import ExpenseAddModal from "../Expense__Add__Modal/ExpenseAddModal";
import { useState } from "react";
interface ContainerProps {}

const ExpenseAddFabButton: React.FC<ContainerProps> = (props) => {
  //VARIABLES ------------------------
  //USE STATES -----------------------
  const [isOpen, setIsOpen] = useState<boolean>(false);
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
      <ExpenseAddModal isOpen={isOpen} setIsOpen={handleCloseModal} />
    </>
  );
};

export default ExpenseAddFabButton;
