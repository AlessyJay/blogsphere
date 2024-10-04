import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Facebook from "next-auth/providers/facebook";
import Google from "next-auth/providers/google";
import { prisma } from "./prisma";
import { compare } from "bcryptjs";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Facebook({
      clientId: process.env.AUTH_FACEBOOK_ID,
      clientSecret: process.env.AUTH_FACEBOOK_SECRET,
    }),
    Credentials({
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      authorize: async (credentials) => {
        const email = (credentials.email as string) || undefined;
        const password = (credentials.password as string) || undefined;

        if (!email || !password)
          throw new CredentialsSignin(
            "Please, provide both email and password",
          );

        const user = await prisma.user.findFirst({
          where: {
            email: {
              equals: email,
            },
          },
        });

        if (!user)
          throw new CredentialsSignin({ cause: "Invalid email or password!" });

        if (!user.password)
          throw new CredentialsSignin({ cause: "Invalid email or password!" });

        const pwHash = await compare(password, user.password);

        if (!pwHash) throw new Error("Incorrect password!");

        const userData = {
          firstName: user.firstName,
          lastName: user.lastName,
          displayName: user.displayName,
          email: user.email,
          username: user.username,
          password: pwHash,
        };

        return userData;
      },
    }),
  ],

  pages: {
    signIn: "/sign-in",
  },
});
