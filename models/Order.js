import mongoose from "mongoose";


const Order = new mongoose.Schema({
    
    createdAt:{
        type: Date,
        default: new Date(),
    },

    shippingAdress: {
        country: String,
        city: String,
        street: String,
        postalCode: String,
    },

    price:{
        type: Number,
        required: true,
    },

    products: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        quantity: Number,
        ref: "Product"
    }],

    status: {
        type: String,
        enum: ["Order pending", "Order sent", "Order cancelled"],
        default: "Order pending",
    },

    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "User",
    },

    userInfo: {
        name: String,
        email:  String,
        phoneNumber: Number,
    }

})

export default mongoose.model("Order", Order);
