import { Router } from "express";
import {
  archiveArticle,
  deleteArticle,
  fetchArticles,
  renameArticle,
  saveArticle,
} from "../../services/saved";

const savedRoutes = Router();

savedRoutes.get("/", async (req, res, next) => {
  const userId = req.userId;
  const page = req.query.page;
  const limit = req.query.limit;
  const tag = req.query.tag;
  // const userId = req.body.userId;

  try {
    const savedArticles = await fetchArticles(
      userId,
      Number(page),
      Number(limit),
      String(tag)
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
    const articleTag = req.body.tag;
    await saveArticle(userId, articleUrl, articleTag);
    res.status(201).json({ articleUrl, articleTag });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

savedRoutes.delete("/", async (req, res, next) => {
  try {
    const userId = req.userId;
    const articleId = req.body.id;

    await deleteArticle(userId, articleId);
    res.status(201).json({ articleId });
  } catch (error) {
    next(error);
  }
});

savedRoutes.patch("/", async (req, res, next) => {
  const userId = req.userId;
  const articleId = req.body.id;
  const articleUrl = req.body.url;

  try {
    await renameArticle(userId, articleId, articleUrl);
    res.status(201).json({ articleUrl });
  } catch (error) {
    next(error);
  }
});

export default savedRoutes;
