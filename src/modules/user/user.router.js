import { Router } from 'express'
import auth from './../../middleWar/auth.js';
import * as userController from './controller/user.controller.js'
import * as userValidation from "./user.validation.js"
import { validation } from '../../middleWar/validation.js';
import userEndPoint from './user.endPoint.js';


const router = Router()

router
    .get
    ('/getUser/:userId',
        validation(userValidation.getUserSchema),
        auth(userEndPoint.create),
        userController.getIdUser)
    .get('/getProfile/',
        validation(userValidation.getProfileSchema),
        auth(userEndPoint.getProfile),
        userController.getProfileUser)
    .patch('/updated/:userId', 
        validation(userValidation.updateSchema),
        auth(userEndPoint.update),
        userController.updateAccount)
    .delete('/:userId',
        validation(userValidation.deleteSchema),
        auth(userEndPoint.delete),
        userController.deleteAccount)
    .patch('/changePassword',
        validation(userValidation.updatedPasswordSchema),
        auth(userEndPoint.update),
        userController.updatePassword)
    .get('/getRecoveryEmail/:recoveryEmail',
        validation(userValidation.recoverySchema),
        auth(userEndPoint.recoveryEmail),
        userController.getAccountsByRecoveryEmail)


export default router