import User, { UserSaved } from "../models/user";

export const fetchArticles = async (userId: string) => {
  try {
    const userData = await User.findOne({ userId });

    if (userData) {
      return userData.saved;
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    error.message = "Failed to fetch articles";
    throw error;
  }
};

export const saveArticle = async (userId: string, articleUrl: string) => {
  try {
    const user = await User.findOneAndUpdate(
      { userId },
      {
        $push: { saved: { url: articleUrl } as UserSaved },
      },
      { new: true, useFindAndModify: false }
    );

    return user;
  } catch (error) {
    error.message = "Failed to save article";
    throw error;
  }
};

export const deleteArticle = async (userId: string, articleId: string) => {
  try {
    const user = await User.findOneAndUpdate(
      { userId },
      {
        $pull: { saved: { _id: articleId } },
      }
    );

    return user;
  } catch (error) {
    error.message = "Failed to delete article";
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

    user.save();

    return user;
  } catch (error) {
    error.message = "Failed to archive article";
    throw error;
  }
};
