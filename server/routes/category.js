import express from "express"
import { verifyAdmin } from "../utils/verifyToken.js";
import { createCategory, deleteCategory, getAllCategories, getCategory, updateCategory } from "../controllers/categoryController.js";

const router = express.Router();

//CREATE
router.post("/", verifyAdmin, createCategory )

//UPDATE
router.put("/:id", verifyAdmin, updateCategory)

//DELETE
router.delete("/:id", verifyAdmin, deleteCategory)

//GET
router.get("/:id", getCategory)

//GET ALL
router.get("/", getAllCategories)


export default router;