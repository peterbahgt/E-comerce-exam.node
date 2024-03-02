import joi from 'joi';
import generalFeild from './../../utils/genarelFiled.js';
//create company
export const createCompanySchema = joi.object({
    companyName: joi.string().required(),
    description: joi.string(),
    industry: joi.string().required(),
    numberOfEmployees: joi.string(),
    companyEmail: generalFeild.email.required(),
    companyHR: generalFeild._id,
    authorization:generalFeild.token
}).required()
//update company
export const updateCompanySchema = joi.object({
    companyId: generalFeild._id,
    companyName: joi.string(),
    description: joi.string(),
    industry: joi.string(),
    numberOfEmployees: joi.string(),
    companyEmail: generalFeild.email,
    authorization:generalFeild.token

}).required()
//delete company
export const deleteSchema = joi.object({
    companyId: generalFeild._id,
    authorization:generalFeild.token

}).required()
//search name of company 
export const searchSchema = joi.object({
    companyName: joi.string(),
    authorization:generalFeild.token

}).required()
//get company data
export const getCompanySchema = joi.object({
    companyId: generalFeild._id,
    authorization:generalFeild.token

}).required()
//get application to sepsific company
export const getApplicationSchema = joi.object({
    jobId:generalFeild._id,
    authorization:generalFeild.token
}).required()
//get information in excell
export const excellSchema = joi.object({
    companyId: generalFeild._id,
    authorization:generalFeild.token,
    date:joi.date().iso().required(),

}).required()