import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bell, BookHeart, Heart, Home } from "lucide-react";
import Link from "next/link";

const MobileNavbar = () => {
  return (
    <section className="sticky bottom-0 z-10 hidden h-14 w-full border bg-white max-sm:block">
      <div className="grid h-full grid-cols-5">
        <Link href="/" className="flex items-center justify-center border-r">
          <div>
            <Home className="size-8" />
          </div>
        </Link>
        <Link
          href="/bookmarks"
          className="flex items-center justify-center border-r"
        >
          <div>
            <BookHeart className="size-8" />
          </div>
        </Link>
        <Link
          href="/likedblogs"
          className="flex items-center justify-center border-r"
        >
          <div>
            <Heart className="size-8" />
          </div>
        </Link>
        <Link
          href="/notifications"
          className="flex items-center justify-center border-r"
        >
          <div>
            <Bell className="size-8" />
          </div>
        </Link>
        <Link
          href="/profile"
          className="flex items-center justify-center border-r"
        >
          <Avatar>
            <AvatarFallback>T</AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </section>
  );
};

export default MobileNavbar;
