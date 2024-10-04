import LeftsideBar from "@/components/shared/LeftSideBar";
import React from "react";

const layout = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="flex">
      <LeftsideBar />
      {children}
    </div>
  );
};

export default layout;
