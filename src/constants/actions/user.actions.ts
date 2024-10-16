"use server";

import { prisma } from "@/prisma";
import {
  SignInSchema,
  SignInType,
  SignUpSchema,
  SignUpType,
} from "../FormSchemas";
import { uuid } from "uuidv4";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { validateRequest } from "@/lib/validateRequest";

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

    await prisma.session.upsert({
      where: {
        userId: exisitngUser.id,
      },
      update: {
        expires: isTokenExpired,
        sessionToken: token,
      },
      create: {
        id: uuid(),
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

    return redirect("/");
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
      throw new Error("No session found for this user.");
    }

    return session;
  } catch (error) {
    console.log(error);
  }
};
