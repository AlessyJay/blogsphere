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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { GetAllBookmarks } from "@/constants/actions/user.actions";

const Bookmarks = async () => {
  const result = await GetAllBookmarks();
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
          <div className="space-y-6">
            {result?.map((item) => {
              return (
                <Card key={item.id} className="bg-slate-100">
                  <CardHeader>
                    <div className="flex items-center">
                      <Avatar className="size-8">
                        <AvatarFallback>A</AvatarFallback>
                      </Avatar>
                      <div className="ml-2">
                        <CardTitle className="text-lg">
                          Blog Post Title {item.blog.title}
                        </CardTitle>
                        <CardDescription>
                          by Author {item.user.displayName} • 5 minutes read
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-3 text-muted-foreground">
                      {item.blog.content}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <Link
                        href={`/blog/${item}`}
                        className={buttonVariants({ variant: "default" })}
                      >
                        Read More
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookmarks;
