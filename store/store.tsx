import React, { createContext, useEffect, useMemo, useReducer } from "react";
import { getData } from "../utils/fetchData";
import { initState } from "./initState";
import { GlobalProps } from "./props";
import Reducer from "./reducer";
import { GlobalTypes } from "./types";


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

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if(firstLogin){
        getData('auth/accessToken').then(res => {
            let currentTime = new Date().getTime();
            let diff = res.user.expireIn - currentTime;
            if (res.err || diff < 0) return localStorage.removeItem("firstLogin");
            dispatch({
              type: GlobalTypes.AUTH,
              payload: {
                token: res.access_token,
                user: res.user,
              },
            })
        })
    }

    
},[])
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
