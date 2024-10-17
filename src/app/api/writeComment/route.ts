import { NextResponse } from "next/server";
import { prisma } from "@/prisma";
import {
  WriteCommentsSchema,
  WriteCommentsType,
} from "@/constants/FormSchemas";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();

    const values: WriteCommentsType = WriteCommentsSchema.parse(body);

    const { content, authorId, blogId } = values;

    const writeComment = await prisma.comment.create({
      data: {
        content,
        userId: authorId,
        blogId,
      },
    });

    return NextResponse.json(
      {
        message: "Comment has been successfully posted ",
        comment: writeComment,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error writing comment: ", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
};

export default POST;
