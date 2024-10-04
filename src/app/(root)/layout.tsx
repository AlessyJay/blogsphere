import LeftsideBar from "@/components/shared/LeftSideBar";
import MobileNavbar from "@/components/shared/MobileNavbar";
import React from "react";

const layout = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="flex max-sm:flex-col">
      <LeftsideBar />
      {children}
      <MobileNavbar />
    </div>
  );
};

export default layout;
