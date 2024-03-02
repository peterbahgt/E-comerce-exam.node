import mongoose, { Schema, Types, model } from "mongoose";

const companySchema = new mongoose.Schema({
    companyName: {
      type: String,
      required: [true , 'companyName is required'],
      unique: [true, ' email must be unique'],
      lowercase:true
    },
    description: {
      type: String
    },
    industry: {
      type: String,
      required: [true , 'industry of company is required']
    },
    address: {
      type: String
    },
    numberOfEmployees: {
      type: String
    },
    companyEmail: {
      type: String,
      unique: [true, ' email must be unique'],
      required: [true, 'email is required'],
      lowercase:true
    },
    companyHR: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
},
{
    timestamps: true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
})

companySchema.virtual("Job",
{
    ref:"Job",
    localField:"_id",
    foreignField:"companyId"
})

 const companyModel = mongoose.model('Company', companySchema);

export default companyModel
