import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { userRepository } from "../repositories";
import { UnAuthorized } from "../libs/errors";

declare global {
  namespace Express {
    interface Request {
      user?: any; 
    }
  }
}

export const jwtTokenValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies?.jwt;

    if (!token) {
      throw new UnAuthorized("No Token");
    }

    const authenticatedUser = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    const user = await userRepository.findOne({ id: authenticatedUser.id });

    if (!user) {
      throw new UnAuthorized("Invalid Token");
    }

    req.user = user;

    console.log("Successfully authenticated");
    next();
  } catch (error) {
    return next(error);
  }
};
