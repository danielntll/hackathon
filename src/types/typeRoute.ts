import { typeAvailableLanguagesModel } from "./typeAvailableLanguage";

export type typeRoute = {
    path_base?: string; // Nel caso di path con :id (Es: "/pantry/")
    path: string; // Full path, anche con :id - ES: "/pantry/:pantryProductID" or "/home"
    tab: typeAvailableLanguagesModel;
    icons: {
      active: string;
      notActive: string;
    };
  };
  