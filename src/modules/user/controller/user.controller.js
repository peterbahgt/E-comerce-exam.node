import userModel from "../../../DB/models/user.model.js"
import { ApiFeatures } from "../../../utils/apiFeatuears.js";
import { asyncHandler } from "../../../utils/asyncHandelar.js"
import bcrypt from 'bcryptjs';

//get Get user account data 
export const getIdUser = asyncHandler(async (req, res, next) => {
    const { userId } = req.params;
    if (!req.user) {
        return next(new Error("User not logged in", { cause: 401 }));
    }
    const userExists = await userModel.findOne({ _id: userId })
    if (String(userExists._id) !== String(req.user._id)) {
        return next(
            new Error("You are not authorized to access this account", { cause: 403 })
        );
    }
    if (!userExists) {
        return next(new Error("User not found", { cause: 404 }));
    }
    return res.status(200).json({ message: "Done", userExists });
});

//Get profile data for another user 
export const getProfileUser = asyncHandler(async (req, res, next) => {
    let userId;
    if (req.query.userId) {
        userId = req.query.userId;
    } else {
        return next(new Error("UserId not provided", { cause: 400 }));
    }
    if (!req.user) {
        return next(new Error("User not logged in", { cause: 401 }));
    }
    const features = new ApiFeatures(userModel.findById(userId), req.query)
        .fields()
        .pagination();
    const user = await features.mangooseQuery;
    if (!user) {
        return next(new Error("User not found", { cause: 404 }));
    }
    
    return res.status(200).json({ message: "Done", user });
});

//update account. 
export const updateAccount = asyncHandler(async (req, res, next) => {
    const { userId } = req.params
    const {  email, phone } = req.body
    const userExists = await userModel.findOne({ _id: userId })
    if (String(userExists._id) !== String(req.user._id)) {
        return next(
            new Error("You are not authorized to updated this account", { cause: 403 })
        );
    }
    if (await userModel.findOne({ email })||await userModel.findOne({ phone })) {
        return next(new Error("email or phone aleary exist", { cause: 500 }))
    }
    const newaccount = await userModel.findByIdAndUpdate({ _id: userId }, req.body, { new: true })
    return res.json({ message: "done", newaccount })
}
)

//delete account
export const deleteAccount = asyncHandler(async (req, res, next) => {
    const { userId } = req.params;
    const userExists = await userModel.findOne({ _id: userId })
    if (String(userExists._id) !== String(req.user._id)) {
        return next(
            new Error("You are not authorized to delete this account", { cause: 403 })
        );
    }
    if (!req.user) {
        return next(new Error("User not logged in", { cause: 401 }));
    }
    if (!userId || !req.user._id) {
        return next(new Error("Invalid request", { cause: 400 }));
    }
    const deletedAccount = await userModel.findByIdAndDelete(userId);
    if (!deletedAccount) {
        return next(new Error("User not found", { cause: 404 }));
    }
    return res.json({ message: "Account deleted successfully" });
});

//update password
export const updatePassword = asyncHandler(async (req, res, next) => {
    const { _id } = req.user
    const { oldPassword, newPassword } = req.body
    const user = await userModel.findOne({ _id })
    if (!user) {
        return next(new Error("user not found", { cause: 404 }))
    }
    const match = bcrypt.compareSync(oldPassword, user.password)
    if (!match) {
        return next(new Error("invalid password", { cause: 400 }))
    }
    const hash = bcrypt.hashSync(newPassword, +process.env.ROUND)
    user.password = hash
    await user.save()
    return res.json({ message: "done" })
}

)

//recovery email 
export const getAccountsByRecoveryEmail = asyncHandler(async (req, res, next) => {
    const { recoveryEmail } = req.params;
    if (!recoveryEmail) {
        return next(new Error("Invalid request", { cause: 400 }));
    }
    const accounts = await userModel.find({ recoveryEmail });
    if (!accounts || accounts.length === 0) {
        return next(new Error("No accounts found with the provided recovery email", { cause: 404 }));
    }
    return res.json({ message: "Accounts retrieved successfully", accounts });
});   
