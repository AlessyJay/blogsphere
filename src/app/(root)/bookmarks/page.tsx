"use client";

import React from "react";
import { Bookmark, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Blogs from "@/components/shared/Blogs";

const Bookmarks = () => {
  return (
    <div className="min-h-screen w-full flex-1 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="flex items-center text-3xl font-bold text-black">
            <Bookmark className="mr-2 size-8 text-primary" />
            Your Bookmarks
          </h1>
        </div>

        <div className="mb-6 flex items-center space-x-4">
          <div className="relative grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input className="pl-10" placeholder="Search bookmarks..." />
          </div>

          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date-new" className="cursor-pointer">
                Date (Newest)
              </SelectItem>
              <SelectItem value="date-new" className="cursor-pointer">
                Date (Oldest)
              </SelectItem>
              <SelectItem value="date-new" className="cursor-pointer">
                Alphabetically
              </SelectItem>
              <SelectItem value="date-new" className="cursor-pointer">
                Author
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-6">
          <Blogs />
        </div>
      </div>
    </div>
  );
};

export default Bookmarks;
