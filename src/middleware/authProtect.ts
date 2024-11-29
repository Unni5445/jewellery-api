import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import ErrorResponse from "../utils/errorResponse";
import asyncHandler from "../utils/asyncHandler";
import User from "../models/user.model";

interface DecodedToken {
  id: string;
  role: "super-admin"|"user";
  iat: number;
  exp: number;
}

declare global {
    namespace Express {
      interface Request {
        user: any; 
      }
    }
}

export const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];

    if (!token) {
      return next(
        new ErrorResponse("Unauthorized Access", 401)
      );
    }
    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_TOKEN_SECRET as string
    ) as DecodedToken;

    const user:any = await User.findById(decoded.id)

    if (!user) {
      return next(new ErrorResponse("No user found with this ID", 404));
    }

    req.user = user;

    next();
  }
);

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user.role !== "super-admin") {
    return next(new ErrorResponse("Access denied", 403));
  }
  next();
};
