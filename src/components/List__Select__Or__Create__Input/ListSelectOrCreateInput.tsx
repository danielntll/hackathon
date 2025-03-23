import {
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonSelect,
  IonSelectOption,
  IonSpinner,
} from "@ionic/react";
import { useContextLanguage } from "../../context/contextLanguage";
import "./ListSelectOrCreateInput.module.css";
import { text } from "./text";
import { enumMealType } from "../../enums/enumMealType";
import { useContextList } from "../../context/contextList";
import { useEffect } from "react";
import { useState } from "react";
import { add, refresh } from "ionicons/icons";

interface ContainerProps {
  selectedList: string | undefined;
  setSelectedList: (uid: string | undefined) => void;
}

const ListSelectOrCreateInput: React.FC<ContainerProps> = (props) => {
  //VARIABLES ------------------------
  const { l } = useContextLanguage();
  const { lists } = useContextList();
  //USE STATES -----------------------
  const [loaded, setLoaded] = useState<boolean>(false);
  const [creating, setCreating] = useState<boolean>(false);
  //USE EFFECTS ----------------------
  useEffect(() => {
    if (lists.length > 0) {
      setLoaded(true);
    }
  }, [lists]);
  //FUNCTIONS ------------------------
  async function handleCreate() {
    setCreating(true);

    setCreating(false);
  }
  //RETURN COMPONENT -----------------
  return (
    <IonList inset>
      <IonItem>
        {loaded ? (
          <IonSelect
            label={text[l].list}
            value={props.selectedList}
            onIonChange={(e) => props.setSelectedList(e.detail.value)}
          >
            {lists.map((list) => (
              <IonSelectOption key={list.uid} value={list.uid}>
                {list.name}
              </IonSelectOption>
            ))}
          </IonSelect>
        ) : (
          <>
            <IonLabel>{text[l].list}</IonLabel>
            <IonSpinner slot="end"></IonSpinner>
          </>
        )}
      </IonItem>
      <IonItem>
        <IonButton
          disabled={!props.selectedList}
          fill="clear"
          color="medium"
          onClick={() => props.setSelectedList(undefined)}
        >
          {text[l].restore}
        </IonButton>
        <IonButton slot="end" disabled={creating} onClick={handleCreate}>
          {text[l].create}
          <IonIcon icon={add} />
        </IonButton>
      </IonItem>
    </IonList>
  );
};

export default ListSelectOrCreateInput;
