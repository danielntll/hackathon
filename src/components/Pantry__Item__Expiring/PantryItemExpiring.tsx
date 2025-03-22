import React from "react";
import "./PantryItemExpiring.module.css";
import { text } from "./text";
import { IonAvatar, IonBadge, IonItem, IonLabel, IonText } from "@ionic/react";
import { typePantryProduct } from "../../types/typePantryProduct";
import { useContextLanguage } from "../../context/contextLanguage";
import { differenceInDays, parse } from "date-fns";
import { useHistory } from "react-router-dom";
import { route__PantryDetailsPage } from "../../pages/Pantry Details/route";

const PantryItemExpiring: React.FC<typePantryProduct> = React.memo(
  (props) => {
    //VARIABLES ------------------------
    const { l } = useContextLanguage();
    const history = useHistory();
    //FUNCTIONS ------------------------
    function daysUntilExpiration() {
      try {
        if (!props.expirationDate) return 0;
        const expirationDate = parse(
          props.expirationDate,
          "dd/MM/yyyy",
          new Date()
        );
        if (isNaN(expirationDate.getTime())) return 0;
        const today = new Date();
        const daysUntilExpiration = differenceInDays(expirationDate, today);
        return daysUntilExpiration;
      } catch (error) {
        console.error("Error calculating expiration days:", error);
        return 0;
      }
    }

    function getBadgeColor() {
      const days = daysUntilExpiration();
      if (days <= 0) return "danger";
      if (days <= 3) return "warning";
      return "primary";
    }
    function openDetails(id: string) {
      history.push(route__PantryDetailsPage.path_base + "/" + id);
    }
    //USE STATES -----------------------
    //USE EFFECTS ----------------------
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
        <IonBadge color={getBadgeColor()}>
          {daysUntilExpiration()} {text[l].days}
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
