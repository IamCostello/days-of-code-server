import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./api/routes/auth";
import errorResponse from "./api/middleware/errorResponse";
import verifyToken from "./api/middleware/verifyToken";
import savedRoutes from "./api/routes/saved";
import cron from "node-cron";
import nodemailer from "nodemailer";
import { mailer, sendMail } from "./services/cronjobs";
import user from "./models/user";

const app = express();

app.use(express.json());
app.use(cors());
dotenv.config({ path: "src/config/.env" });

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

cron.schedule("0 18 * * 0-6", () => mailer());

app.use("/auth", authRoutes);
app.use("/saved", [verifyToken], savedRoutes);

app.use(errorResponse);

mongoose
  .connect(process.env.CLUSTER_URI!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(process.env.PORT || 3000, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    )
  )
  .catch((error) => console.log(error));
