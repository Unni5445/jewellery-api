import { NextFunction, Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import Enquiry from "../models/enquiry.model";
import ApiResponse from "../utils/ApiResponse";
import Bin from "../models/bin.model";

class EnquiryrController {
    static createCustomer = asyncHandler(
        async(req:Request,res:Response,next:NextFunction)=>{
            const data = req.body;
            await Enquiry.create(data)
            res.status(200).json(new ApiResponse(200,{},"Enquiry added successfully "))
        }
    )

    static getEnquirys = asyncHandler(
        async(req:Request,res:Response,next:NextFunction)=>{
            const enquirys = await Enquiry.find()
            res.status(200).json(new ApiResponse(200,enquirys))
        }
    )

    static getEnquiry = asyncHandler(
        async(req:Request,res:Response,next:NextFunction)=>{
            const {id} = req.params
            const enquiry = await Enquiry.findById(id)
            res.status(200).json(new ApiResponse(200,enquiry))
        }
    )

    static updateEnquiry = asyncHandler(
        async(req:Request,res:Response,next:NextFunction)=>{
            const {id} = req.params;
            const data = req.body;
            const enquiry = await Enquiry.findByIdAndUpdate(id,data)
            res.status(200).json(new ApiResponse(200,{},"Enquiry updated successfully"))
        }
    )

    static deleteEnquiry = asyncHandler(
        async(req:Request,res:Response,next:NextFunction)=>{
            const {id} = req.params;
            const enquiry = await Enquiry.findById(id)
            await Bin.create({model:"Enquiry",data:enquiry})
            await Enquiry.findByIdAndDelete(id)
            res.status(200).json(new ApiResponse(200,{},"Enquiry deleted successfully"))
        }
    )
}

export default EnquiryrController