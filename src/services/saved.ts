import { Types } from "mongoose";
import Saved from "../models/saved";
import User from "../models/user";

export const fetchArticles = async (
  userId: string,
  page: number,
  limit: number,
  tag: string
) => {
  try {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    let userData;
    let nextUserData;

    console.log(tag);

    if (tag === "") {
      userData = await User.findOne({ userId }).populate({
        path: "saved",
        options: {
          limit,
          skip: startIndex,
        },
      });

      nextUserData = await User.findOne({ userId }).populate({
        path: "saved",
        options: {
          limit: 1,
          skip: endIndex,
        },
      });
    } else {
      userData = await User.findOne({ userId }).populate({
        path: "saved",
        match: { tag: tag },
        options: {
          limit,
          skip: startIndex,
        },
      });

      nextUserData = await User.findOne({ userId }).populate({
        path: "saved",
        match: { tag: tag },
        options: {
          limit: 1,
          skip: endIndex,
        },
      });
    }

    console.log(userData?.saved);
    // console.log(nextUserData?.saved);

    if (userData && nextUserData) {
      const next = userData.saved.length < limit ? page : page + 1;
      const previous = page > 1 ? page - 1 : page;
      // const hasMore = endIndex < userData.days - 1;
      const hasMore = nextUserData.saved.length > 0;

      return {
        results: userData.saved,
        next,
        previous,
        hasMore,
        tags: userData.tags,
      };
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    error.message = "Failed to fetch articles";
    throw error;
  }
};

export const saveArticle = async (
  userId: string,
  articleUrl: string,
  articleTag: string
) => {
  try {
    const userSaved = new Saved({
      url: articleUrl,
      tag: articleTag,
      creator: userId,
    });

    console.log(userSaved);

    await userSaved.save();

    await User.findOneAndUpdate(
      { userId },
      {
        $push: { saved: userSaved },
        $inc: { days: 1 },
      },
      { new: true, useFindAndModify: false }
    );

    return userSaved;
  } catch (error) {
    error.message = "Failed to save article";
    throw error;
  }
};

export const deleteArticle = async (userId: string, articleId: string) => {
  try {
    const userSaved = await Saved.findOne({ _id: articleId, creator: userId });

    if (!userSaved) {
      throw new Error("Not authorized");
    }

    await userSaved.delete();

    await User.findOneAndUpdate(
      { userId },
      {
        $pull: { saved: articleId },
        $inc: { days: -1 },
      }
    );

    return userSaved;
  } catch (error) {
    error.message = "Failed to delete article";
    throw error;
  }
};

export const renameArticle = async (
  userId: string,
  articleId: string,
  newUrl: string
) => {
  try {
    const article = await Saved.findOneAndUpdate(
      { _id: articleId, creator: userId },
      { $set: { url: newUrl } }
    );

    return { article };
  } catch (error) {
    error.message = "Failed to rename article";
    throw error;
  }
};

export const archiveArticle = async (userId: string, articleId: string) => {
  try {
    const article = await Saved.findOneAndUpdate({
      _id: articleId,
      creator: userId,
    });

    if (!article) {
      throw new Error("Article not found");
    }

    article.archived = !article.archived;

    await article.save();

    return article;
  } catch (error) {
    error.message = "Failed to archive article";
    throw error;
  }
};
