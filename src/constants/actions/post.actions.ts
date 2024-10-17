import { prisma } from "@/prisma";

export const GetAllPosts = async () => {
  try {
    // Get all posts from the blog, including related data
    const posts = await prisma.blog.findMany({
      include: {
        author: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
        likes: {
          select: {
            userId: true,
            likedAt: true,
          },
        },
        BlogCategory: {
          include: {
            category: {
              select: {
                id: true,
                name: true,
                description: true,
              },
            },
          },
        },
        comments: {
          select: {
            id: true,
            content: true,
            userId: true,
            commentedAt: true,
          },
        },
        Bookmark: {
          select: {
            userId: true,
          },
        },
        images: {
          select: {
            id: true,
            url: true,
          },
        },
        shares: {
          select: {
            userId: true,
          },
        },
      },
    });

    return posts;
  } catch (error) {
    console.error("Error retrieving posts:", error);
  }
};

export const GetTheBlog = async (id: string) => {
  try {
    const blog = await prisma.blog.findFirst({
      where: {
        id,
      },
      include: {
        author: true,
        BlogCategory: {
          select: {
            blog: true,
            category: true,
            blogId: true,
            categoryId: true,
          },
        },
        comments: {
          select: {
            blog: true,
            blogId: true,
            commentedAt: true,
            content: true,
            replies: true,
            id: true,
            updatedAt: true,
            user: true,
            userId: true,
          },
        },
      },
    });

    if (!blog) throw new Error("Opps! There is no such blog.");

    return blog;
  } catch (error) {
    console.log(error);
  }
};
