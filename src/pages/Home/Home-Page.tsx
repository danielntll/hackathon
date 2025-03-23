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
import styles from "./Home-Page.module.css";
import { text } from "./text";
import ExpenseAddFabButton from "../../components/Expense__Add__Fab__Button/ExpenseAddFabButton";
import { route__HomePage } from "./route";
import PantryListExpiring from "../../components/Pantry__List__Expiring/PantryListExpiring";
import ExpensesOverviewList from "../../components/Expenses__Overview__List/ExpensesOverviewList";

const Home: React.FC = () => {
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
          <IonTitle>{route__HomePage.tab[l]}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{route__HomePage.tab[l]}</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* ----------------- PAGE CONTENT ------------------*/}
        <div className={styles.content}>
          <ExpensesOverviewList />
          <PantryListExpiring />
        </div>
        {/* ----------------- EXTRA UI ----------------------*/}
        <ExpenseAddFabButton />
      </IonContent>
    </IonPage>
  );
};

export default Home;
