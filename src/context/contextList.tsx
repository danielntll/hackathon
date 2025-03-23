import { createContext, useContext, useEffect, useState } from "react";
import { typeList } from "../types/typeList";
type typeContextList = {
  lists: typeList[];
};

const ContextList = createContext<typeContextList>({
  lists: [],
});

export const useContextList = () => useContext(ContextList);

export const ContextListProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Variables ------------------------
  // UseStates ------------------------
  const [lists, setLists] = useState<typeList[]>([]);
  // UseEffects -----------------------
  useEffect(() => {
    fetchList();
  }, []);
  // Functions ------------------------
  async function fetchList() {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLists(lists);
  }
  // Return ---------------------------
  return (
    <ContextList.Provider value={{ lists }}>{children}</ContextList.Provider>
  );
};
