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
const JobDescription = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    if (!jobId) {
      return res.status(400).json({
        errorMessage: "Bad Request",
      });
    }
    const jobDetails = await Job.findById(jobId);
    res.json({ data: jobDetails });
  } catch (error) {
    console.log(error);
  }
};
const viewAlljobListed = async (req, res) => {
  try {
    // const { title, skills, filterSkills } = req.query;
    const title = req.query.title || "";
    const skills = req.query.skills;
    let filterSkills = skills?.split(",");

    let filter = {};
    if (filterSkills) {
      filter = {
        skills: [...filterSkills],
      };
    }
    const jobList = await Job.findById({
      title: {
        $regex: title,
        $options: "i",
      },
      ...filter,
    });
    res.json({ data: jobList });
  } catch (error) {
    console.log(error);
  }
};
const deleteById = async (req, res) => {
  try {
    const title = req.query.title || "";
    const jobList = await Job.deleteById(jobId);
    res.json({ data: jobList });
  } catch (error) {
    console.log(error);
  }
};
export { createJob, editJob, JobDescription, viewAlljobListed, deleteById };
