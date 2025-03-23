import { FieldValue, Timestamp } from "firebase/firestore";

export interface typeFirebaseDataStructure {
  uid?: string; // Ci penserà Firebase ad assegnarlo
  createdAt?: Timestamp | FieldValue;
  updatedAt?: Timestamp | FieldValue;
  byUserUID?: string;
}
