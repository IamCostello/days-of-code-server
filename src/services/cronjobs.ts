import { transporter } from "../app";
import user from "../models/user";
import { deleteArticle } from "./saved";

export const sendMail = (userEmail: string, articleUrl: string) => {
  transporter.sendMail(
    {
      from: "asaeis045@gmail.com",
      to: userEmail,
      subject: "Days of code - your new article",
      text: articleUrl,
    },
    (error: any, info: any) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    }
  );
};

export const mailer = async () => {
  const cursor = user.find().cursor();
  for (
    let user = await cursor.next();
    user != null;
    user = await cursor.next()
  ) {
    await user
      .populate({
        path: "saved",
        options: { limit: 1, skip: Math.floor(Math.random() * user.days) },
      })
      .execPopulate();

    if (user.saved.length > 0 && user.active) {
      const article = user.saved[0];
      sendMail(user.email, article.url);

      console.log("Sending email to: ", user.email);
      await deleteArticle(user.userId, article.id);

      user.save();
    }
  }
};
