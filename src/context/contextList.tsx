import { createContext, useContext, useEffect, useState } from "react";
import { typeList } from "../types/typeList";
type typeContextList = {};

const ContextList = createContext<typeContextList>({});

export const useContextList = () => useContext(ContextList);

export const ContextListProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Variables ------------------------
  // UseStates ------------------------
  const [list, setList] = useState<typeList[]>([]);
  // UseEffects -----------------------
  useEffect(() => {
    fetchList();
  }, []);
  // Functions ------------------------
  async function fetchList() {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setList(list);
  }
  // Return ---------------------------
  return <ContextList.Provider value={{}}>{children}</ContextList.Provider>;
};
