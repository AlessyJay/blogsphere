"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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

const Profile = () => {
  const [activeTab, setActiveTab] = useState<string>("posts");

  const posts = [
    {
      id: 1,
      title: "The Impact of AI on Modern Healthcare",
      desc: "Artificial Intelligence (AI) is revolutionizing modern healthcare by enhancing diagnostics, treatment planning, and patient care. AI-driven algorithms can analyze vast amounts of medical data, improving the accuracy of disease detection, especially in areas like radiology, pathology, and genomics. Predictive analytics powered by AI helps in early disease identification, allowing for more timely interventions. In treatment, AI supports personalized medicine by tailoring therapies to individual patient profiles, improving outcomes and reducing side effects.",
      likes: 128,
      comments: 32,
    },
    {
      id: 2,
      title: "5G Technology: Revolutionizing Connectivity",
      desc: "5G technology is transforming connectivity by delivering faster speeds, lower latency, and greater capacity than previous networks. With speeds up to 100 times faster than 4G, 5G enables real-time communication, revolutionizing industries like healthcare, transportation, and entertainment. It supports the growth of the Internet of Things (IoT), connecting billions of devices seamlessly and powering innovations like smart cities and autonomous vehicles. 5G’s ultra-reliable, low-latency communication enhances remote work, virtual reality, and telemedicine. By creating a more connected and efficient world, 5G is poised to drive unprecedented advancements in technology and global infrastructure.",
      likes: 95,
      comments: 18,
    },
    {
      id: 3,
      title: "The Future of Work: Remote vs. Office",
      desc: "The future of work is increasingly defined by the balance between remote and office-based models. Remote work offers flexibility, reduces commuting time, and allows employees to maintain a better work-life balance. It also enables companies to tap into a global talent pool. However, office environments foster collaboration, spontaneous innovation, and stronger team dynamics. Hybrid models, blending remote and in-office work, are emerging as a popular solution, offering the best of both worlds. As technology continues to evolve, businesses are likely to prioritize flexibility, allowing employees to choose work settings that maximize productivity and job satisfaction.",
      likes: 210,
      comments: 45,
    },
  ];

  return (
    <div className="min-h-screen w-full flex-1">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <div className="mt-10 rounded-lg bg-slate-100 p-6 shadow-lg max-sm:mt-4">
            <div className="sm:flex sm:items-center sm:justify-between">
              <div className="sm:flex sm:space-x-5">
                <div className="shrink-0">
                  <Avatar className="mx-auto size-20 rounded-full border-4 border-white">
                    <AvatarFallback>TP</AvatarFallback>
                  </Avatar>
                </div>
                <div className="mt-4 max-sm:text-center sm:mt-0 sm:pt-1 sm:text-left">
                  <p className="text-xl font-bold text-black sm:text-2xl">
                    Tony
                  </p>
                  <p className="text-sm font-medium text-muted-foreground">
                    @tony
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Possimus, unde.
                  </p>
                </div>
              </div>
              <div className="mt-5 flex justify-center sm:mt-0">
                <Button className="mr-2">
                  <UserRoundPlus className="mr-2 size-4" />
                  Follow
                </Button>
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
                <p className="text-2xl font-bold text-black">6</p>
                <p className="text-sm font-medium text-muted-foreground">
                  Posts
                </p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-black">1</p>
                <p className="text-sm font-medium text-muted-foreground">
                  Followers
                </p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-black">32</p>
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
                    {posts.map((item) => (
                      <div
                        className="rounded-lg border bg-slate-50 p-4 shadow-sm"
                        key={item.id}
                      >
                        <h3 className="text-lg font-semibold text-black">
                          {item.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {item.desc}
                        </p>
                        <div className="mt-2 flex items-center justify-between space-x-4">
                          <div className="space-x-5">
                            <Badge variant={"default"}>
                              {item.likes} likes
                            </Badge>
                            <Badge variant={"default"}>
                              {item.comments} comments
                            </Badge>
                          </div>
                          <Button className="my-2">Read More</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="about">
              <Card>
                <CardHeader>
                  <CardTitle>About Tony</CardTitle>
                  <CardDescription>
                    Learn more about Tony&apos;s background and interests
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Sophia is a passionate tech enthusiast and AI researcher
                    with a keen interest in the intersection of technology and
                    healthcare. When she&apos;s not coding or writing about the
                    latest tech trends, you can find her curled up with a good
                    book and a cup of coffee.
                  </p>
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

export default Profile;
