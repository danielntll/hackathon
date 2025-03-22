import React from "react";
import styles from "./PantryProductBaseInfo.module.css";
import {
  IonLabel,
  IonSkeletonText,
  IonThumbnail,
  IonToolbar,
} from "@ionic/react";

interface ContainerProps {
  subtitle: string;
  title: string;
  imageUrl: string;
  loaded: boolean;
}

const PantryProductBaseInfo: React.FC<ContainerProps> = React.memo((props) => {
  /// CONTEXT VARIABLES ---------------------
  /// USE STATE -----------------------------
  /// USE EFFECT ----------------------------
  /// FUNCTIONS -----------------------------
  /// RETURN --------------------------------
  return (
    <div className={styles.container + " ion-padding"}>
      <IonThumbnail className={styles.container__img}>
        {props.loaded === true ? (
          <img className={styles.img} src={props.imageUrl} alt="" />
        ) : (
          <IonSkeletonText
            animated={true}
            style={{ width: "80px", borderRadius: "8px" }}
          />
        )}
      </IonThumbnail>

      <div className={styles.container__text + " ion-margin-start"}>
        <IonLabel>
          <p>
            {props.loaded === true ? (
              props.subtitle
            ) : (
              <IonSkeletonText animated={true} style={{ width: "60%" }} />
            )}
          </p>
        </IonLabel>
        <h1 className={styles.container__title}>
          {props.loaded === true ? (
            props.title
          ) : (
            <IonSkeletonText
              animated={true}
              style={{ width: "80%", height: "20px" }}
            />
          )}
        </h1>
      </div>
    </div>
  );
});

export default PantryProductBaseInfo;
