import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./api/routes/auth";
import errorResponse from "./api/middleware/errorResponse";
import verifyToken from "./api/middleware/verifyToken";

const app = express();

app.use(express.json());
app.use(cors());
dotenv.config({ path: "src/config/.env" });

app.use("/auth", [verifyToken], authRoutes);

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
