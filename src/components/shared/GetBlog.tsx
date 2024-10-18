"use client";

import React, { useState } from "react";
import {
  Heart,
  MessageSquare,
  Bookmark,
  Share2,
  MoreHorizontal,
  Send,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Form } from "@/components/ui/form";
import { WriteCommentValidation } from "@/constants/FormValidation";
import { TextAreaForm } from "@/components/shared/FormComponents";
import { formatBlogDate } from "@/lib/utils";
import { Badge } from "../ui/badge";

const GetBlog = ({ blog }: { blog: any }) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  const { form, onSubmit } = WriteCommentValidation({
    authorId: blog.authorId,
    blogId: blog.id,
  });

  const handleBookmark = async () => {
    try {
      const res = await fetch("/api/bookmark", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ blogId: blog.id }),
      });

      const data = await res.json();

      if (res.ok) {
        setIsBookmarked((prev) => !prev);
      } else {
        console.error("Something went wrong while bookmarking: ", data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(isBookmarked);

  return (
    <div className="min-h-screen w-full flex-1 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col md:flex-row">
          <div className="mb-4 md:mb-0 md:mr-4 md:w-1/6">
            <div className="hidden items-center justify-between space-x-4 md:sticky md:top-20 md:flex md:flex-col md:space-x-0 md:space-y-4">
              <Button
                variant={"outline"}
                size={"icon"}
                className={`rounded-full ${isLiked ? "bg-red-100 text-red-500" : ""}`}
                onClick={() => setIsLiked(!isLiked)}
              >
                <Heart className="size-4" />
              </Button>
              <Button variant={"outline"} size="icon" className="rounded-full">
                <MessageSquare className="size-4" />
              </Button>
              <Button
                variant="outline"
                size={"icon"}
                className={`rounded-full ${isBookmarked ? "bg-blue-100 text-blue-500" : ""}`}
                onClick={handleBookmark}
              >
                <Bookmark className="size-4" />
              </Button>
              <Button
                variant={"outline"}
                size={"icon"}
                className="rounded-full"
              >
                <Share2 className="size-4" />
              </Button>
            </div>
          </div>

          <div className="flex-1">
            <Card className="flex-1 sm:mb-5">
              <CardHeader>
                <div className="mb-4 flex items-start justify-between">
                  <CardTitle className="text-3xl font-bold">
                    {blog.title}
                  </CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant={"ghost"} className="size-8 p-0">
                        <MoreHorizontal className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        Report Content
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarFallback>
                      {blog.author.username
                        .split(" ")
                        .map((i: string) => i[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">
                      {blog.author.firstName} {blog.author.lastName}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatBlogDate(blog.createdAt)} •{" "}
                      {blog.estimatedReadTime} minutes read
                    </p>
                  </div>
                </div>

                <div className="flex pt-5">
                  {blog.BlogCategory.map((cate: any) => (
                    <Badge key={cate.blogId}>{cate?.category.name}</Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
              </CardContent>
            </Card>

            {/* For mobile action buttons */}
            <div className="sticky inset-x-0 bottom-0 flex justify-around bg-white p-4 md:hidden">
              <Button
                variant={"outline"}
                size={"icon"}
                className={`rounded-full ${isLiked ? "bg-red-100" : ""}`}
                onClick={() => setIsLiked(!isLiked)}
              >
                <Heart className="size-4" />
              </Button>
              <Button
                variant={"outline"}
                size={"icon"}
                className="rounded-full"
              >
                <MessageSquare className="size-4" />
              </Button>
              <Button
                variant={"outline"}
                size={"icon"}
                className={`rounded-full ${isBookmarked ? "bg-blue-100 text-blue-500" : ""}`}
                onClick={handleBookmark}
              >
                <Bookmark className="size-4" />
              </Button>
              <Button
                variant={"outline"}
                size={"icon"}
                className="rounded-full"
              >
                <Share2 className="size-4" />
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Comments</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="mb-6">
                    <div className="flex items-start space-x-4">
                      <Avatar>
                        <AvatarImage src={blog.author?.image} />
                        <AvatarFallback>
                          {blog.author.displayName[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <TextAreaForm
                          control={form.control}
                          formName="content"
                          title=""
                          placeholder="Add a comment"
                        />
                        <Button type="submit" className="my-2">
                          <Send className="mr-2 size-4" />
                          Post Comment
                        </Button>
                      </div>
                    </div>
                  </form>
                </Form>
                <div className="space-y-6">
                  {blog.comments.map((comment: any) => (
                    <React.Fragment key={comment.id}>
                      <div key={comment.id} className="flex space-x-4">
                        <Avatar>
                          <AvatarImage src={blog.author?.image} />
                          <AvatarFallback>
                            {blog.author.username
                              .split(" ")
                              .map((n: string) => n[0])
                              .join("")
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-semibold">
                              {comment.user.username}
                            </h4>
                            <span className="text-xs text-gray-500">
                              {formatBlogDate(comment.commentedAt)} ago
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-gray-700">
                            {comment.content}
                          </p>
                        </div>
                      </div>
                      <hr className="my-2" />
                    </React.Fragment>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetBlog;
