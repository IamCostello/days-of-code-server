import { Router } from "express";
import { auth } from "../../config/firebase";
import { createUser, verifyUser } from "../../services/user";

const authRoutes = Router();

authRoutes.get("/", async (req, res, next) => {
  console.log(req.user);
  res.send(req.user != undefined);
});

authRoutes.post("/signup", async (req, res, next) => {
  const userId = req.user.user_id;
  const username = req.user.name;
  const email = req.user.email!;

  try {
    if (!(await verifyUser(userId))) {
      const user = await createUser(userId, username, email);
      res.status(201).json({ message: "New user created", user });
    } else {
      res.status(200).json({ message: "User logged in" });
    }
  } catch (error) {
    next(error);
  }
});

export default authRoutes;
