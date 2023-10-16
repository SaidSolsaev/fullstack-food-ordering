import mongoose from "mongoose";

const User = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
        unique: true,
    },

    name: {
        type: String,
        required: true,
    },

    lastname: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    isAdmin: {
        type: Boolean,
        default: false,
    }
    
}, {timestamps: true})

export default mongoose.model("User", User);
