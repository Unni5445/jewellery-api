import { NextFunction, Request, Response } from "express";
import Bin from "../models/bin.model";
import Product from "../models/product.model";
import ApiResponse from "../utils/ApiResponse";
import asyncHandler from "../utils/asyncHandler";
import { uploadFileToAzure } from "../utils/uploadFile";
import Category from "../models/category.model";


class ProductController {
  // Create a new product
  static createProduct = asyncHandler(async (req:Request, res:Response, next:NextFunction) => {
    const data = req.body;
    // Ensure files exist
    if (!req.files || req.files.length === 0) {
      res.status(400);
      throw new Error("At least one image is required to create a product.");
    }

    const imageUrls = await Promise.all(
      (req.files as Express.Multer.File[]).map(async (file) => {
        return uploadFileToAzure(file.buffer, file.originalname); 
      })
    );

    const newProduct = await Product.create({ ...data, images: imageUrls });

    res.status(201).json(new ApiResponse(200,{},"Product created successfully"));
  });

  // Get all products
  static getProducts = asyncHandler(async (req:Request, res:Response, next:NextFunction) => {
    const products = await Product.find().populate('category');
    res.status(200).json(new ApiResponse(200,products));
  });

  // Get a single product by ID
  static getProductById = asyncHandler(async (req:Request, res:Response, next:NextFunction) => {
    const { id } = req.params;
    const product = await Product.findById(id).populate('category');

    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    res.status(200).json(new ApiResponse(200,product));
  });

  static getProductByCategory = asyncHandler(async (req:Request, res:Response, next:NextFunction) => {
    const { category } = req.params;
    const product = await Product.findOne({category});

    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    res.status(200).json(new ApiResponse(200,product));
  });

  // Update a product
  static updateProduct = asyncHandler(async (req:Request, res:Response, next:NextFunction) => {
    const { id } = req.params;
    const data = req.body;
    if(req.files){
      const imageUrls = await Promise.all(
        (req.files as Express.Multer.File[]).map(async (file) => {
          return uploadFileToAzure(file.buffer, file.originalname); 
        })
      );
      data.images = imageUrls
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      res.status(404);
      throw new Error("Product not found");
    }

    res.status(200).json(new ApiResponse(200,{},"Product updated successfully"));
  });

  // Delete a product
  static deleteProduct = asyncHandler(async (req:Request, res:Response, next:NextFunction) => {
    const { id } = req.params;
    const deletedProduct = await Product.findById(id)
    if (!deletedProduct) {
        res.status(404);
        throw new Error("Product not found");
    }
    await Bin.create({model:"Product",data:deletedProduct})
    await Product.findByIdAndDelete(id);

    res.status(200).json(new ApiResponse(200,{},"Product deleted successfully" ));
  });

  static createCategory = asyncHandler(async (req:Request, res:Response, next:NextFunction) => {
    const data = req.body;
    await Category.create(data)
    res.status(200).json(new ApiResponse(200,{},"Category added successfully" ));
  });

  static getCategorys = asyncHandler(async (req:Request, res:Response, next:NextFunction) => {
    const categorys = await Category.find()
    res.status(200).json(new ApiResponse(200,categorys));
  });

  static updateCategory = asyncHandler(async (req:Request, res:Response, next:NextFunction) => {
    const { id } = req.params;
    const data = req.body;
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      res.status(404);
      throw new Error("Category not found");
    }

    res.status(200).json(new ApiResponse(200,{},"Category updated successfully"));
  })

  static deleteCategory = asyncHandler(async (req:Request, res:Response, next:NextFunction) => {
    const { id } = req.params;
    const deletedCategory = await Category.findById(id)
    if (!deletedCategory) {
        res.status(404);
        throw new Error("Category not found");
    }
    await Bin.create({model:"Category",data:deletedCategory})
    await Category.findByIdAndDelete(id);

    res.status(200).json(new ApiResponse(200,{},"Category deleted successfully" ));
  });
}

export default ProductController;
