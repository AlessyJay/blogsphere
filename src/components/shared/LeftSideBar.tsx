"use client";

import { BookOpen, Pencil } from "lucide-react";
import React from "react";
import { buttonVariants } from "../ui/button";
import Link from "next/link";
import { leftSideBar } from "@/constants";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const LeftsideBar = (user: any) => {
  const pathname = usePathname();
  return (
    <main>
      <aside className="hidden h-full w-[300px] border-r px-7 max-[1025px]:w-fit md:block">
        <div className="sticky top-0 flex h-screen flex-col max-[1025px]:items-center">
          <div className="mb-6 flex items-center gap-3 pt-6">
            <Link href="/" className="flex items-center gap-3">
              <BookOpen className="size-6 max-[1025px]:size-10" />
              <p className="text-xl font-semibold max-[1025px]:hidden">
                BlogSphere
              </p>
            </Link>
          </div>

          <Link
            className={buttonVariants({
              variant: "default",
              className:
                "mb-6 flex items-center justify-center gap-2 max-[1025px]:w-fit",
            })}
            href="/writeblog"
          >
            <Pencil />
            <p className="text-lg max-[1025px]:hidden">Write a Blog</p>
          </Link>

          <nav className="mb-6 space-y-2 max-[1025px]:w-full max-md:hidden">
            {leftSideBar.length > 0 &&
              leftSideBar.map(
                (item: {
                  id: string;
                  title: string;
                  icon: React.ComponentType<{ className?: string }>;
                  path: string;
                }) => {
                  const isActive: boolean =
                    (pathname.includes(item.path) && item.path.length > 1) ||
                    pathname === item.path;
                  return (
                    <Link
                      key={item.id}
                      href={item.path}
                      className={`flex items-center gap-2 rounded-md p-2 max-[1025px]:justify-center ${isActive ? "bg-gray-100 font-semibold text-gray-700 shadow-sm" : "hover:bg-zinc-200"}`}
                    >
                      {React.createElement(item.icon, {
                        className: "size-6",
                      })}
                      <p className="max-[1025px]:hidden">{item.title}</p>
                    </Link>
                  );
                },
              )}
          </nav>

          <footer className="mb-6 mt-auto flex items-center gap-3 rounded-md border bg-background p-2 shadow-sm">
            <Link href={`/profile`} className="size-full">
              <div className="flex items-center gap-3">
                <Avatar>
                  {user?.image && <AvatarImage src={user?.image} />}
                  <AvatarFallback>
                    {user?.firstName}
                    {user?.lastName}
                  </AvatarFallback>
                </Avatar>
                <p className="max-[1025px]:hidden">
                  {user?.firstName} {user?.lastName}
                </p>
              </div>
            </Link>
          </footer>
        </div>
      </aside>
    </main>
  );
};

export default LeftsideBar;
