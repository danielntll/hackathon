import React, { useEffect, useState } from "react";
import "./PantryItemExpiring.module.css";
import { text } from "./text";
import {
  IonAvatar,
  IonBadge,
  IonItem,
  IonLabel,
  IonSkeletonText,
  IonText,
} from "@ionic/react";
import { typePantryProduct } from "../../types/type__Pantry__Product";
import { useContextLanguage } from "../../context/contextLanguage";

import { useHistory } from "react-router-dom";
import { route__PantryDetailsPage } from "../../pages/Pantry Details/route";
import { daysUntilExpiration } from "../../utils/daysUntilExpiration";
import { typeExpirationData } from "../../types/typeExpirationData";
import { typeOpenFoodBasicInfo } from "../../types/typeOpenFoodBasicInfo";
import { getBasicProductInfo } from "../../utils/openFoodApis";
const PantryItemExpiring: React.FC<typePantryProduct> = React.memo(
  (props) => {
    //VARIABLES ------------------------
    const { l } = useContextLanguage();
    const history = useHistory();
    //FUNCTIONS ------------------------
    function openDetails(id: string) {
      history.push(route__PantryDetailsPage.path_base + "/" + id);
    }

    async function fetchOpenFoodProductBasicInfo(id: string) {
      setLoaded(false);
      const basicInfo = await getBasicProductInfo(id);
      setOpenFoodProductBasicInfo(basicInfo);
      setLoaded(true);
    }
    //USE STATES -----------------------
    const [expirationData, setExpirationData] = useState<typeExpirationData>({
      days: undefined,
      color: "primary",
    });

    const [openFoodProductBasicInfo, setOpenFoodProductBasicInfo] = useState<
      typeOpenFoodBasicInfo | undefined
    >(undefined);

    const [loaded, setLoaded] = useState(false);

    //USE EFFECTS ----------------------
    useEffect(() => {
      const expirationData = daysUntilExpiration(props.expirationDate);
      setExpirationData(expirationData);
    }, [props.expirationDate]);

    useEffect(() => {
      if (props.openFoodProductID) {
        fetchOpenFoodProductBasicInfo(props.openFoodProductID);
      }
    }, [props.openFoodProductID]);
    //RETURN COMPONENT -----------------
    return (
      <IonItem
        color={"light"}
        button={true}
        onClick={() => {
          if (loaded) {
            openDetails(props.uid ?? "");
          }
        }}
      >
        {loaded ? (
          <>
            <IonAvatar aria-hidden="true" slot="start">
              <img
                alt={openFoodProductBasicInfo?.name}
                src={openFoodProductBasicInfo?.image_url}
              />
            </IonAvatar>
            <IonLabel>
              <IonText color={"medium"}>
                <p>{openFoodProductBasicInfo?.brands_tags.join(", ")}</p>
              </IonText>
              <h2>
                <IonText color={"primary"}>
                  <strong>{openFoodProductBasicInfo?.name}</strong>
                </IonText>
              </h2>
              <p>
                {text[l].pezzi}: {props.itemCount}
              </p>
              <IonText color={"medium"}>
                <p>
                  {text[l].quantity}:{" "}
                  <strong>
                    {props.quantity} {props.unit}
                  </strong>
                </p>
              </IonText>
            </IonLabel>
            {expirationData.days && (
              <IonBadge color={expirationData.color}>
                {expirationData.days} {text[l].days}
              </IonBadge>
            )}
          </>
        ) : (
          <>
            <IonAvatar>
              <IonSkeletonText
                animated
                style={{ width: "30px", height: "30px", borderRadius: "50%" }}
              ></IonSkeletonText>
            </IonAvatar>
            <IonLabel>
              <IonSkeletonText
                animated
                style={{ width: "100%", height: "15px" }}
              ></IonSkeletonText>
            </IonLabel>
          </>
        )}
      </IonItem>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.expirationDate === nextProps.expirationDate &&
      prevProps.openFoodProductID === nextProps.openFoodProductID &&
      prevProps.quantity === nextProps.quantity &&
      prevProps.unit === nextProps.unit
    );
  }
);

export default PantryItemExpiring;
