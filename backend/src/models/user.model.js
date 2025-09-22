import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            minlength: 6
        },
        role: {
            type: String,
            enum: ["citizen", "official", "analyst"],
            default: "citizen"
        },
        phone: {
            type: String,
            required: true,
            unique: true
        },

    },
    {
        timestamps: true
    }
)
export const User = mongoose.model("User", userSchema)