import Navbar from "@/components/common/navbar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen w-screen flex-col">
      <Navbar />
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default Layout;
