import express from "express";
import ProductController from "../controller/product.controller";
import upload from "../middleware/upload";

const router = express.Router();

router
  .route("/product")
  .post(upload.array('images'),ProductController.createProduct)
  .get(ProductController.getProducts);
router
  .route("/product/:id")
  .get(ProductController.getProductById)
  .put(upload.array('images'),ProductController.updateProduct)
  .delete(ProductController.deleteProduct);
router
  .route("/category")
  .post(ProductController.createCategory)
  .get(ProductController.getCategorys);
router
  .route("/category/:id")
  .delete(ProductController.deleteCategory); 

export default router;
