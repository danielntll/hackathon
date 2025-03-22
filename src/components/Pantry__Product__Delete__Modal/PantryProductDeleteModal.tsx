import {
  IonModal,
  IonContent,
  IonLabel,
  IonButton,
  IonIcon,
  IonList,
  IonTextarea,
  IonItem,
} from "@ionic/react";
import { useContextLanguage } from "../../context/contextLanguage";
import { useContextPantry } from "../../context/contextPantry";
import "./PantryProductDeleteModal.module.css";
import { text } from "./text";
import { trash } from "ionicons/icons";
import { useState } from "react";
interface ContainerProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onDidDimiss: () => void;
  pantryProductUID: string;
}

const PantryProductDeleteModal: React.FC<ContainerProps> = (props) => {
  //VARIABLES ------------------------
  const { l } = useContextLanguage();
  const { pantryProduct } = useContextPantry();
  //USE STATES -----------------------
  const [description, setDescription] = useState<string>("");
  //USE EFFECTS ----------------------
  //FUNCTIONS ------------------------
  async function handleDelete() {
    await deletePantryProduct(props.pantryProductUID);
    props.setIsOpen(false);
  }
  //RETURN COMPONENT -----------------
  return (
    <IonModal
      isOpen={props.isOpen}
      onDidDismiss={props.onDidDimiss}
      initialBreakpoint={0.45}
      breakpoints={[0.45, 0.6, 0.75]}
    >
      <IonContent>
        <div className="ion-padding">
          <IonLabel>
            <h1>Sei sicuro di voler eliminare questo prodotto?</h1>
            <p>
              Questa azione è irreversibile e il prodotto verrà eliminato dalla
              tua dispensa.
            </p>
          </IonLabel>
        </div>

        <div className="ion-padding-bottom">
          <IonList inset>
            <IonItem>
              <IonTextarea
                labelPlacement="stacked"
                label={text[l].descriptionLabel}
                placeholder={text[l].descriptionPlaceholder}
              />
            </IonItem>
          </IonList>
        </div>
        <div className="ion-padding-horizontal">
          <IonButton expand="block" color="danger" onClick={handleDelete}>
            {text[l].delete}
            <IonIcon className="ion-margin-start-icon" icon={trash} />
          </IonButton>
          <IonButton
            fill="clear"
            expand="block"
            color="primary"
            onClick={() => props.setIsOpen(false)}
          >
            {text[l].cancel}
          </IonButton>
        </div>
      </IonContent>
    </IonModal>
  );
};

export default PantryProductDeleteModal;
