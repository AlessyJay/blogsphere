"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Bell,
  Bookmark,
  Heart,
  MessageSquare,
  Search,
  UserPlus,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

type Notification = {
  id: number;
  type: "comment" | "like" | "follow" | "bookmark";
  content: string;
  user: string;
  time: string;
  read: boolean;
};

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: "comment",
      content: 'commented on your post "The Future of AI"',
      user: "Alice Johnson",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      type: "like",
      content: 'liked your post "10 Tips for Productivity"',
      user: "Bob Smith",
      time: "4 hours ago",
      read: false,
    },
    {
      id: 3,
      type: "follow",
      content: "started following you",
      user: "Charlie Brown",
      time: "1 day ago",
      read: true,
    },
    {
      id: 4,
      type: "bookmark",
      content: "bookmarked your post 'Beginner's Guide to React'",
      user: "Diana Prince",
      time: "2 days ago",
      read: true,
    },
    {
      id: 5,
      type: "comment",
      content: 'replied to your comment on "Machine Learning Basics"',
      user: "Eve Wilson",
      time: "3 days ago",
      read: true,
    },
  ]);

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((item) =>
        item.id === id ? { ...item, read: true } : item,
      ),
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter((item) => item.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "comment":
        return <MessageSquare className="size-4 text-blue-500" />;
      case "like":
        return <Heart className="size-4 text-red-500" />;
      case "follow":
        return <UserPlus className="size-4 text-green-500" />;
      case "bookmark":
        return <Bookmark className="size-4 text-purple-500" />;
      default:
        return <Bell className="size-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen w-full flex-1 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="flex items-center text-3xl font-bold text-black">
            <Bell className="mr-2 size-8 text-primary" />
            Notifications
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

        <div className="space-x-6 space-y-6">
          <Button variant={"outline"}>All</Button>
          <Button variant={"outline"}>Unread</Button>
          <Button variant={"outline"}>Comment</Button>
          <Button variant={"outline"}>Mention</Button>
        </div>

        <div className="space-y-4">
          {notifications.map((item) => (
            <Card
              key={item.id}
              className={`mt-5 ${item.read ? "bg-background" : "bg-blue-100"}`}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <Avatar>
                      <AvatarFallback>
                        {item.user
                          .split(" ")
                          .map((i) => i[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="flex items-center text-sm font-medium text-black">
                        {getIcon(item.type)}
                        <span className="ml-2">{item.user}</span>
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        {item.content}
                      </p>
                      <p className="mt-1 text-xs text-gray-400">{item.time}</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant={"ghost"} className="size-8">
                        •••
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => markAsRead(item.id)}>
                        Mark as {item.read ? "unread" : "read"}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => deleteNotification(item.id)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
