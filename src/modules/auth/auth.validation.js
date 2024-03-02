import joi from 'joi';
import generalFeild from './../../utils/genarelFiled.js';

//signUp
export const signUpSchema = joi.object({
   firstName: joi.string().min(2).max(10).required(),
   lastName: joi.string().min(2).max(10).required(),
   fullName: joi.string().min(2).max(20).required(),
   email: generalFeild.email,
   password: generalFeild.password,
   cPassword: joi.string().valid(joi.ref("password")).required(),
   phone: joi.string().min(11),
   gender: joi.string(),
   DOb:joi.date().max('now').iso()
}).required()
//token
export const tokenSchema = joi.object({
   token: joi.string().required()
}).required()
//login
export const loginSchema = joi.object({
   email: joi.string().email({tlds:{allow:["com","net","pro"]}}),
   phone: joi.string().min(11),
   password: generalFeild.password, 
}).required()
//send code 
export const sendCodeSchema = joi.object({
   email: generalFeild.email
}).required()
//forget password 
export const forgetPasswordSchema = joi.object({
   email: generalFeild.email,
   code: joi.string().pattern(new RegExp(/^[0-9]{5}$/)).required(),
   password: generalFeild.password,
   cPassword: joi.string().valid(joi.ref("password")).required(),
}).required()