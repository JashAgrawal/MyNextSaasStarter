import React from "react";
import { useUser } from "@clerk/nextjs";

const IsPaid = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();
  if (user?.publicMetadata?.hasAccess) {
    return <div>{children}</div>;
  }
  return null;
};

export default IsPaid;
