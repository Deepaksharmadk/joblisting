import mongoose from "mongoose";
const jobSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      require: true,
    },
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    logoUrl: {
      type: String,
      require: true,
    },
    refUserid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
const Job = mongoose.model("Job", jobSchema);
export default Job;
