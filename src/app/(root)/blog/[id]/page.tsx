import GetBlog from "@/components/shared/GetBlog";
import { GetTheBlog } from "@/constants/actions/post.actions";
import React from "react";

const Blog = async ({ params }: { params: { id: string } }) => {
  const result = await GetTheBlog(params.id);

  console.log(result);
  return <GetBlog blog={result} />;
};

export default Blog;
