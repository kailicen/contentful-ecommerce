import React, { ReactNode } from "react";
import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col justify-between ">
      <Navbar />
      <main className="container m-auto mt-4 px-4">{children}</main>
      <footer className="flex h-10 justify-center items-center shadow-inner">
        <p>Copyright © 2023 Kaili Cen</p>
      </footer>
    </div>
  );
};
export default Layout;
