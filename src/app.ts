import express from "express";
import middleware from "./middleware/middleware";
import pino from "pino";
import "reflect-metadata";
import dotenv from "dotenv";
import { AppDataSource } from "./config/data-source";
dotenv.config();
const app = express();
middleware(app);

const logger = pino();

const port = process.env.PORT || 4000;

const start = async () => {
  try {
    await AppDataSource.initialize();
    logger.info("DataSource initialized");
  } catch (err) {
   return logger.error(err);
  }
  app.listen(port, () => {
    logger.info(`Server is listening on ${port}`);
  });
};

start();

export default logger;
