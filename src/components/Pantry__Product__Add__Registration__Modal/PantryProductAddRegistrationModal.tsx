import {
  IonAccordion,
  IonAccordionGroup,
  IonButton,
  IonDatetime,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonSpinner,
} from "@ionic/react";
import { useContextLanguage } from "../../context/contextLanguage";
import "./PantryProductAddRegistrationModal.module.css";
import { text } from "./text";
import { useState, useEffect } from "react";
import PantryProductQuantityInput from "../Pantry__Product__Quantity__Input/PantryProductQuantityInput";
import PantryProductUnitInput from "../Pantry__Product__Unit__Input/PantryProductUnitInput";
import { enumPantryUnit } from "../../enums/enumPantryUnit";
import { typeOpenFoodQuantityUnitInfo } from "../../types/typeOpenFoodBasicInfo";
import PantryProductItemCountInput from "../Pantry__Product__ItemCount__Input/PantryProductItemCountInput";
import PantryProductPricePerItemInput from "../Pantry__Product__PricePerItem__Input/PantryProductPricePerItemInput";
import { add, cashOutline, checkmarkOutline } from "ionicons/icons";
import PantryProductStatsLastPriceItem from "../Pantry__Product__Stats__LastPrice__Item/PantryProductStatsLastPriceItem";
import { useContextPantry } from "../../context/contextPantry";
import { format, parseISO } from "date-fns";
import ListSelectOrCreateInput from "../List__Select__Or__Create__Input/ListSelectOrCreateInput";
import { typePantryProductPriceRecordInput } from "../../types/type__Pantry__Product__Price__Record__Input";
import { typePantryProductInputsRequired } from "../../types/type__Pantry__Product__Inputs__Required";
interface ContainerProps {
  quantityUnitInfo?: typeOpenFoodQuantityUnitInfo;
  loaded: boolean;
  scannedID: string;
}

const PantryProductAddRegistrationModal: React.FC<ContainerProps> = (props) => {
  //VARIABLES ------------------------
  const { l } = useContextLanguage();
  const { addPantryProductPriceRecord, addPantryProduct } = useContextPantry();
  //FUNCTIONS ------------------------

  function formatDate(value: string): string {
    return format(parseISO(value), "dd MMM yyyy");
  }
  async function addProduct() {
    setUploading(true);

    const inputs: typePantryProductInputsRequired = {
      openFoodProductID: props.scannedID,
      itemCount,
      quantity,
      unit,
      pricePerItem,
      expirationDate: date,
      listUID: selectedListUID,
    };

    await addPantryProduct(inputs);
    setUploading(false);
  }
  async function addPriceRecord() {
    setPriceRecordUploading(true);

    const inputs: typePantryProductPriceRecordInput = {
      openFoodProductID: props.scannedID,
      price: pricePerItem ?? 0,
      date: new Date().toISOString(),
    };
    await addPantryProductPriceRecord(inputs);
    setPriceRecordUploading(false);
  }
  //USE STATES -----------------------
  const [itemCount, setItemCount] = useState<number>(1);
  const [quantity, setQuantity] = useState<number | undefined>(undefined);
  const [unit, setUnit] = useState<enumPantryUnit>(enumPantryUnit.g);
  const [pricePerItem, setPricePerItem] = useState<number | undefined>(
    undefined
  );

  const [uploading, setUploading] = useState<boolean>(false);
  const [priceRecordUploading, setPriceRecordUploading] =
    useState<boolean>(false);
  const [date, setDate] = useState<string | undefined>(undefined);
  const [selectedListUID, setSelectedListUID] = useState<string | undefined>(
    undefined
  );
  //USE EFFECTS ----------------------
  useEffect(() => {
    if (props.quantityUnitInfo) {
      setQuantity(parseInt(props.quantityUnitInfo.product_quantity));
      setUnit(props.quantityUnitInfo.product_quantity_unit);
    }
  }, [props.quantityUnitInfo]);

  //RETURN COMPONENT -----------------
  return (
    <div>
      {/* ----------------- ADD PRODUCT BUTTON ----------------- */}
      <div className="ion-padding-horizontal">
        <IonButton
          disabled={
            uploading || pricePerItem === undefined || pricePerItem === 0
          }
          onClick={addProduct}
          expand="block"
          color="success"
        >
          <IonLabel>{text[l].addProduct}</IonLabel>
          {uploading ? (
            <IonSpinner className="ion-margin-start-icon" />
          ) : (
            <IonIcon className="ion-margin-start-icon" icon={add} />
          )}
        </IonButton>
      </div>
      {/* ----------------- PRICE PER ITEM ----------------- */}
      <IonList inset>
        <PantryProductPricePerItemInput
          pricePerItem={pricePerItem}
          setPricePerItem={setPricePerItem}
        />
        <PantryProductStatsLastPriceItem productID={props.scannedID} />
        <IonItem>
          <IonButton
            slot="end"
            disabled={
              priceRecordUploading || !pricePerItem || pricePerItem === 0
            }
            onClick={addPriceRecord}
            fill="clear"
          >
            <IonLabel>{text[l].addPriceRecord}</IonLabel>
            {priceRecordUploading ? (
              <IonSpinner className="ion-margin-start-icon" />
            ) : (
              <IonIcon className="ion-margin-start-icon" icon={cashOutline} />
            )}
          </IonButton>
        </IonItem>
      </IonList>
      {/* ----------------- ITEM COUNT ----------------- */}
      <IonList inset>
        <PantryProductItemCountInput
          itemCount={itemCount}
          setItemCount={setItemCount}
          loaded={props.loaded}
        />
      </IonList>
      {/* ----------------- QUANTITY ----------------- */}
      <div>
        <IonList inset>
          <PantryProductQuantityInput
            quantity={quantity}
            setQuantity={setQuantity}
            disableAdd={false}
            disableRemove={false}
            loaded={props.loaded}
          />
          <PantryProductUnitInput
            loaded={props.loaded}
            unit={unit}
            setUnit={setUnit}
          />
        </IonList>
        <IonLabel>
          <p className="ion-padding-horizontal">{text[l].quantityInputInfo}</p>
        </IonLabel>
      </div>
      {/* ----------------- EXPIRATION DATE ----------------- */}
      <IonList inset>
        <IonAccordionGroup>
          <IonAccordion value="data">
            <IonItem slot="header">
              <IonLabel>{text[l].expirationDate}</IonLabel>
              <IonNote slot="end" className="ion-margin-end" id="start-date">
                {date}
              </IonNote>
            </IonItem>
            <IonDatetime
              slot="content"
              presentation="date"
              id="datetime-start"
              onIonChange={(ev) => {
                const value = Array.isArray(ev.detail.value)
                  ? ev.detail.value[0]
                  : ev.detail.value;
                setDate(formatDate(value!));
              }}
              min={new Date().toISOString()}
              locale={l === "it_IT" ? "it-IT" : "en-GB"}
            ></IonDatetime>
          </IonAccordion>
        </IonAccordionGroup>
      </IonList>
      {/* ----------------- LIST SELECT OR CREATE INPUT ----------------- */}
      <>
        <ListSelectOrCreateInput
          selectedList={selectedListUID}
          setSelectedList={setSelectedListUID}
        />
        <IonLabel>
          <p className="ion-padding-horizontal">
            {text[l].listInputInfo}
            <IonIcon color="primary" icon={checkmarkOutline} />
          </p>
        </IonLabel>
      </>
    </div>
  );
};

export default PantryProductAddRegistrationModal;
