import React, { createContext, useMemo, useReducer } from "react";
import { initState } from "./initState";
import { GlobalProps } from "./props";
import Reducer from "./reducer";


export interface StoreProps {
  state: GlobalProps;
  dispatch: React.Dispatch<any>;
}

interface ProviderProps {
  children: React.ReactNode;
}


export const Context = createContext<StoreProps | null>(null);


const StoreProvider = ({children}: ProviderProps) => {
  const [state, dispatch] = useReducer(Reducer, initState);
  const store = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state]
  );

  return (
    <Context.Provider value={store}>{children}</Context.Provider>
  );
};

export { StoreProvider };
