import { Router } from 'express'
import * as jobController from "./controller/job.controller.js"
import * as jobValidation from "./job.validation.js"
import jobEndPoint from './job.endPoint.js';
import { validation } from '../../middleWar/validation.js';
import auth from '../../middleWar/auth.js';
import uploadFile, { fileValidation } from '../../utils/cloudnerMulter.js';

const router = Router()
router
.post('/',
          validation(jobValidation.createSchema),
          auth(jobEndPoint.create),
          jobController.creatJob)
.patch('/:jobId',
          validation(jobValidation.updateSchema),
          auth(jobEndPoint.update),
          jobController.updateJob)
 .delete('/:jobId',
          validation(jobValidation.deleteSchema),
          auth(jobEndPoint.delete),
          jobController.deleteJob)
.get('/',
          validation(jobValidation.getAllJobWithCompanySchema),
          auth(jobEndPoint.jobWithCompanyInfo),
          jobController.getJobWithCompanyInfo)
.get('/getJobsForCompany',
          validation(jobValidation.getJobsForCompanySchema),
          auth(jobEndPoint.getJobsForCompany),
          jobController.getJobsForCompany)
.get('/filterJob',
          validation(jobValidation.filterSchema),
          auth(jobEndPoint.filter),
          jobController.getFilteredJobs)
.post('/:jobId',
          uploadFile({ customValidation: fileValidation.pdf }).single('userResume'),
          validation(jobValidation.createAppSchema),
          auth(jobEndPoint.createApp),
          jobController.applyToJob)

   


export default router