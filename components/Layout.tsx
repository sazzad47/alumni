import React from "react";
import { ThemeProvider } from "next-themes";
import { Inter } from "@next/font/google";
import { useRouter } from "next/router";
import Navbar from "./header";
import Footer from './footer';

interface Props {
  children: React.ReactNode;
}
const inter = Inter({ subsets: ["latin"] });

const Layout = ({ children }: Props) => {
  const router = useRouter();
  return (
    <ThemeProvider enableSystem={false} attribute="class">
      <div className={inter.className}>
        {!router.pathname.includes('admin') && <Navbar />}
       
        {children}
        {!router.pathname.includes('admin') && <Footer />}
      </div>
    </ThemeProvider>
  );
};

export default Layout;
