import React from "react";
import { ThemeProvider } from "next-themes";
import { Inter } from "@next/font/google";
import Footer from "./footer";
import Navbar from "./header";

interface Props {
  children: React.ReactNode;
}
const inter = Inter({ subsets: ["latin"] });

const Layout = ({ children }: Props) => {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <div className={inter.className}>
        < Navbar/>
        {children}
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Layout;
