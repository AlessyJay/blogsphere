"use server";

import { prisma } from "@/prisma";
import { compare, genSalt, hash } from "bcryptjs";
import {
  SignInSchema,
  SignInType,
  SignUpSchema,
  SignUpType,
} from "../FormSchemas";
import { CredentialsSignin } from "next-auth";
import { signIn, signOut } from "@/auth";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const SignUp = async (credentials: SignUpType) => {
  try {
    const { email, firstName, lastName, password } =
      SignUpSchema.parse(credentials);

    const salt = await genSalt(12);
    const hashed = await hash(password, salt);

    const exisitngUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (exisitngUser) throw new Error("This email has been taken!");

    await prisma.user.create({
      data: {
        firstName,
        lastName,
        displayName: firstName.toLowerCase() + lastName.toLowerCase(),
        email,
        password: hashed,
        username: firstName.toLowerCase() + lastName.toLowerCase(),
      },
    });
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

    const pwHash = compare(password, exisitngUser.password);

    if (!pwHash) return { error: "Incorrect username or password!" };

    await signIn("credentials", {
      redirect: false,
      callbackUrl: "/",
      email,
      password,
    });
  } catch (error) {
    const errors = error as CredentialsSignin;
    return errors.cause;
  }
};

export const SignOut = async () => {
  await signOut();
};

export const GetUser = async (req: NextRequest) => {
  try {
    const token = await getToken({ req });

    if (!token) return NextResponse.redirect(new URL("/sign-in", req.url));

    // const user = await prisma.user.findFirst({
    //   where: {
    //     email: {
    //       equals: token.email,
    //     }
    //   }
    // })
  } catch (error) {
    console.log(error);
  }
};
