import { cache } from "react";
import { cookies } from "next/headers";
import { createJwtToken, verifyJwtToken } from "./๋JwtConfig";

export const validateRequest = cache(
  async (): Promise<
    | { user: { id: string; username: string }; session: string }
    | { user: null; session: null }
  > => {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value ?? null;

    if (!token) {
      return {
        user: null,
        session: null,
      };
    }

    // Verify the JWT token
    const decodedToken = verifyJwtToken(token);

    if (!decodedToken || typeof decodedToken === "string") {
      return {
        user: null,
        session: null,
      };
    }

    const currentTime = Math.floor(Date.now() / 1000);
    const tokenExpiryTime = decodedToken.exp;

    if (tokenExpiryTime && tokenExpiryTime - currentTime < 60 * 60 * 24) {
      const newToken = createJwtToken(decodedToken.id);
      cookieStore.set("token", newToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 14, // 14 days
        path: "/",
      });
      return {
        user: { id: decodedToken.id, username: decodedToken.username },
        session: newToken,
      };
    }

    return {
      user: { id: decodedToken.id, username: decodedToken.username },
      session: token,
    };
  },
);
