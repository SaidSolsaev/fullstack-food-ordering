import mongoose from "mongoose";

const Cupon = new mongoose.Schema({
    
    createdAt:{
        type: Date,
        default: new Date(),
    },

    name:{
        type: String,
        required: true,
        unique: true,
        uppercase: true,
    },

    expireDate: {
        type: Date,
        default: new Date().toLocaleDateString()

    },

    discount: {
        type: Number,
        required: true
    },

    isActive: {
        type: Boolean,
        required: true,
        default: false,
    }
})

export default mongoose.model("Cupon", Cupon);
