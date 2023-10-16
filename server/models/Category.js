import mongoose from "mongoose";

const Category = new mongoose.Schema({
    
    createdAt:{
        type: Date,
        default: new Date(),
    },

    name:{
        type: String,
        required: true,
        unique: true,
    },

    desc: {
        type: String,
    },

    img: {
        type: String,
    },

    products:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    }],
})

export default mongoose.model("Category", Category);
