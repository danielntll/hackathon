import { IonBadge, IonItem, IonLabel, IonSkeletonText } from "@ionic/react";
import { useContextLanguage } from "../../context/contextLanguage";
import "./PantryProductStatsLastPriceItem.module.css";
import { text } from "./text";
import { useEffect, useState } from "react";
import { useContextPantry } from "../../context/contextPantry";
interface ContainerProps {
  productID: string;
}

const PantryProductStatsLastPriceItem: React.FC<ContainerProps> = (props) => {
  //VARIABLES ------------------------
  const { l } = useContextLanguage();
  const { getLastPriceByProductID } = useContextPantry();
  //USE STATES -----------------------
  const [lastPrice, setLastPrice] = useState<number>(0);
  const [loaded, setLoaded] = useState<boolean>(false);
  //USE EFFECTS ----------------------
  useEffect(() => {
    if (props.productID) {
      loadLastPrice();
    }
  }, [props.productID]);
  //FUNCTIONS ------------------------
  const loadLastPrice = async () => {
    setLoaded(false);
    const lastPrice = await getLastPriceByProductID(props.productID);
    setLastPrice(lastPrice);
    setLoaded(true);
  };
  //RETURN COMPONENT -----------------
  return (
    <IonItem>
      <IonLabel>
        <p>{text[l].subtitle}</p>
        <h2>{text[l].title}</h2>
        <p></p>
      </IonLabel>
      {loaded ? (
        <IonBadge color="success">{lastPrice}€</IonBadge>
      ) : (
        <IonSkeletonText
          animated
          style={{ width: "10%", height: "20px", borderRadius: "8px" }}
        />
      )}
    </IonItem>
  );
};

export default PantryProductStatsLastPriceItem;
