import User from "../models/user";

export const fetchUser = async (userId: string) => {
  try {
    const user = await User.findOne({ userId });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const verifyUser = async (userId: string) => {
  try {
    const user = await User.findOne({ userId });
    return user != undefined;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
