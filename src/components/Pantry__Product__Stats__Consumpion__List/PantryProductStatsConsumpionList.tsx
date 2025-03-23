import { useContextLanguage } from "../../context/contextLanguage";
import "./PantryProductStatsConsumpionList.module.css";
import { text } from "./text";
import { IonList, IonItem, IonLabel, IonListHeader } from "@ionic/react";
import { useContextPantry } from "../../context/contextPantry";
import { typeEvent__PantryProduct__Consumption } from "../../types/typeEvent__PantryProduct__Consumption";
import { useEffect, useState } from "react";
interface ContainerProps {
  pantryProductUID: string;
  loaded: boolean;
  openFoodProductID: string;
}

const PantryProductStatsConsumpionList: React.FC<ContainerProps> = (props) => {
  //VARIABLES ------------------------
  const { l } = useContextLanguage();
  const { getConsumptionEventsByProductID, pantryProducts } =
    useContextPantry();
  //USE STATES -----------------------
  const [consumptionEvents, setConsumptionEvents] = useState<
    typeEvent__PantryProduct__Consumption[]
  >([]);
  const [loaded, setLoaded] = useState(false);
  //USE EFFECTS ----------------------
  useEffect(() => {
    if (props.pantryProductUID) {
      getConsumptionEvents();
    }
  }, [props.pantryProductUID, pantryProducts]);
  //FUNCTIONS ------------------------
  async function getConsumptionEvents() {
    setLoaded(false);
    await getConsumptionEventsByProductID(props.pantryProductUID).then(
      setConsumptionEvents
    );
    setLoaded(true);
  }
  //RETURN COMPONENT -----------------
  return (
    <IonList inset>
      <IonListHeader color={"light"}>
        <IonLabel>Consumi</IonLabel>
      </IonListHeader>
      {consumptionEvents.map((consumptionEvent) => (
        <IonItem color="light" key={consumptionEvent.uid}>
          <IonLabel>
            <h3>{consumptionEvent.mealType}</h3>
            <h1>- {consumptionEvent.quantity}</h1>

            <p>{consumptionEvent.date}</p>
          </IonLabel>
        </IonItem>
      ))}
    </IonList>
  );
};

export default PantryProductStatsConsumpionList;
