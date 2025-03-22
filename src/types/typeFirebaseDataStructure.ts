import { FieldValue, Timestamp } from "firebase/firestore";

export interface typeFirebaseDataStructure {
    uid: string; // UID dell'elemento che sarà registrato sul DB.
    createdAt?: Timestamp | FieldValue;
    updatedAt?: Timestamp | FieldValue;
  }
  