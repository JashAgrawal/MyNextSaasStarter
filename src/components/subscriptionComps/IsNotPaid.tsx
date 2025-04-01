import React from "react";
import { useUser } from "@clerk/nextjs";

const IsNotPaid = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();
  if (user?.publicMetadata?.hasAccess) {
    return null;
  }
  return <div>{children}</div>;
};

export default IsNotPaid;
