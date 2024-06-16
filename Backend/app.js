import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    // origin: "*",
    credentials: true,
  })
);
app.use(
  express.json({
    limit: "16kb",
  })
);
app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);
app.use(express.static("public"));
app.use(cookieParser());

app.get("/api/v1/", (req, res) => {
  res.send("server is ready");
});

// routes import
import userRouter from "./routes/user.routes.js";
import todoRouter from "./routes/todo.routes.js";

app.use("/api/v1/user", userRouter);
app.use("/api/v1/todo", todoRouter);
export { app };
