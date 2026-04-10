import { config } from "dotenv";
config();
import express from "express";
import cors from "cors";
import { dbConnect } from "./lib/dbConnect";
import { compilerRouter } from "./routes/compilerRouter";
import { userRouter } from "./routes/userRouter";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: function (origin, callback) {
      if (
        !origin || // allow tools like Postman
        origin.includes("vercel.app") || // allow ALL Vercel deployments
        origin === "http://localhost:5173"
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);
app.get("/", (req, res) => {
  return res.status(200).send({ message: "TriCode Compiler API is running!" });
});

app.use("/compiler", compilerRouter);
app.use("/user", userRouter);

dbConnect();
const PORT = process.env.PORT || 4008;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Client URL: ${process.env.CLIENT_URL}`);
});
