import { roles } from "../../middleWar/auth.js"

const companyEndPoint={
    create:[roles.company_HR],
    update:[roles.company_HR],
    delete:[roles.company_HR],
    search:[roles.company_HR,roles.User],
    getCompany:[roles.company_HR],
    getApplication:[roles.company_HR]
}
export default companyEndPoint