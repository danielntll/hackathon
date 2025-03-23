import { useContextLanguage } from "../../context/contextLanguage";
import "./ExpensesOverviewDayItem.module.css";
import { text } from "./text";
import { useContextPantry } from "../../context/contextPantry";
import { IonItem, IonLabel, IonNote, IonSpinner } from "@ionic/react";
import { useEffect } from "react";
import { useState } from "react";
interface ContainerProps {}

const ExpensesOverviewDayItem: React.FC<ContainerProps> = (props) => {
  //VARIABLES ------------------------
  const { l } = useContextLanguage();
  const { getTotalSpentByDay } = useContextPantry();
  //USE STATES -----------------------
  const [totalSpent, setTotalSpent] = useState<number>(0);
  const [loaded, setLoaded] = useState<boolean>(false);
  //USE EFFECTS ----------------------
  useEffect(() => {
    handleTotalSpent();
  }, []);
  //FUNCTIONS ------------------------
  async function handleTotalSpent() {
    setLoaded(false);
    await getTotalSpentByDay(new Date()).then((total) => setTotalSpent(total));
    setLoaded(true);
  }
  //RETURN COMPONENT -----------------
  return (
    <>
      <IonItem color={"light"}>
        <IonLabel>{text[l].title}</IonLabel>
        <IonNote>{loaded ? totalSpent : <IonSpinner />} Euro</IonNote>
      </IonItem>
    </>
  );
};

export default ExpensesOverviewDayItem;
