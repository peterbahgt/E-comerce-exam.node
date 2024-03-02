import { roles } from "../../middleWar/auth.js"

const userEndPoint={
    getUser:[roles.User,roles.company_HR],
    getProfile:[roles.company_HR,roles.User],
    update:[roles.User,roles.company_HR],
    delete:[roles.User,roles.company_HR],
    recoveryEmail:[roles.User,roles.company_HR]
}
export default userEndPoint