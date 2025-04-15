import { Request, Response, NextFunction } from "express";
import { ValidationError } from "sequelize";

import {
  NotFound,
  BadRequest,
  NoContent,
  ForBidden,
  UnAuthorized,
} from "../libs/errors";

import {
  INTERNAL_SERVER_ERROR,
  BAD_REQUEST,
  NOT_FOUND,
  UNAUTHORIZED,
  FORBIDDEN,
  NO_CONTENT,
} from "../libs/constants";

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  switch (true) {
    case error instanceof NotFound:
      res.status(NOT_FOUND).json({ message: error.message });
      break;
    case error instanceof BadRequest:
      res.status(BAD_REQUEST).json({ message: error.message });
      break;
    case error instanceof NoContent:
      res.status(NO_CONTENT).json({ message: error.message });
      break;
    case error instanceof ForBidden:
      res.status(FORBIDDEN).json({ message: error.message });
      break;
    case error instanceof UnAuthorized:
      res.status(UNAUTHORIZED).json({ message: error.message });
      break;
    case error instanceof ValidationError:
      res.status(BAD_REQUEST).json({ error: error.message });
      break;
    default:
      res
        .status(INTERNAL_SERVER_ERROR)
        .json({ message: error.message || "Internal Server Error" });
  }
};
