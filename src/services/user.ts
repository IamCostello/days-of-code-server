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
    });

    await user.save();

    return user;
  } catch (error) {
    error.message = "Failed to create user";
    throw error;
  }
};
