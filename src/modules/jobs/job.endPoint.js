import { roles } from "../../middleWar/auth.js"

const jobEndPoint={
    create:[roles.company_HR],
    update:[roles.company_HR],
    delete:[roles.company_HR],
    jobWithCompanyInfo:[roles.company_HR,roles.User],
    getJobsForCompany:[roles.company_HR,roles.User],
    filter:[roles.company_HR,roles.User],
    createApp:[roles.User]
}
export default jobEndPoint