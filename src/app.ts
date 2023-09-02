import express from "express";
import middleware from "./middleware/middleware";
import pino from "pino";
import dotenv from "dotenv";
dotenv.config();
const app = express();
middleware(app);

const logger = pino();

const port = process.env.PORT || 4000;

const start = () => {
  app.listen(port, () => {
    logger.info(`Server is listening on ${port}`);
  });
};

start();

