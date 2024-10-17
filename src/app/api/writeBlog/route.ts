import { NextResponse } from "next/server";
import { prisma } from "@/prisma";
import { WriteBlogSchema, WriteBlogType } from "@/constants/FormSchemas";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const values: WriteBlogType = WriteBlogSchema.parse(body);

    const { content, title, estimateTime, authorId, category } = values;

    let categoryRecord = await prisma.category.findUnique({
      where: {
        name: category,
      },
    });

    if (!categoryRecord) {
      categoryRecord = await prisma.category.create({
        data: {
          name: category,
          creatorId: authorId,
          description: "",
        },
      });
    }

    const blog = await prisma.blog.create({
      data: {
        title,
        content,
        estimatedReadTime: estimateTime,
        BlogCategory: {},
        authorId,
      },
    });

    await prisma.blogCategory.create({
      data: {
        blogId: blog.id,
        categoryId: categoryRecord.id,
      },
    });

    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    console.error("Error writing blog:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
