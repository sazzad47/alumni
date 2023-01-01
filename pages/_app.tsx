import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { StoreProvider } from "../store/store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StoreProvider>
  );
}
