import { IonList, IonListHeader, IonLabel } from "@ionic/react";
import { useContextLanguage } from "../../context/contextLanguage";
import "./ExpensesOverviewList.module.css";
import { text } from "./text";
import ExpensesOverviewTotalItem from "../Expenses__Overview__Total__Item/ExpensesOverviewTotalItem";
import ExpensesOverviewDayItem from "../Expenses__Overview__Day__Item/ExpensesOverviewDayItem";
interface ContainerProps {}

const ExpensesOverviewList: React.FC<ContainerProps> = (props) => {
  //VARIABLES ------------------------
  const { l } = useContextLanguage();
  //USE STATES -----------------------
  //USE EFFECTS ----------------------
  //FUNCTIONS ------------------------
  //RETURN COMPONENT -----------------
  return (
    <IonList inset>
      <IonListHeader color={"light"}>
        <IonLabel>{text[l].title}</IonLabel>
      </IonListHeader>
      <ExpensesOverviewDayItem />
      <ExpensesOverviewTotalItem />
    </IonList>
  );
};

export default ExpensesOverviewList;
