import LeftsideBar from "@/components/shared/LeftSideBar";
import MobileNavbar from "@/components/shared/MobileNavbar";
import { GetUser } from "@/constants/actions/user.actions";
import React from "react";

const layout = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const result = await GetUser();
  return (
    <div className="flex max-sm:flex-col">
      <LeftsideBar user={{ ...result?.user }} />
      {children}
      <MobileNavbar user={{ ...result?.user }} />
    </div>
  );
};

export default layout;
