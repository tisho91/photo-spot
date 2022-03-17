import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import router from "./src/routes";
import { json } from "body-parser";
import path, { join, resolve } from "path";
import { dbConfig } from "./src/config/db.config";
import { corsMiddleware } from "./src/middlewares/cors.middleware";
import { HttpError } from "./src/utils/http-error";

const app = express();
app.use(json());
if (process.env.NODE_ENV !== "production") {
  app.use(corsMiddleware);
}

app.use(express.static(join(__dirname, "../../client/build")));
app.use(router);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../build")));

  app.get("*", (req: any, res: any) => {
    res.sendFile(path.resolve(__dirname, "../build", "index.html"));
  });
}
app.use((error: HttpError, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(error);
  }
  res.status(error.code);
  res.json({
    message: error?.message || error || "An unknown error occurred!",
  });
});
mongoose
  .connect(dbConfig.url)
  .then(() => {
    app.listen(process.env.PORT || 3200);
  })
  .catch((error: Error) => {
    console.log(error);
  });
