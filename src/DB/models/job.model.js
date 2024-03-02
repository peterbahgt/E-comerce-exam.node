import mongoose, { Schema, Types, model } from "mongoose";

const jobSchema = new Schema({
    jobTitle: {
        type: String,
        required: true,
    },
    jobLocation: {
        type: String,
        enum: ['onsite', 'remotely', 'hybrid'],
        default:"onsite"
    },
    workingTime: {
        type: String,
        enum: ['part-time', 'full-time'],
        default:"full-time"
    }, 
    seniorityLevel: {
        type: String,
        enum: ['Junior', 'Mid-Level', 'Senior', 'Team-Lead', 'CTO'],
        default:"Junior"
    },
    jobDescription: {
        type: String
    },
    technicalSkills: {
        type: [String],
    },
    softSkills: {
        type: [String], 
    },
    companyId:{type: Types.ObjectId,
        ref: 'Company',
        required:true},
    addedBy:
        {
            type: Types.ObjectId,
            ref: 'User',
            required:true
        }
},
{
    timestamps: true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
})
jobSchema.virtual("Company",
{
    ref:"Company",
    localField:"_id",
    foreignField:"jobId"
})


const jobModel = model('Job', jobSchema)

export default jobModel