"use client";

import { BookOpen, Pencil } from "lucide-react";
import React from "react";
import { buttonVariants } from "../ui/button";
import Link from "next/link";
import { leftSideBar } from "@/constants";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "../ui/avatar";

const LeftsideBar = () => {
  const pathname = usePathname();
  return (
    <aside className="relative hidden w-[300px] border-r px-7 md:block">
      <div className="sticky left-0 top-0 flex h-screen flex-col">
        <div className="mb-6 flex items-center gap-3 pt-6">
          <Link href="/" className="flex items-center gap-3">
            <BookOpen className="size-6" />
            <p className="text-xl font-semibold">BlogSphere</p>
          </Link>
        </div>

        <Link
          className={buttonVariants({
            variant: "default",
            className: "mb-6 flex items-center justify-center gap-2",
          })}
          href="/writeblog"
        >
          <Pencil />
          <p className="text-lg">Write a Blog</p>
        </Link>

        <nav className="mb-6 space-y-2">
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
                    className={`flex items-center gap-2 rounded-md p-2 ${isActive ? "bg-gray-100 font-semibold text-gray-700 shadow-sm" : "hover:bg-zinc-200"}`}
                  >
                    {React.createElement(item.icon, { className: "size-6" })}
                    {item.title}
                  </Link>
                );
              },
            )}
        </nav>

        <footer className="mb-6 mt-auto flex items-center gap-3 rounded-md border bg-background p-2 shadow-sm">
          <Link href={`/profile`} className="size-full">
            <div className="flex items-center gap-3">
              <Avatar>
                {/* {authenticated.picture && (
                <AvatarImage src={authenticated.picture} />
              )} */}
                <AvatarFallback>TP</AvatarFallback>
              </Avatar>
              <p>Tony Peeranat</p>
            </div>
          </Link>
        </footer>
      </div>
    </aside>
  );
};

export default LeftsideBar;
