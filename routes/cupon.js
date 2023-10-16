import { createCupon, deleteCupon, getAllCupons, getCupon, updateCupon } from "../controllers/cuponController.js";
import express from "express"
import { verifyAdmin } from "../utils/verifyToken.js";


const router = express.Router();

//CREATE
router.post("/", verifyAdmin, createCupon )

//UPDATE
router.put("/:id", verifyAdmin, updateCupon)

//DELETE
router.delete("/:id", verifyAdmin, deleteCupon)

//GET
router.get("/:id", getCupon)

//GET ALL
router.get("/", getAllCupons)


export default router;