import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectToDb from "./db/db";
import userRoutes from "./routes/user.routes";

connectToDb();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello Urbik");
});

app.use("/users", userRoutes);

export default app;
