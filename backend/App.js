import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//routes import
// import jobRoute from "./routes/job.route.js";
import userRoute from "./routes/user.route.js";
//
//routes declaration
app.use("/api/v1/user", userRoute);
// http://localhost:8000/api/v1/users/register
// app.use("/api/v1/job", jobRoute);

export { app };
