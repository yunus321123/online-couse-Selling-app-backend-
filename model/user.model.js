import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new Schema({
    fullName: {
        type: "String",
        required: [true, "Name is required"],
        minLength: [4, 'name must be at least 4 characters'],
        lowercase: true,
        trim: true
    },
    email: {
        type: 'String',
        lowercase: true,
        trim: true,
        required: [true, "email is required"],
        unique: true,
        // regex match:
    },
    password: {
        type: 'String',
        required: [true, "password is required"],
        minLength: [5, "password must be at least 5 characters"],
        select: false
    },
    avatar: {
        public_id: {
            type: 'String'
        },
        secure_url: {
            type: 'String'
        }
    },
    role: {
        type: "String",
        enum: ["USER", 'ADMIN'],
        default: 'USER'
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods = {
    generateJWTToken: async function() {
        return await jwt.sign(
            {
                id: this._id,
                email: this.email,
                role: this.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRY
            }
        );
    },
    comparePassword: async function(plainTextPassword) {
        return await bcrypt.compare(plainTextPassword, this.password);
    }
};

const User = model('User', userSchema);

export default User;
