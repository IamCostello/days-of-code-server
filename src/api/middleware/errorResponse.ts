import { NextFunction, Request, Response } from "express";

type ErrorWithStatus = Error & {
  statusCode: number;
};

export default (
  error: ErrorWithStatus,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
};
