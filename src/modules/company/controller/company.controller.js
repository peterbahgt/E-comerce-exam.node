
import { asyncHandler } from './../../../utils/asyncHandelar.js';
import companyModel from '../../../DB/models/company.model.js';
import applicationModel from './../../../DB/models/application.model.js';
import jobModel from './../../../DB/models/job.model.js';
import userModel from '../../../DB/models/user.model.js';
import fs from 'fs';
import ExcelJS from 'exceljs';
import moment from 'moment';
//create company
export const creatCompany = asyncHandler(async (req, res, next) => {
    const { companyName } = req.body
    if (await companyModel.findOne({ companyName })) {
        return next(new Error("name aleary exist", { cause: 409 }))
    }
    req.body.companyHR=req.user._id
    const company = await companyModel.create(req.body)
    return res.status(400).json({ message: "done", company: company._id })
})
//update company 
export const updateCompany = asyncHandler(async (req, res, next) => {
    const { companyId } = req.params
    const { companyName, companyEmail } = req.body
    const companyExists = await companyModel.findOne({ _id: companyId })
    if (String(companyExists.companyHR) !== String(req.user._id)) {
        return next(
            new Error("You are not authorized to update this company", { cause: 403 })
        );
    }
    if (await companyModel.findOne({ companyName })||await companyModel.findOne({ companyEmail })) {
        return next(new Error("Name or Email aleary exist", { cause: 500 }))
    }
    const newCompany = await companyModel.findOneAndUpdate({ _id: companyId }, req.body, { new: true })
    return res.json({ message: "done", newCompany })

}

)
//delete company 
export const deleteCompany = asyncHandler(async (req, res, next) => {
    const { companyId } = req.params;
    const companyExists = await companyModel.findOne({ _id: companyId })
    if (String(companyExists.companyHR) !== String(req.user._id)) {
        return next(
            new Error("You are not authorized to delete this company", { cause: 403 })
        );
    }
    const jobsToDelete = await jobModel.find({ companyId: companyId });
    for (const job of jobsToDelete) {
        await jobModel.findByIdAndDelete(job._id);
    }
    const deletedCompany = await companyModel.findByIdAndDelete(companyId);
    if (!deletedCompany) {
        return next(new Error("Company not found", { cause: 404 }));
    }
    return res.json({ message: "Company deleted successfully" });
});
// Get company data 
export const getCompany = asyncHandler(async (req, res, next) => {
    const { companyId } = req.params;
    const company = await companyModel.findOne({ _id: companyId }).populate([
        {
            path: 'Job'
        }
    ]);
    if (String(company.companyHR) !== String(req.user._id)) {
        return next(
            new Error("You are not authorized to veiw this company", { cause: 403 })
        );
    }
    if (!company) {
        return res.status(404).json({ message: 'Company not found' });
    }
    return res.status(200).json({ message: 'Company data found', company });
})
//search company with name 
export const searchCompanyByName = asyncHandler(async (req, res, next) => {
    const { companyName } = req.params;
    const company = await companyModel.findOne({ companyName });
    if (!company) {
        return next(new Error("Company not found", { cause: 404 }))
    }
    return res.status(200).json({ message: 'Company found', company });
});

//getApplicationsForJobs
export const getApplicationsForJobs = asyncHandler(async (req, res, next) => {
    const { jobId } = req.params;
    const job = await jobModel.findById(jobId);
    if (!job) {
        return res.status(404).json({ message: 'Job not found' });
    }
    if (String(job.addedBy) !== String(req.user._id)) {
        return res.status(403).json({ message: 'Unauthorized access' });
    }
    const applications = await applicationModel.find({ jobId });
    const applicationsWithUserData = [];
    for (const application of applications) {
        const user = await userModel.findById(application.userId);
        const { password, ...userData } = user.toObject();
        applicationsWithUserData.push({ application, userData });
    }
    return res.status(200).json({ message: 'Applications found', applications: applicationsWithUserData });
})

//bouns
export const getApplicationsForCompanyOnDay = asyncHandler(
    async (req, res, next) => {
        const { companyId } = req.params;
        const { date } = req.body;
        if (!companyId || !date) {
            return res.status(400).json({ message: 'Company ID and date are required' });
        }

            const jobs = await jobModel.find({ companyId });
            const jobIds = jobs.map(job => job._id);
            const applications = await applicationModel.find({
                jobId: { $in: jobIds },
                createdAt: {
                    $gte: moment(date).startOf('day').toDate(),
                    $lte: moment(date).endOf('day').toDate(),
                },
            }).populate('userId', '-password');
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Applications');
            worksheet.columns = [
                { header: 'Job ID', key: 'jobId', width: 15 },
                { header: 'Applicant ID', key: 'userId', width: 15 },
                { header: 'Applied At', key: 'createdAt', width: 20 },
                { header: 'Resume', key: 'userResume', width: 30 },
            ];
            applications.forEach(application => {
                worksheet.addRow({
                    jobId: application.jobId,
                    userId: application.userId._id,
                    createdAt: application.createdAt,
                    userResume: application.userResume,
                });
            });
            const filePath = `applications_${companyId}_${date}.xlsx`;
            await workbook.xlsx.writeFile(filePath);
            res.download(filePath, err => {
                if (err) {
                    console.error('Error downloading file:', err);
                } else {
                    fs.unlinkSync(filePath);
                }
            });
        
    }
    
)