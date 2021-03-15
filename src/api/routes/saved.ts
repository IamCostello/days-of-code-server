import { Router } from "express";
import {
  archiveArticle,
  deleteArticle,
  fetchArticles,
  saveArticle,
} from "../../services/saved";

const savedRoutes = Router();

savedRoutes.get("/", async (req, res, next) => {
  const userId = req.userId;
  const page = req.query.page;
  const limit = req.query.limit;
  // const userId = req.body.userId;

  try {
    const savedArticles = await fetchArticles(
      userId,
      Number(page),
      Number(limit)
    );
    res.send(savedArticles);
  } catch (error) {
    next(error);
  }
});

savedRoutes.post("/", async (req, res, next) => {
  try {
    const userId = req.userId;
    const articleUrl = req.body.url;
    await saveArticle(userId, articleUrl);
    res.status(201).json({ message: "article added", article: articleUrl });
  } catch (error) {
    next(error);
  }
});

savedRoutes.delete("/", async (req, res, next) => {
  try {
    const userId = req.userId;
    const articleId = req.body.id;
    await deleteArticle(userId, articleId);
    res.status(201).json({ message: "Article deleted" });
  } catch (error) {
    next(error);
  }
});

savedRoutes.patch("/", async (req, res, next) => {
  const userId = req.userId;
  const articleId = req.body.id;

  try {
    await archiveArticle(userId, articleId);
    res.status(201).json({ message: "Article archived" });
  } catch (error) {
    next(error);
  }
});

export default savedRoutes;
