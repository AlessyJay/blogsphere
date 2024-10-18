"use server";

import { prisma } from "@/prisma";
import {
  SignInSchema,
  SignInType,
  SignUpSchema,
  SignUpType,
} from "../FormSchemas";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { validateRequest } from "@/lib/validateRequest";
import { NextResponse } from "next/server";

const isTokenExpired = new Date(14 * 24 * 60 * 60 * 1000);
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = "14d";

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is not defined");
}

export const SignUp = async (credentials: SignUpType) => {
  try {
    const { email, firstName, lastName, password } =
      SignUpSchema.parse(credentials);

    const exisitngUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (exisitngUser) throw new Error("This email has been taken!");

    const pwHash = await bcryptjs.hash(password, 16);

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        displayName: firstName.toLowerCase() + lastName.toLowerCase(),
        email,
        password: pwHash,
        username: firstName.toLowerCase() + lastName.toLowerCase(),
      },
    });

    const token = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    cookies().set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 14, // 14 days
      path: "/",
    });

    return redirect("/profile");
  } catch (error) {
    console.log(error);
  }
};

export const SignIn = async (credentials: SignInType) => {
  try {
    const { email, password } = SignInSchema.parse(credentials);

    const exisitngUser = await prisma.user.findFirst({
      where: {
        email: {
          equals: email,
        },
      },
    });

    if (!exisitngUser || !exisitngUser.password)
      return { error: "Incorrect username or password!" };

    const pwVerify = await bcryptjs.compare(password, exisitngUser.password);

    if (!pwVerify) return { error: "Incorrect username or password!" };

    const token = jwt.sign({ id: exisitngUser.id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    await prisma.session.create({
      data: {
        expires: isTokenExpired,
        sessionToken: token,
        userId: exisitngUser.id,
      },
    });

    cookies().set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 14, // 14 days
      path: "/",
    });
  } catch (error) {
    console.log(error);
  }
};

export const GetUser = async () => {
  try {
    const userSession = await validateRequest();

    const session = await prisma.session.findFirst({
      where: {
        userId: userSession.user?.id,
      },
      include: {
        user: true,
      },
    });

    if (!session) {
      return { user: null, session: null };
    }

    return session;
  } catch (error) {
    console.log(error);
  }
};

export const GetUserProfile = async (session: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: session,
      },
      include: {
        blogs: {
          select: {
            author: true,
            authorId: true,
            BlogCategory: true,
            Bookmark: true,
            comments: true,
            likes: true,
            shares: true,
            title: true,
            content: true,
            images: true,
            updatedAt: true,
            createdAt: true,
            estimatedReadTime: true,
            id: true,
          },
        },
        Share: true,
        bookmarks: true,
        Comment: true,
        like: true,
        Reply: true,
        followers: true,
        following: true,
      },
    });

    if (!user) {
      return redirect("/sign-in");
    }

    return user;
  } catch (error) {
    console.log(error);
  }
};

export const GetAllBookmarks = async () => {
  try {
    const session = await validateRequest();

    const bookmarks = await prisma.bookmark.findMany({
      where: {
        userId: session.user?.id,
      },
      include: {
        blog: true,
        user: true,
      },
    });

    return bookmarks;
  } catch (error) {
    console.log(error);
  }
};

export const GetAllLikes = async () => {
  try {
    const session = await validateRequest();

    const likes = await prisma.like.findMany({
      where: {
        userId: session.user?.id,
      },
      include: {
        blog: true,
        user: true,
      },
    });

    return likes;
  } catch (error) {
    console.log(error);
  }
};

export const Logout = async () => {
  try {
    const session = await validateRequest();

    if (!session.user?.id) {
      return NextResponse.redirect(new URL("/sign-in"));
    }

    cookies().set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0,
      path: "/",
    });

    // Remove token from database
    await prisma.session.delete({
      where: {
        userId: session.user.id,
      },
    });

    return NextResponse.redirect(new URL("/sign-in"));
  } catch (error) {
    console.log(error);
  }
};
