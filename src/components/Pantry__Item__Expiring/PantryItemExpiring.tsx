import React, { useEffect, useState } from "react";
import "./PantryItemExpiring.module.css";
import { text } from "./text";
import { IonAvatar, IonBadge, IonItem, IonLabel, IonText } from "@ionic/react";
import { typePantryProduct } from "../../types/typePantryProduct";
import { useContextLanguage } from "../../context/contextLanguage";
import { differenceInDays, parse } from "date-fns";
import { useHistory } from "react-router-dom";
import { route__PantryDetailsPage } from "../../pages/Pantry Details/route";
import { daysUntilExpiration } from "../../utils/daysUntilExpiration";
import { typeExpirationData } from "../../types/typeExpirationData";

const PantryItemExpiring: React.FC<typePantryProduct> = React.memo(
  (props) => {
    //VARIABLES ------------------------
    const { l } = useContextLanguage();
    const history = useHistory();
    //FUNCTIONS ------------------------

    function openDetails(id: string) {
      history.push(route__PantryDetailsPage.path_base + "/" + id);
    }
    //USE STATES -----------------------
    const [expirationData, setExpirationData] = useState<typeExpirationData>({
      days: 0,
      color: "primary",
    });
    //USE EFFECTS ----------------------
    useEffect(() => {
      const expirationData = daysUntilExpiration(props.expirationDate);
      setExpirationData(expirationData);
    }, [props.expirationDate]);
    //RETURN COMPONENT -----------------
    return (
      <IonItem
        color={"light"}
        button={true}
        onClick={() => openDetails(props.uid)}
      >
        <IonAvatar aria-hidden="true" slot="start">
          <img alt={props.name} src={props.image} />
        </IonAvatar>
        <IonLabel>
          <IonText color={"medium"}>
            <p>{props?.brand}</p>
          </IonText>
          <h2>
            <IonText color={"primary"}>
              <strong>{props.name}</strong>
            </IonText>
          </h2>
          <p>
            {text[l].quantity}:{" "}
            <strong>
              {props.quantity} {props.unit}
            </strong>
          </p>
        </IonLabel>
        <IonBadge color={expirationData.color}>
          {expirationData.days} {text[l].days}
        </IonBadge>
      </IonItem>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.expirationDate === nextProps.expirationDate &&
      prevProps.name === nextProps.name &&
      prevProps.quantity === nextProps.quantity &&
      prevProps.unit === nextProps.unit
    );
  }
);

export default PantryItemExpiring;
