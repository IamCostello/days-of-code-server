import { Router } from "express";
import { addUserTag, fetchUserTags, removeUserTag } from "../../services/user";

const userRoutes = Router();

userRoutes.get("/", async (req, res, next) => {
  const userId = req.userId;

  try {
    const userTags = await fetchUserTags(userId);
    res.send(userTags);
  } catch (error) {
    next(error);
  }
});

userRoutes.post("/", async (req, res, next) => {
  const userId = req.userId;
  const userTag = req.body.tag;

  try {
    await addUserTag(userId, userTag);
    res.send({ userTag });
  } catch (error) {
    next(error);
  }
});

userRoutes.delete("/", async (req, res, next) => {
  const userId = req.userId;
  const userTag = req.body.tag;

  try {
    await removeUserTag(userId, userTag);
    res.send({ userTag });
  } catch (error) {
    next(error);
  }
});

export default userRoutes;
