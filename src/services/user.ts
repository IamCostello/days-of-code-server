import User from "../models/user";

export const fetchUser = async (userId: string) => {
  try {
    const user = await User.findOne({ userId });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    error.message = "Failed to fetch user";
    throw error;
  }
};

export const verifyUser = async (userId: string) => {
  try {
    const user = await User.findOne({ userId });
    console.log("verify: ", user?.userId);
    return user != undefined;
  } catch (error) {
    error.message = "Failed to verify user";
    throw error;
  }
};

export const createUser = async (
  userId: string,
  username: string,
  email: string
) => {
  try {
    const user = new User({
      userId,
      username,
      email,
      saved: [],
    });

    await user.save();

    return user;
  } catch (error) {
    error.message = "Failed to create user";
    throw error;
  }
};

export const fetchUserTags = async (userId: string) => {
  try {
    const userData = await User.findOne({ userId });

    if (!userData) {
      throw new Error("User not found");
    }

    return userData.tags;
  } catch (error) {
    throw error;
  }
};

export const addUserTag = async (userId: string, userTag: string) => {
  try {
    await User.findOneAndUpdate(
      { userId },
      {
        $push: { tags: userTag },
      }
    );
    return userTag;
  } catch (error) {
    throw error;
  }
};

export const removeUserTag = async (userId: string, userTag: string) => {
  try {
    await User.findOneAndUpdate(
      { userId },
      {
        $pull: {
          tags: userTag,
        },
      }
    );
    return userTag;
  } catch (error) {
    throw error;
  }
};
