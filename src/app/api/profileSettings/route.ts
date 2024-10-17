import { NextResponse } from "next/server";
import { prisma } from "@/prisma";
import { validateRequest } from "@/lib/validateRequest";

export const GET = async () => {
  try {
    const session = await validateRequest();

    const user = await prisma.user.findFirst({
      where: {
        id: session.user?.id,
      },
    });

    if (!user)
      return NextResponse.json(
        { message: "Couldn't retrieved user's information" },
        { status: 500 },
      );

    return NextResponse.json(
      { message: "Information successfuly retrieved!", user },
      { status: 200 },
    );
  } catch (error) {
    console.error("Internal server error: " + error);
  }
};
