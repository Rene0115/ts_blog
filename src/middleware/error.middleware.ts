import express from "express";
const errorHandler = (
  err: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  return res.status(500).send({
    success: false,
    message: err.message,
  });
};

export default errorHandler;
