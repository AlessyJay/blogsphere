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
import { GetAllPosts } from "@/constants/actions/post.actions";

const Blogs = async () => {
  const result = await GetAllPosts();

  // console.log(result);
  return (
    <div className="space-y-6">
      {result?.map((item) => {
        return (
          <Card key={item.id} className="bg-slate-100">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Avatar className="size-8">
                    <AvatarFallback>
                      {item.author.username[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-2">
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <CardDescription>
                      by Author <strong>{item.author.username}</strong> •{" "}
                      {item.estimatedReadTime} minutes read
                    </CardDescription>
                  </div>
                </div>

                <div className="flex">
                  {item.BlogCategory.map((cate) => (
                    <Badge key={cate.blogId}>{cate.category.name}</Badge>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="line-clamp-3 text-muted-foreground">
                {item.content}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <div className="space-x-4 max-sm:space-x-0">
                  <Badge variant={"default"} className="gap-1">
                    <Heart size="18" />
                    {item.likes.length} Likes
                  </Badge>
                  <Badge variant={"default"} className="gap-1">
                    <MessageSquare size="18" />
                    {item.comments.length} Comments
                  </Badge>
                  <Badge variant={"default"} className="gap-1">
                    <Share2 size="18" />
                    {item.shares.length} Shares
                  </Badge>
                </div>
                <Link
                  href={`/blog/${item.id}`}
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
