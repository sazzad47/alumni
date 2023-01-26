import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { StoreProvider } from "../store/store";
import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "../components/admin/state";
import { Provider } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "../components/admin/state/api";

export default function App({ Component, pageProps }: AppProps) {

  
  const store = configureStore({
    reducer: {
      global: globalReducer,
      [api.reducerPath]: api.reducer,
    },
    middleware: (getDefault) => getDefault().concat(api.middleware),
  });
  setupListeners(store.dispatch);

  return (
    <Provider store={store}>
      <StoreProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </StoreProvider>
    </Provider>
  );
}
