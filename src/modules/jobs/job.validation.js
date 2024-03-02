import joi from 'joi';
import generalFeild from './../../utils/genarelFiled.js';
//create job
export const createSchema = joi.object({
    companyId: generalFeild._id,
    jobTitle: joi.string().max(30).min(3).required(),
    jobLocation: joi.string().valid('onsite', 'remotely', 'hybrid'),
    workingTime: joi.string().valid('part-time', 'full-time'),
    seniorityLevel: joi.string().valid('Junior', 'Mid-Level', 'Senior', 'Team-Lead', 'CTO'),
    jobDescription: joi.string(),
    technicalSkills: joi.array().items(joi.string()),
    softSkills: joi.array().items(joi.string()),
    authorization:generalFeild.token

}).required()
//update job
export const updateSchema = joi.object({
    companyId: generalFeild._id,
    jobId: generalFeild._id,
    jobTitle: joi.string().max(30).min(3),
    jobLocation: joi.string().valid('onsite', 'remotely', 'hybrid'),
    workingTime: joi.string().valid('part-time', 'full-time'),
    seniorityLevel: joi.string().valid('Junior', 'Mid-Level', 'Senior', 'Team-Lead', 'CTO'),
    jobDescription: joi.string(),
    technicalSkills: joi.array().items(joi.string()),
    softSkills: joi.array().items(joi.string()),
    authorization:generalFeild.token
}).required()
//delete job
export const deleteSchema = joi.object({
    companyId: generalFeild._id,
    jobId: generalFeild._id,
    authorization:generalFeild.token
}).required()
//getAllJobWithCompany
export const getAllJobWithCompanySchema = joi.object({
    authorization:generalFeild.token
}).required()
//getJobsForCompany
export const getJobsForCompanySchema = joi.object({
    authorization:generalFeild.token,
    companyName: joi.string().required()
}).required()
//filter jobs
export const filterSchema = joi.object({
    jobTitle: joi.string().max(30).min(3),
    jobLocation: joi.string().valid('onsite', 'remotely', 'hybrid'),
    workingTime: joi.string().valid('part-time', 'full-time'),
    seniorityLevel: joi.string().valid('Junior', 'Mid-Level', 'Senior', 'Team-Lead', 'CTO'),
    technicalSkills: joi.array().items(joi.string()),
    softSkills: joi.array().items(joi.string()),
    authorization:generalFeild.token
}).required()
//create application to this job
export const createAppSchema = joi.object({
    file: generalFeild.file.required(),
    userTechSkills: joi.array().items(joi.string()),
    userSoftSkills: joi.array().items(joi.string()),
    jobId: generalFeild._id,
    userId: generalFeild._id,
    authorization:generalFeild.token

}).required()