import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();

app.use(express.json());
dotenv.config({ path: "src/config/.env" });

app.get("/", (req, res) => res.send("Yo"));

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
