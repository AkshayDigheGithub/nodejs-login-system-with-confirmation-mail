import mongoose from 'mongoose';
const { Schema } = mongoose;
import { devConfig } from "../../../config/env/development.config"

export const SIMPLE_USER = 2;
export const ADMIN_USER = 1;
const userSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profile_pic: {
        type: String,
        default: devConfig.profile_pic
    },
    mobileNo: {
        type: String,
        min: 10,
        max: 10
    },
    active: {
        type: Boolean,
        required: true,
        default: false
    },
    isVerified: {
        type: Boolean,
        required: true,
        default: false
    },
    role: {
        default: 2,
        required: true,
        type: Number
    }
})

export default mongoose.model('User', userSchema);