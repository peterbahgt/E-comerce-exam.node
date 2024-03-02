import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema({

    firstName: {
        type: String,
        required:[true, 'firstName is required'],
        min:[2, 'minimum length 2 characters'],
        max:[2, 'maximum length 20 characters'],
        lowercase:true
    },   
    lastName: {
        type: String,
        required:[true, 'secondName is required'],
        min:[2, 'minimum length 2 characters'],
        max:[2, 'maximum length 20 characters'],
        lowercase:true
    },
    fullName: {
        type: String,
        required: [true, 'userName is required'],
        lowercase: true    
    },
    email: {
        type: String,
        unique: true,
        unique: [true, ' email must be unique'],
        required: [true, 'email is required'],
        lowercase:true
    },
     recoveryEmail: {
        type: String,
    },
    password: {
        type: String,
        required: [true, 'password is required'],
    },  
    role: {
        type: String,
        enum: ['User', 'Company_HR'],
        default: 'User'

    },
    code: String,
    DOB: {
        type: Date
    },
      phone: {
        type: String,
        unique: true,
        required:true
    },
    gender: {
        type: String,
        enum: ['female', 'male'],
        default: 'male'
    },
    confirmEmail: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ['online', 'offline'],
        default: 'offline'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const userModel = model("User", userSchema)


export default userModel

