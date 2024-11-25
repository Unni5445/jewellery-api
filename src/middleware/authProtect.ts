import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import ErrorResponse from "../utils/errorResponse";
import asyncHandler from "../utils/asyncHandler";

interface DecodedToken {
  id: string;
  role: "super-admin"|"auditor";
  iat: number;
  exp: number;
}

declare global {
    namespace Express {
      interface Request {
        auditor: any; 
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

    const auditor:any = ""

    if (!auditor) {
      return next(new ErrorResponse("No auditor found with this ID", 404));
    }

    req.auditor = auditor;

    next();
  }
);

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.auditor.role !== "super-admin") {
    return next(new ErrorResponse("Access denied", 403));
  }
  next();
};
