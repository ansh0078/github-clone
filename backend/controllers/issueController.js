import mongoose from "mongoose";
import { Repository } from "../models/repoModel.js";
import { Issue } from "../models/issueModel.js";
import { User } from "../models/userModel.js";

const createIssue = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid repository ID" });
    }

    const repository = await Repository.findById(id);
    if (!repository) {
      return res.status(404).json({ message: "Repository not found" });
    }

    const issue = new Issue({
      title,
      description,
      repository: id,
    });

    await issue.save();

    repository.issues.push(issue._id);
    await repository.save();

    return res.status(201).json({
      message: "Issue created successfully",
      issue,
    });

  } catch (error) {
    console.error("Error during issue creation:", error.message);
    return res.status(500).send("Server Error!");
  }
};

const updateIssueById = async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Repo ID" });
    }
    
    const issue = await Issue.findById(id);

    if (!issue) {
      return res.status(404).json({ error: "Issue not found" });
    }

    issue.title = title;
    issue.description = description;
    issue.status = status;

    await issue.save();

    return res
      .status(201)
      .json({ message: "Issue updated successfully", issue });
  } catch (error) {
    console.error("Error during repository creation: ", error.message);
    return res.status(500).send("Server Error!");
  }
};

const deleteIssueById = async (req, res) => {
  const id = req.params.id;

  try {
    const issue = await Issue.findByIdAndDelete(id);

    if (!issue) {
      return res.status(404).json({ error: "Issue not found" });
    }

    return res.status(200).json({ message: "Issue deleted successfully" });
  } catch (error) {
    console.error("Error during repository creation: ", error.message);
    return res.status(500).send("Server Error!");
  }
};

const getAllIssues = async (req, res) => {
  try {
    const issue = await Issue.find({});

    return res.status(200).json( issue );
  } catch (error) {
    console.error("Error during repository creation: ", error.message);
    return res.status(500).send("Server Error!");
  }
};

const getAllIssueById = async (req, res) => {
  const id = req.params.id;

  try {
    const issue = await Issue.findById(id);

    if (!issue) {
      return res.status(404).json({ error: "Issue not found" });
    }

    return res
      .status(200)
      .json({ message: "Issue fetch by id successfully", issue });
  } catch (error) {
    console.error("Error during repository creation: ", error.message);
    return res.status(500).send("Server Error!");
  }
};

export {
  createIssue,
  updateIssueById,
  deleteIssueById,
  getAllIssueById,
  getAllIssues,
};
