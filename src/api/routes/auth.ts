import { Router } from "express";
import { auth } from "../../config/firebase";
import { createUser, verifyUser } from "../../services/user";

const authRoutes = Router();

authRoutes.get("/", async (req, res, next) => {
  res.send(req.userId);
});

authRoutes.post("/signup", async (req, res, next) => {
  try {
    const { user_id, name, email } = await auth.verifyIdToken(
      req.headers.authtoken as string
    );

    console.log(user_id, name, email);

    if (!(await verifyUser(user_id))) {
      const user = await createUser(user_id, name, email!);
      res.status(201).json({ message: "New user created", user });
    } else {
      res.status(200).json({ message: "User logged in" });
    }
  } catch (error) {
    next(error);
  }
});

export default authRoutes;
