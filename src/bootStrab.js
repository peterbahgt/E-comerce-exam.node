import { connection } from "./DB/connection.js"
import userRouter from "./modules/user/user.router.js"
import companyRouter from "./modules/company/company.router.js"
import jobRouter from "./modules/jobs/job.router.js"
import authRouter from "./modules/auth/auth.router.js"
import { globalError } from "./utils/asyncHandelar.js"
const bootstrap=(app,express)=>{
    app.use(express.json())
    app.use("/uploads",express.static("uploads"))
    app.use("/user",userRouter)
    app.use("/company",companyRouter)
    app.use("/job",jobRouter)
    app.use("/auth",authRouter )
    connection()
    app.use(globalError)
}

export default bootstrap