import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { buttonVariants } from "../ui/button";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Heart, MessageSquare, Share2 } from "lucide-react";

const Blogs = () => {
  return (
    <div className="space-y-6">
      {[1, 2, 3, 4].map((item) => {
        return (
          <Card key={item}>
            <CardHeader>
              <div className="flex items-center">
                <Avatar className="size-8">
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <div className="ml-2">
                  <CardTitle className="text-lg">
                    Blog Post Title {item}
                  </CardTitle>
                  <CardDescription>
                    by Author {item} • 5 minutes read
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                This is a brief preview of the blog post
              </p>
              <div className="mt-4 flex items-center justify-between">
                <div className="space-x-4">
                  <Badge variant={"outline"} className="gap-1">
                    <Heart size="18" />
                    14 Likes
                  </Badge>
                  <Badge variant={"outline"} className="gap-1">
                    <MessageSquare size="18" />4 Comments
                  </Badge>
                  <Badge variant={"outline"} className="gap-1">
                    <Share2 size="18" />2 Shares
                  </Badge>
                </div>
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
  );
};

export default Blogs;
