import { Request, Response, NextFunction } from "express";
import { OK } from "../libs/constants";
import { productService } from "../services";

export const createProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

  try {
    const response = await productService.createProduct({
      body: req.body,
      files: req.files,
      user:  req.user
    });

    res.status(OK).json({
      message: "Successfully created user",
      product: response,
    });
  } catch (error: any) {
    console.error("Failed to create user:", error.message);
    next(error);
  }
};

export const listProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

  try {
    const response = await productService.listProduct({
      body: req.body,
      query:req.query,
      user:req.user
    });

    res.status(OK).json({
      message: "Successfully listed  products",
      product: response,
    });
  } catch (error: any) {
    console.error("Failed to  list  products:", error.message);
    next(error);
  }
};

export const listAdminProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

  try {
    const response = await productService.listAdminProduct({
      body: req.body,
      query:req.query,
      user:req.user
    });

    res.status(OK).json({
      message: "Successfully listed  products",
      product: response,
    });
  } catch (error: any) {
    console.error("Failed to  list  products:", error.message);
    next(error);
  }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

  try {
    const response = await productService.deleteProduct({
      body: req.body,
      params:req.params,
      user:req.user
    });

    res.status(OK).json({
      message: "Successfully deleted  product",
      product: response,
    });
  } catch (error: any) {
    console.error("Failed to  deleted  product:", error.message);
    next(error);
  }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

  console.log('✌️req.body --->', req.body);
  try {
    const response = await productService.updateProduct({
      body: req.body,
      params:req.params,
      files: req.files,
      user:req.user
    });

    res.status(OK).json({
      message: "Successfully updated  product",
      product: response,
    });
  } catch (error: any) {
    console.error("Failed to  updated  product:", error.message);
    next(error);
  }
};