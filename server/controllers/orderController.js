import Order from "../models/Order.js";


export const createOrder = async (req, res, next) => {
    
    try {
        const newOrder = new Order(req.body);
        
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch (error) {
        next(error);
    }
}

//Only admins can change order, make it like that!!
export const updateOrder = async(req, res, next) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
        res.status(200).json(updatedOrder);
    } catch (error) {
        next(error)
    }
}

//Make it like that users can see only they own order
export const getOrder = async (req, res, next) => {

    try {
        const order = await Order.findById(req.params.id);

        res.status(200).json(order);
    } catch (error) {
        next(error);
    }
}

export const userGetOrders = async (req, res, next) => {
    const userId = req.params.userid;

    try {
        const order = await Order.find({user: userId});
        res.status(200).json(order);
    } catch (error) {
        next(error);
    }

}

export const getAllOrders = async (req, res, next) => {
    
    try {    
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        next(error);
    }
}