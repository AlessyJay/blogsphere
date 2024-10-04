"use server";

import { prisma } from "@/prisma";
import { compare, genSalt, hash } from "bcryptjs";
import {
  SignInSchema,
  SignInType,
  SignUpSchema,
  SignUpType,
} from "../FormSchemas";
import { uuid } from "uuidv4";

const isTokenExpired = new Date(14 * 24 * 60 * 60 * 1000);

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

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        displayName: firstName.toLowerCase() + lastName.toLowerCase(),
        email,
        password: hashed,
        username: firstName.toLowerCase() + lastName.toLowerCase(),
      },
    });

    await prisma.session.create({
      data: {
        id: uuid(),
        expires: isTokenExpired,
        sessionToken: uuid(),
        userId: user.id,
      },
    });

    return user;
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

    const findSession = await prisma.session.findFirst({
      where: {
        userId: {
          equals: exisitngUser.id,
        },
      },
    });

    if (!findSession) {
      await prisma.session.create({
        data: {
          id: uuid(),
          expires: isTokenExpired,
          sessionToken: uuid(),
          userId: exisitngUser.id,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const GetUser = async () => {
  try {
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
