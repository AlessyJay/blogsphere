import { NextResponse } from "next/server";
import { prisma } from "@/prisma";
import { validateRequest } from "@/lib/validateRequest";

export const POST = async (req: Request) => {
  try {
    const session = await validateRequest();

    if (!session.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { blogId } = await req.json();

    if (!blogId) {
      return NextResponse.json(
        { message: "Blog ID is required!" },
        { status: 400 },
      );
    }

    const existingLike = await prisma.like.findFirst({
      where: {
        blogId,
        userId: session.user.id,
      },
    });

    if (existingLike) {
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });

      return NextResponse.json({ message: "Unliked" }, { status: 200 });
    } else {
      await prisma.like.create({
        data: {
          blogId,
          userId: session.user.id,
        },
      });

      return NextResponse.json({ message: "Liked" }, { status: 200 });
    }
  } catch (error) {
    console.error("Error liking blog: ", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
};

export const GET = async (req: Request) => {
  try {
    const session = await validateRequest();
    const url = new URL(req.url);
    const blogId = url.searchParams.get("blogId");

    if (!session.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!blogId) {
      return NextResponse.json(
        { message: "Blog ID is required!" },
        { status: 400 },
      );
    }

    const findLike = await prisma.like.findFirst({
      where: {
        blogId,
        userId: session.user.id,
      },
    });

    if (findLike) {
      return NextResponse.json({ liked: true }, { status: 200 });
    } else {
      return NextResponse.json({ liked: false }, { status: 200 });
    }
  } catch (error) {
    console.error("Error liking blog: ", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
};
