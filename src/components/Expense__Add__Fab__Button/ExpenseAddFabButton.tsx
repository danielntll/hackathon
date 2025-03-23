import { add } from "ionicons/icons";
import "./ExpenseAddFabButton.module.css";
import { text } from "./text";
import { IonFab, IonFabButton, IonIcon } from "@ionic/react";

import { useEffect, useState } from "react";
import PantryProductAddModal from "../Pantry__Product__Add__Modal/PantryProductAddModal";
import { CapacitorBarcodeScanner } from "@capacitor/barcode-scanner";
import {
  Barcode,
  BarcodeScanner,
  ScanResult,
} from "@capacitor-mlkit/barcode-scanning";

interface ContainerProps {}

export type typeScan = {
  valueType: string;
  displayValue: string;
  format: string;
};

const ExpenseAddFabButton: React.FC<ContainerProps> = (props) => {
  //VARIABLES ------------------------
  //USE STATES -----------------------
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scannedID, setScannedID] = useState<string | undefined>(undefined);
  const [barcodes, setBarcodes] = useState<any[]>([]);
  const [isSupported, setIsSupported] = useState<boolean>(false);
  //USE EFFECTS ----------------------
  useEffect(() => {
    if (scannedID) {
      setIsOpen(true);
    }
  }, [scannedID]);

  useEffect(() => {
    const checkSupport = async () => {
      const result = await BarcodeScanner.isSupported();
      setIsSupported(result.supported);
    };

    checkSupport();
  }, []);

  //FUNCTIONS ------------------------

  const requestPermissions = async () => {
    try {
      const { camera } = await BarcodeScanner.requestPermissions();
      return camera === "granted" || camera === "limited";
    } catch (err) {
      console.error("Error requesting camera permissions:", err);
      return false;
    }
  };
  const scan = async () => {
    const granted = await requestPermissions();
    if (!granted) {
      console.log("Camera permission denied");
      return;
    }
    try {
      const x: ScanResult = await BarcodeScanner.scan();
      let codiceABarre: any[] = barcodes;

      const rawScan: Barcode = x.barcodes[0];
      const scan: typeScan = {
        valueType: rawScan.valueType,
        displayValue: rawScan.displayValue,
        format: rawScan.format,
      };

      setScannedID(scan.displayValue);
    } catch (err) {
      console.error("Error scanning barcode:", err);
    }
  };

  function handleCloseModal() {
    setIsOpen(false);
    setScannedID(undefined);
  }
  //RETURN COMPONENT -----------------
  return (
    <>
      <IonFab slot="fixed" vertical="bottom" horizontal="center">
        <IonFabButton onClick={scan}>
          <IonIcon icon={add}></IonIcon>
        </IonFabButton>
      </IonFab>
      {/* ----------------- MODAL ----------------------*/}
      <PantryProductAddModal
        isOpen={isOpen}
        setIsOpen={handleCloseModal}
        scannedID={scannedID ?? ""}
      />
    </>
  );
};

export default ExpenseAddFabButton;
