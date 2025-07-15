import express from "express";
import mongoose from "mongoose";
import Product from "../models/product.model.js";
import { createProduct, getProducts, updateProduct, deleteProduct} from "../controllers/product.controller.js";


const router = express.Router();

//POST
router.post("/", createProduct);
//DELETE
router.delete("/:id", deleteProduct);
//CREATE
router.get("/", getProducts);
//PUT
router.put("/:id", updateProduct);

export default router;

