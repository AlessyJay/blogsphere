import Blogs from "@/components/shared/Blogs";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Heart, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import React from "react";

const LinkedBlogs = () => {
  return (
    <div className="min-h-screen w-full flex-1 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="flex items-center text-3xl font-bold text-black">
            <Heart className="mr-2 size-8 text-red-500" />
            Your Liked Blogs
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

export default LinkedBlogs;
