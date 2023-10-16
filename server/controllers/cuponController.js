import mongoose from "mongoose";
import Product from "../models/Product.js";
import { createError } from "../utils/error.js";
import Cupon from "../models/Cupon.js";

export const createCupon = async (req, res, next) => {

    const newCupon = new Cupon(req.body);

    try {
        const savedCupon = await newCupon.save();
        res.status(200).json(savedCupon);
    } catch (error) {
        next(error);
    }
}

export const updateCupon = async(req, res, next) => {
    try {
        const updatedCupon = await Cupon.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
        res.status(200).json(updatedCupon);
    } catch (error) {
        next(error)
    }
}

export const deleteCupon = async (req, res, next) => {
    try {
        await Cupon.findByIdAndDelete(req.params.id);
        res.status(200).json("Cupon deleted");
    } catch (error) {
        next(error);
    }
}

export const getCupon = async (req, res, next) => {
    try {
        const prod = await Cupon.findById(req.params.id);
        res.status(200).json(prod);
    } catch (error) {
        next(error);
    }
}

export const getAllCupons = async (req, res, next) => {
    const {code, ...others} = req.query;
    
    try {
        const Cupons = await Cupon.find({
            ...others,
            name: code,
        });
        
        res.status(200).json(Cupons);
    } catch (error) {
        next(error);
    }
}





