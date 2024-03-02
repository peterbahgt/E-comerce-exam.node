import { Router } from 'express'
import * as companyController from "./controller/company.controller.js"
import * as companyValidation from "./company.validation.js"
import companyEndPoint from './company.endPoint.js'
import auth from './../../middleWar/auth.js';
import { validation } from '../../middleWar/validation.js';
const router = Router()

router
     .post('/',
          validation(companyValidation.createCompanySchema),
          auth(companyEndPoint.create),
          companyController.creatCompany)
     .patch("/updated/:companyId",
          validation(companyValidation.updateCompanySchema),
          auth(companyEndPoint.update),
          companyController.updateCompany)
     .delete("/deleted/:companyId",
          validation(companyValidation.deleteSchema),
          auth(companyEndPoint.delete),
          companyController.deleteCompany)
     .get('/search/:companyName',
          validation(companyValidation.searchSchema),
          auth(companyEndPoint.search),
          companyController.searchCompanyByName)
     .get('/:companyId',
          validation(companyValidation.getCompanySchema),
          auth(companyEndPoint.getCompany)
          , companyController.getCompany)
     .get('/applications/:jobId',
          validation(companyValidation.getApplicationSchema),
          auth(companyEndPoint.getApplication)
          ,companyController.getApplicationsForJobs)
     .get('/allAppInExecll/:companyId',
          validation(companyValidation.excellSchema),
          auth(companyEndPoint.create),
          companyController.getApplicationsForCompanyOnDay)

export default router