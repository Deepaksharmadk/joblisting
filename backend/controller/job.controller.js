import Job from "../models/job.model.js";
const createJob = async (req, res) => {
  try {
    const { companyName, logoUrl, title, description } = req.body;
    if (!companyName || !logoUrl || !title || !description) {
      return res.status(400).json({ errorMessage: "bad Request" });
    }
    const jobDetail = new Job({
      companyName,
      logoUrl,
      title,
      description,
      //   refUserId: req.body.userId,
    });
    await jobDetail.save();
    res.json({
      message: "new job created successfully",
    });
  } catch (error) {
    console.log(error);
  }
};
const editJob = async (req, res) => {
  try {
    const { companyName, logoUrl, title, description } = req.body;
    const jobId = req.params.jobId;
    if (!companyName || !logoUrl || !title || !description || !jobId) {
      return res.status(400).json({
        errorMessage: "Bad Request",
      });
    }
    await Job.updateOne(
      { _id: jobId },
      {
        $set: {
          companyName,
          logoUrl,
          title,
          description,
        },
      }
    );
    res.json({ message: "Job details updated successfully" });
  } catch (error) {
    console.log(error);
  }
};
export { createJob, editJob };
