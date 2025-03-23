import { IonInput } from "@ionic/react";
import { IonItem } from "@ionic/react";
import { IonList } from "@ionic/react";
import { IonContent } from "@ionic/react";
import { IonModal } from "@ionic/react";
import { IonButton } from "@ionic/react";
import { IonIcon } from "@ionic/react";
import { IonSpinner } from "@ionic/react";
import { add } from "ionicons/icons";
import { useContextLanguage } from "../../context/contextLanguage";
import "./ListCreateNewListModal.module.css";
import { text } from "./text";
import { useState } from "react";
import { useContextList } from "../../context/contextList";
interface ContainerProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onDidDismiss: () => void;
}

const ListCreateNewListModal: React.FC<ContainerProps> = (props) => {
  //VARIABLES ------------------------
  const { l } = useContextLanguage();
  const { createNewList } = useContextList();
  //USE STATES -----------------------
  const [name, setName] = useState<string | undefined>(undefined);
  const [creating, setCreating] = useState<boolean>(false);
  //USE EFFECTS ----------------------
  //FUNCTIONS ------------------------
  async function handleCreate() {
    setCreating(true);
    await createNewList(name ?? "");
    props.setIsOpen(false);
    setName(undefined);
    setCreating(false);
  }
  //RETURN COMPONENT -----------------
  return (
    <IonModal
      isOpen={props.isOpen}
      onDidDismiss={props.onDidDismiss}
      initialBreakpoint={0.35}
      breakpoints={[0.35, 0.5, 0.75]}
    >
      <IonContent>
        <div className="ion-padding-top">
          <IonList inset>
            <IonItem>
              <IonInput
                label={text[l].name}
                labelPlacement="stacked"
                placeholder={text[l].placeholder}
                type="text"
                value={name}
                clearInput
                onIonInput={(e) => setName(e.detail.value ?? "")}
              />
            </IonItem>
          </IonList>
        </div>
        <div className="ion-padding">
          <IonButton
            expand="block"
            color={"primary"}
            onClick={handleCreate}
            disabled={creating || name === undefined || name === ""}
          >
            {text[l].create}
            {creating ? (
              <IonSpinner className="ion-margin-start-icon" slot="end" />
            ) : (
              <IonIcon className="ion-margin-start-icon" icon={add} />
            )}
          </IonButton>
        </div>
      </IonContent>
    </IonModal>
  );
};

export default ListCreateNewListModal;
