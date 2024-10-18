"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings, BookOpen, UserRoundPlus } from "lucide-react";
import Link from "next/link";

const UserProfile = ({ user, session }: { user: any; session: any }) => {
  const [activeTab, setActiveTab] = useState<string>("posts");

  // console.log(user);

  return (
    <div className="min-h-screen w-full flex-1">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <div className="mt-10 rounded-lg bg-slate-100 p-6 shadow-lg max-sm:mt-4">
            <div className="sm:flex sm:items-center sm:justify-between">
              <div className="sm:flex sm:space-x-5">
                <div className="shrink-0">
                  <Avatar className="mx-auto size-20 rounded-full border-4 border-white">
                    {user?.image && <AvatarImage src={user?.image} />}
                    <AvatarFallback>
                      {user?.firstName[0]}
                      {user?.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="mt-4 max-sm:text-center sm:mt-0 sm:pt-1 sm:text-left">
                  <p className="text-xl font-bold text-black sm:text-2xl">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-sm font-medium text-muted-foreground">
                    @{user?.displayName}
                  </p>
                  {user?.shortBio && (
                    <p className="mt-2 text-sm text-muted-foreground">
                      {user?.bio}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-5 flex justify-center sm:mt-0">
                {session?.user?.id !== user?.id && (
                  <Button className="mr-2">
                    <UserRoundPlus className="mr-2 size-4" />
                    Follow
                  </Button>
                )}
                <Link
                  href="/profile/settings"
                  className={buttonVariants({ variant: "outline" })}
                >
                  <Settings className="mr-2 size-4" />
                  Settings
                </Link>
              </div>
            </div>

            <div className="mt-6 flex justify-around border-t border-gray-200 pt-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-black">
                  {user?.blogs.length}
                </p>
                <p className="text-sm font-medium text-muted-foreground">
                  Blogs
                </p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-black">
                  {user?.followers.length}
                </p>
                <p className="text-sm font-medium text-muted-foreground">
                  Followers
                </p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-black">
                  {user?.following.length}
                </p>
                <p className="text-sm font-medium text-muted-foreground">
                  Following
                </p>
              </div>
            </div>
          </div>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="mt-6 bg-transparent"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="posts">
                <BookOpen className="mr-2 size-4" />
                Posts
              </TabsTrigger>
              <TabsTrigger value="about">
                <BookOpen className="mr-2 size-4" />
                About
              </TabsTrigger>
              <TabsTrigger value="stats">
                <BookOpen className="mr-2 size-4" />
                Stats
              </TabsTrigger>
            </TabsList>
            <TabsContent value="posts">
              <Card>
                <CardHeader>
                  <CardTitle>Recents Posts</CardTitle>
                  <CardDescription>
                    Browse through Tony&apos;s latest blog posts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {user.blogs.length > 0 ? (
                      user.blogs.map((item: any) => (
                        <div
                          className="rounded-lg border bg-slate-50 p-4 shadow-sm"
                          key={item.id}
                        >
                          <h3 className="text-lg font-semibold text-black">
                            {item.title}
                          </h3>
                          <p className="line-clamp-3 text-sm text-muted-foreground">
                            {item.content}
                          </p>
                          <div className="mt-2 flex items-center justify-between space-x-4">
                            <div className="flex-col space-x-5 max-sm:flex max-sm:gap-1 max-sm:space-x-0">
                              <Badge
                                variant={"default"}
                                className="max-sm:w-fit"
                              >
                                {item.likes.length} likes
                              </Badge>
                              <Badge
                                variant={"default"}
                                className="max-sm:w-fit"
                              >
                                {item.comments.length} comments
                              </Badge>
                              <Badge
                                variant={"default"}
                                className="max-sm:w-fit"
                              >
                                {item.shares.length} shares
                              </Badge>
                            </div>
                            <Button className="my-2">Read More</Button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="rounded-lg border bg-slate-50 p-4 shadow-sm">
                        <p className="text-center text-base text-muted-foreground">
                          No blogs have been created yet
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="about">
              <Card>
                <CardHeader>
                  <CardTitle>About {user?.firstName}</CardTitle>
                  <CardDescription>
                    Learn more about {user?.firstName}&apos;s background and
                    interests
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {user?.bio ? (
                    <p className="text-gray-700">{user?.bio}</p>
                  ) : (
                    <div className="rounded-lg border bg-slate-50 p-4 shadow-sm">
                      <p className="text-center text-base text-muted-foreground">
                        Unfortunately, {user?.firstName} has not added a bio yet
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="stats">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Statistics</CardTitle>
                  <CardDescription>
                    An overview of Tony&apos;s blog performance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Total Views</span>
                      <span className="text-2xl font-bold">24,516</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        Average Likes per Post
                      </span>
                      <span className="text-2xl font-bold">87</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        Comments Received
                      </span>
                      <span className="text-2xl font-bold">1,203</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
