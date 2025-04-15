import { Request, Response, NextFunction } from "express";
import { OK } from "../libs/constants";
import { authService } from "../services";

export const signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  console.log(req.body)
  console.log(req.file)
  try {
    const response = await authService.signUp({
      body: req.body,
      file: req.file,
    });

    res.status(OK).json({
      message: "Successfully created user",
      user: response,
    });
  } catch (error: any) {
    console.error("Failed to create user:", error.message);
    next(error);
  }
};

export const signIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const response = await authService.signIn({
      body: req.body,
    });

    const cookieOptions = {
      secure: true,
      httpOnly: true,
    };

    const { token } = response;

    res
      .cookie("jwt", token, cookieOptions)
      .status(OK)
      .json({ message: "Successfully signed in user", user: response });
  } catch (error: any) {
    console.error("Failed to sign in user:", error.message);
    next(error);
  }
};