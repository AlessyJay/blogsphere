import { prisma } from "@/prisma";
import { WriteBlogType, WriteBlogSchema } from "../FormSchemas";

export const GetAllPosts = async () => {
  try {
    // Get all posts from blog
    const posts = await prisma.blog.findMany({
      include: {
        author: true,
        likes: true,
        BlogCategory: true,
        comments: true,
        Bookmark: true,
        images: true,
        shares: true,
      },
    });

    return posts;
  } catch (error) {
    console.log(error);
  }
};

export const WriteTheBlog = async (values: WriteBlogType) => {
  try {
    const { content, title, estimateTime, authorId } =
      WriteBlogSchema.parse(values);

    const blog = await prisma.blog.create({
      data: {
        title,
        content,
        estimatedReadTime: estimateTime,
        BlogCategory: {},
        authorId,
      },
    });

    return blog;
  } catch (error) {
    console.log(error);
  }
};
