import { NextFunction, Request, Response } from "express";
import { auth } from "../../config/firebase";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.headers.authtoken) {
      // const { user_id, email, name } = await auth.verifyIdToken(
      //   req.headers.authtoken as string
      // );
      // req.user = { user_id, email, name };
      const { user_id } = await auth.verifyIdToken(
        req.headers.authtoken as string
      );
      req.userId = user_id;
      next();
    } else {
      throw new Error("User not verified");
    }
  } catch (error) {
    error.statusCode = 401;
    next(error);
  }
};
