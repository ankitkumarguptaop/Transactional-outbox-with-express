import { Request, Response, NextFunction } from "express";
import { OK } from "../libs/constants";
import { userService } from "../services";

interface AuthenticatedUser {
  id: string;
  name: string;
  email: string;
  role: string;
  profilePic?: string;
}

interface UpdateUserBody {
  name?: string;
  email?: string;
  password?: string;
  profilePic?: string;
}

type CustomRequest = Request<{}, {}, UpdateUserBody> & { user: AuthenticatedUser };

export const updateUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const response = await userService.updateUser({
      body: req.body,
      user: req.user,
    });

    res.status(OK).json({
      message: "Successfully updated user",
      user: response,
    });
  } catch (error: any) {
    console.error("Failed to update user", error.message);
    next(error);
  }
};

type DeleteUserRequest = Request & { user: AuthenticatedUser };

export const deleteUser = async (
  req: DeleteUserRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const response = await userService.deleteUser({
      user: req.user,
    });

    res.status(OK).json({
      message: "Successfully deleted user",
      user: response,
    });
  } catch (error: any) {
    console.error("Failed to delete user", error.message);
    next(error);
  }
};