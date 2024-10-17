import WriteBlog from "@/components/shared/WriteBlog";
import { GetUser } from "@/constants/actions/user.actions";
import React from "react";

const WriteABlog = async () => {
  const user = await GetUser();
  return <WriteBlog user={user?.user} />;
};

export default WriteABlog;
