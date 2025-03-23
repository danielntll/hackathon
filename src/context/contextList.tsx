import { createContext, useContext, useEffect, useState } from "react";
import { typeList } from "../types/typeList";
type typeContextList = {
  lists: typeList[] | undefined;
  getLists: () => Promise<typeList[] | undefined>;
  createNewList: (name: string) => Promise<void>;
};

const ContextList = createContext<typeContextList>({
  lists: undefined,
  getLists: () => Promise.resolve([]),
  createNewList: () => Promise.resolve(),
});

export const useContextList = () => useContext(ContextList);

export const ContextListProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Variables ------------------------
  // UseStates ------------------------
  const [lists, setLists] = useState<typeList[] | undefined>(undefined);
  // UseEffects -----------------------
  useEffect(() => {
    fetchList();
  }, []);
  // Functions ------------------------
  async function fetchList() {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLists(lists);
  }
  async function getLists() {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return lists;
  }
  async function createNewList(name: string) {
    console.log("createNewList", name);
    setLists([...(lists ?? []), { uid: "1", name: name, productsIDs: [] }]);
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
  // Return ---------------------------
  return (
    <ContextList.Provider value={{ lists, getLists, createNewList }}>
      {children}
    </ContextList.Provider>
  );
};
