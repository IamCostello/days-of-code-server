import { Router } from "express";
import { auth } from "../../config/firebase";
import { verifyUser } from "../../services/user";

const authRoutes = Router();

authRoutes.get("/", async (req, res, next) => {
  console.log(req.user);
});

authRoutes.post("/signup", async (req, res, next) => {
  const userId = req.user.user_id;

  try {
    if (!(await verifyUser(userId))) {
      // create new user
    }
  } catch (error) {
    next(error);
  }
});

export default authRoutes;
