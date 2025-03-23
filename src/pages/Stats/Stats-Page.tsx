import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useContextLanguage } from "../../context/contextLanguage";
import styles from "./Stats-Page.module.css";
import { text } from "./text";
import ExpensesOverviewList from "../../components/Expenses__Overview__List/ExpensesOverviewList";
import ExpensesOverviewStrendMonth from "../../components/Expenses__Overview__Strend__Month/ExpensesOverviewStrendMonth";
import { route__StatsPage } from "./route";
const StatsPage: React.FC = () => {
  //VARIABLES ------------------------
  const { l } = useContextLanguage();
  //USE STATES -----------------------
  //USE EFFECTS ----------------------
  //FUNCTIONS ------------------------
  //RETURN COMPONENT -----------------
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{route__StatsPage.tab[l]}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{route__StatsPage.tab[l]}</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* ----------------- PAGE CONTENT ------------------*/}
        <div className={styles.content}>
          <ExpensesOverviewList />
          <ExpensesOverviewStrendMonth month={new Date()} />
          <ExpensesOverviewStrendMonth
            month={new Date(new Date().setMonth(new Date().getMonth() - 1))}
          />
          <ExpensesOverviewStrendMonth
            month={new Date(new Date().setMonth(new Date().getMonth() - 2))}
          />
        </div>
        {/* ----------------- EXTRA UI ----------------------*/}
      </IonContent>
    </IonPage>
  );
};

export default StatsPage;
