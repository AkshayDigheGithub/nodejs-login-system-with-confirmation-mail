import mongoose from 'mongoose';
const { Schema } = mongoose;

export const SIMPLE_USER = 2;
export const ADMIN_USER = 1;
const userSchema = new Schema({
    username: {
        type: String,
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