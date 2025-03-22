import { createContext, useContext, useState } from "react";
import { typeAvailableLanguages } from "../types/typeAvailableLanguage";

type typeContextLanguage = {
  l: typeAvailableLanguages;
  updateLanguage: (language: typeAvailableLanguages) => void;
};

const ContextLanguage = createContext<typeContextLanguage>({
  l: "it_IT",
  updateLanguage: () => {},
});

export const useContextLanguage = () => useContext(ContextLanguage);

export const ContextLanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Variables ------------------------
  // UseStates ---------------------------
  const [l, setLanguage] = useState<typeAvailableLanguages>("it_IT");
  // UseEffects -----------------------
  // Functions ------------------------
  const updateLanguage = (newLanguage: typeAvailableLanguages) => {
    setLanguage(newLanguage);
  };
  // Return ---------------------------
  return (
    <ContextLanguage.Provider value={{ l, updateLanguage }}>
      {children}
    </ContextLanguage.Provider>
  );
};
