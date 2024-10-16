import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { prisma } from "@/prisma";

const JWT_SECRET = process.env.JWT_SECRET!;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

passport.use(
  new JwtStrategy(opts, async ({ jwtPayload, done }: any) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: jwtPayload.id,
        },
      });

      if (user) return done(null, user);
      else return done(null, false);
    } catch (error) {
      return done(error, false);
    }
  }),
);
