import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userTechSkills: {
    type: [String],
    required: true
  },
  userSoftSkills: {
    type: [String],
    required: true
  },
  userResume: {
    type: Object,
    required: [true, 'userResume is required']
  }
},
  {
    timestamps: true
  });
applicationSchema.virtual("Job", {
  ref: "Job",
  localField: "jobId",
  foreignField: "_id"
});
const applicationModel = mongoose.model('Application', applicationSchema);

export default applicationModel;