"use client";

import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertCircle, Bell, User } from "lucide-react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState<string>("account");
  const [userData, setUserData] = useState<any>();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch("/api/profileSettings");

        if (!res.ok) throw new Error("Failed to fetch user data");

        const storedData = await res.json();

        setUserData(storedData.user);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, []);
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto flex-1">
        <h1 className="mb-8 text-3xl font-bold text-black">Profile Settings</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8 grid w-full grid-cols-5">
            <TabsTrigger value="account">
              <User className="mr-2 size-4" />
              Account
            </TabsTrigger>
            <TabsTrigger value="profile">
              <User className="mr-2 size-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="security">
              <User className="mr-2 size-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="mr-2 size-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="danger">
              <AlertCircle className="mr-2 size-4 text-red-500" />
              Danger Zone
            </TabsTrigger>
          </TabsList>

          <TabsContent value="account">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>
                  Update your account details here.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="size-28">
                    <AvatarImage src={userData?.image} />
                    <AvatarFallback>
                      {userData?.firstName[0]}
                      {userData?.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <Button>Change Avatar</Button>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" defaultValue="sophiawrites" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="sophia@example.com"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Public Profile</CardTitle>
                <CardDescription>
                  Manage how your profile appears to others.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input id="displayName" defaultValue="Sophia Chen" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    defaultValue="Tech enthusiast | AI researcher | Avid reader | Coffee lover"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" defaultValue="San Francisco, CA" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    type="url"
                    defaultValue="https://sophiachen.com"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Update Profile</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Manage your account&apos;s security.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="2fa" />
                  <Label htmlFor="2fa">Enable Two-Factor Authentication</Label>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Update Security Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Choose how you want to be notified.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="emailNotifs">Email Notifications</Label>
                  <Switch id="emailNotifs" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="pushNotifs">Push Notifications</Label>
                  <Switch id="pushNotifs" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notifFrequency">Notification Frequency</Label>
                  <Select>
                    <SelectTrigger id="notifFrequency">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realtime">Real-time</SelectItem>
                      <SelectItem value="daily">Daily Digest</SelectItem>
                      <SelectItem value="weekly">Weekly Summary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Notification Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="danger">
            <Card>
              <CardHeader>
                <CardTitle>Danger Zone</CardTitle>
                <CardDescription>
                  Irreversible and destructive actions.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-red-600">
                    Delete Account
                  </h3>
                  <p className="text-sm text-gray-500">
                    Once you delete your account, there is no going back. Please
                    be certain.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deleteConfirm">
                    Type{" "}
                    <span className="font-semibold text-red-600">DELETE</span>{" "}
                    to confirm
                  </Label>
                  <Input id="deleteConfirm" placeholder="Are you sure?" />
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="destructive" disabled={true}>
                  Delete My Account
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
