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
import { useContextList } from "../../context/contextList";
import { useEffect } from "react";
import { useState } from "react";
import { add } from "ionicons/icons";
import ListCreateNewListModal from "../List__Create__New__List__Modal/ListCreateNewListModal";
interface ContainerProps {
  selectedList: string | undefined;
  setSelectedList: (uid: string | undefined) => void;
}

const ListSelectOrCreateInput: React.FC<ContainerProps> = (props) => {
  //VARIABLES ------------------------
  const { l } = useContextLanguage();
  const { lists, getLists } = useContextList();
  //USE STATES -----------------------
  const [loaded, setLoaded] = useState<boolean>(false);
  const [creating, setCreating] = useState<boolean>(false);
  const [creatingModal, setCreatingModal] = useState<boolean>(false);
  //USE EFFECTS ----------------------
  useEffect(() => {
    if (lists === undefined) {
      fetchLists();
    }
  }, [lists]);
  //FUNCTIONS ------------------------
  async function fetchLists() {
    setLoaded(false);
    await getLists();
    setLoaded(true);
  }

  async function handleCreate() {
    setCreatingModal(true);
  }
  //RETURN COMPONENT -----------------
  return (
    <>
      <IonList inset>
        <IonItem>
          {loaded ? (
            <IonSelect
              label={text[l].selectList}
              value={props.selectedList}
              onIonChange={(e) => props.setSelectedList(e.detail.value)}
            >
              {lists?.map((list) => (
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
      {/* ----------------- CREATE NEW LIST MODAL ----------------- */}
      <ListCreateNewListModal
        isOpen={creatingModal}
        setIsOpen={(isOpen) => setCreatingModal(isOpen)}
        onDidDismiss={() => setCreatingModal(false)}
      />
    </>
  );
};

export default ListSelectOrCreateInput;
