import mongoose from "mongoose";
import Category from "../models/Category.js"
import Product from "../models/Product.js";
import { createError } from "../utils/error.js";

export const createCategory = async (req, res, next) => {

    const newCategory = new Category(req.body);

    try {
        const savedCategory = await newCategory.save();
        res.status(200).json(savedCategory);
    } catch (error) {
        next(error);
    }
}

export const updateCategory = async(req, res, next) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
        res.status(200).json(updatedCategory);
    } catch (error) {
        next(error)
    }
}

export const deleteCategory = async (req, res, next) => {
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.status(200).json("Category deleted");
    } catch (error) {
        next(error);
    }
}

export const getCategory = async (req, res, next) => {
    try {
        const prod = await Category.findById(req.params.id);
        res.status(200).json(prod);
    } catch (error) {
        next(error);
    }
}

export const getAllCategories = async (req, res, next) => {
    let lim = req.query.limit;


    try {
        var Categorys;
        lim = parseInt(lim);
        if (lim){

            Categorys = await Category.find().limit(lim);
        } else{
            Categorys = await Category.find();
        }
        res.status(200).json(Categorys);
    } catch (error) {
        next(error);
    }
}



