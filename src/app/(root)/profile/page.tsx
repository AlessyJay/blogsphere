import React from "react";
import UserProfile from "./Profile";
import { GetUserProfile } from "@/constants/actions/user.actions";
import { validateRequest } from "@/lib/validateRequest";

const Profile = async () => {
  const session = await validateRequest();

  if (!session.user?.id) return;

  const user = await GetUserProfile(session.user?.id);

  console.log(user);

  return <UserProfile user={user} session={session} />;
};

export default Profile;
