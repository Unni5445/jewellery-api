import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import asyncHandler from "../utils/asyncHandler";
import createJWTToken from "../utils/createJwtToken";
import ErrorResponse from "../utils/errorResponse";
import ApiResponse from "../utils/ApiResponse";

class AuthController {

  static createUser = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const data = req.body as { email:string,name:string};
      const exitingUser = await User.findOne({email:data.email})
      if(exitingUser){
        return next(new ErrorResponse("Email already exiting",400))
      }
      const newUser = await User.create(data)
      res.status(200).json(new ApiResponse(200,{},"User created successfully"))
    }
  )
  static signinUser = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new ErrorResponse("Please provide email and password", 400));
      }

      const user: any = await User.findOne({ email });
      if (!user) {
        return next(new ErrorResponse("Invalid email", 400));
      }
      const comparePassword = await user.comparePassword(password);
      if (user && !comparePassword) {
        return next(new ErrorResponse("Invalid Password", 400));
      }
      const token = createJWTToken(user._id.toString(), user.role);
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 24 * 60 * 60 * 1000,
      });
      res
        .status(200)
        .json(
          new ApiResponse(
            200,
            {
              token,
              role: user.role,
              name: user.name,
              _id: user._id,
              isFirstLogin: user.isFirstLogin,
            },
            "Login successfully"
          )
        );
    }
  );

  static signOut = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      res.cookie("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        expires: new Date(0),
      });
      res.status(200).json(new ApiResponse(200, {}, "Logout Successfully"));
    }
  );

  static resetPassword = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { _id, role, email, isFirstLogin } = req.user;
      const { newPassword, confirmPassword } = req.body;
      if (newPassword !== confirmPassword) {
        return next(new ErrorResponse("password mismatch", 400));
      }
      const user = await User.findById(_id);
      if (!user) {
        return next(new ErrorResponse("user not found", 404));
      }
      user.password = newPassword;
      user.isFirstLogin = false;
      await user.save();
      res
        .status(200)
        .json(new ApiResponse(200, {}, "Password reset successfully"));
    }
  );

  static getuserByToken = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { _id, role, email,name, isFirstLogin } = req.user;
      res.json(new ApiResponse(200, { _id, role,name, email, isFirstLogin }));
    }
  );
}

export default AuthController;
