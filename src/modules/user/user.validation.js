import joi from 'joi';
import generalFeild from './../../utils/genarelFiled.js';

//get user info
export const getUserSchema = joi.object({
   userId: generalFeild._id,
   authorization: generalFeild.token
}).required()
//get profile for anther user 
export const getProfileSchema = joi.object({
   userId: generalFeild._id,
   authorization: generalFeild.token
}).required()
//update user
export const updateSchema = joi.object({
   userId: generalFeild._id,
   firstName: joi.string().min(2).max(10),
   lastName: joi.string().min(2).max(10),
   phone: joi.string().min(11),
   DOB: joi.date().max('now').iso(),
   email: generalFeild.email,
   recoveryEmail: generalFeild.email,
   authorization: generalFeild.token
}).required()
//delete user 
export const deleteSchema = joi.object({
   userId: generalFeild._id,
   authorization: generalFeild.token
}).required()
//update password 
export const updatedPasswordSchema = joi.object({
   oldPassword: generalFeild.password,
   newPassword: generalFeild.password,
   cPassword: joi.string().valid(joi.ref("newPassword")).required(),
   authorization: generalFeild.token
}).required()
//recovery email 
export const recoverySchema = joi.object({
   recoveryEmail: generalFeild.email.required(),
   authorization: generalFeild.token
}).required()