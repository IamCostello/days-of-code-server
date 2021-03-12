import { transporter } from "../app";
import user from "../models/user";

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
    const saved = user.saved.filter((article) => article.archived === false);

    if (saved.length > 0) {
      const article = saved[Math.floor(Math.random() * saved.length)];
      sendMail(user.email, article.url);
      article.archived = true;
      user.save();
    }
  }
};
