import { asyncHandler } from './../../../utils/asyncHandelar.js';
import companyModel from '../../../DB/models/company.model.js';
import applicationModel from './../../../DB/models/application.model.js';
import jobModel from './../../../DB/models/job.model.js';
import { ApiFeatures } from '../../../utils/apiFeatuears.js';
import cloudinary from '../../../utils/cloudinary.js';
//create job
export const creatJob = asyncHandler(async (req, res, next) => {
    const { companyId } = req.body;
    if (!await companyModel.findById(companyId)) {
        return next(new Error("company Not Found", { cause: 404 }))
    }
    req.body.addedBy = req.user._id
    const newJob = await jobModel.create(req.body);
    return res.status(201).json({ message: "Done", job: newJob });
})
//update company 
export const updateJob = asyncHandler(async (req, res, next) => {
    const { jobId } = req.params
    const { companyId } = req.body
    if (! await companyModel.findById(companyId)) {
        return next(new Error("company Not Found", { cause: 404 }))
    }
    const newJob = await jobModel.findByIdAndUpdate({ _id: jobId }, req.body, { new: true })
    return res.json({ message: "done", newJob })
}
)
//delete company 
export const deleteJob = asyncHandler(async (req, res, next) => {
    const { jobId } = req.params
    const { companyId } = req.body
    if (! await companyModel.findById(companyId)) {
        return next(new Error("company Not Found", { cause: 404 }))
    }
    const deletedCompany = await jobModel.findByIdAndDelete(jobId);
    if (!deletedCompany) {
        return next(new Error("User not found", { cause: 404 }));
    }
    return res.json({ message: "job deleted successfully" });
});
// get all jobs with company information
export const getJobWithCompanyInfo = asyncHandler(async (req, res, next) => {
    const jobs = await jobModel.find().populate("companyId");
    return res.status(200).json({ message: 'alljobs', jobs });
})
//get all jobs for spicfic company 
export const getJobsForCompany = asyncHandler(async (req, res, next) => {
    const { companyName } = req.query;
    const company = await companyModel.findOne({ companyName: companyName });
    if (!company) {
        return next(new Error("Company not found", { cause: 404 }));
    }
    const jobs = await jobModel.find({ companyId: company._id });

    return res.status(200).json({ message: 'Jobs for company retrieved successfully', jobs });

});
//filter jobs 
export const getFilteredJobs = asyncHandler(async (req, res, next) => {
    const { workingTime, jobLocation, seniorityLevel, jobTitle, technicalSkills } = req.query;
    const apiFeatures = new ApiFeatures(jobModel.find(), req.query)
        .filter()
        .sort()
        .pagination()
        .search();
    const query = apiFeatures.mangooseQuery;
    const jobs = await query;
    return res.status(200).json({ message: 'Filtered jobs', jobs });
});
//apply to job 
export const applyToJob = asyncHandler(async (req, res, next) => {
    const { jobId } = req.params;
    const foundJob = await jobModel.findOne({_id:jobId})
    if (!foundJob) {
        return next(new Error("job Not Found", { cause: 404 }))
    }
    const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, { folder: `${process.env.APP_NAME}/Application` })
    if (!secure_url) {
        return res.status(409).json({ message: "error happen" })
    }
    req.body.userResume = { public_id, secure_url }
    req.body.jobId = jobId;
    req.body.userId = req.user._id
    const application = await applicationModel.create(req.body)
    return res.status(201).json({ message: "done", application });
});

