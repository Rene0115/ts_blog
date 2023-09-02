import cors from "cors";
import morgan from "morgan";
import express from "express";
import errorHandler from "./error.middleware";

const middleware = (app: express.Application) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(errorHandler)
  app.use(morgan("dev"));
  app.use(cors());
};

export default middleware;
