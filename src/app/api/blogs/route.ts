import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma";

export default async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    const { title, content, estimateTime, authorId } = body;

    const newPost = await prisma.blog.create({
      data: {
        title,
        content,
        estimatedReadTime: estimateTime,
        BlogCategory: {},
        authorId,
      },
    });

    return NextResponse.json(newPost);
  } catch (error) {
    console.log(error);
  }
}
