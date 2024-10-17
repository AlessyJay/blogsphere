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

    const userId = session.user.id;

    const existingBookmark = await prisma.bookmark.findFirst({
      where: {
        userId,
        blogId,
      },
    });

    if (existingBookmark) {
      await prisma.bookmark.delete({
        where: {
          id: existingBookmark.id,
        },
      });

      return NextResponse.json(
        { message: "Bookmark removed" },
        { status: 200 },
      );
    } else {
      await prisma.bookmark.create({
        data: {
          userId,
          blogId,
        },
      });

      return NextResponse.json({ message: "Bookmark added" }, { status: 200 });
    }
  } catch (error) {
    console.error("Error bookmarking blog: " + error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
};
