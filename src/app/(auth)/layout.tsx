import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <div className="mx-auto flex-1">{children}</div>;
};

export default layout;
