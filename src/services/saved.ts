import User, { UserSaved } from "../models/user";

export const fetchArticles = async (
  userId: string,
  page: number,
  limit: number
) => {
  try {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const userData = await User.findOne(
      { userId },
      { saved: { $slice: [startIndex, limit] } }
    );

    if (userData) {
      const next = userData.saved.length < limit ? page : page + 1;
      const previous = page > 1 ? page - 1 : page;
      const hasMore = endIndex < userData.days - 1;

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
    const user = await User.findOneAndUpdate(
      { userId },
      {
        $push: { saved: { url: articleUrl, tag: articleTag } as UserSaved },
        $inc: { days: 1 },
      },
      { new: true, useFindAndModify: false }
    );

    return { articleUrl, articleTag };
  } catch (error) {
    error.message = "Failed to save article";
    throw error;
  }
};

export const deleteArticle = async (userId: string, articleId: string) => {
  try {
    console.log(articleId);

    const user = await User.findOneAndUpdate(
      { userId },
      {
        $pull: { saved: { _id: articleId } },
        $inc: { days: -1 },
      }
    );

    console.log(user);

    return articleId;
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
    const user = await User.findOne({ userId });

    if (!user) {
      throw new Error("User not found");
    }

    user.saved.map((article) => {
      if (article._id == articleId) {
        article.url = newUrl;
      }
    });

    await user.save();

    return { url: newUrl };
  } catch (error) {
    error.message = "Failed to archive article";
    throw error;
  }
};

export const archiveArticle = async (userId: string, articleId: string) => {
  try {
    const user = await User.findOne({ userId });

    if (!user) {
      throw new Error("User not found");
    }

    user.saved.map((article) => {
      if (article._id == articleId) {
        article.archived = true;
      }
    });

    console.log(articleId);
    console.log(user.saved);

    await user.save();

    return user;
  } catch (error) {
    error.message = "Failed to archive article";
    throw error;
  }
};
