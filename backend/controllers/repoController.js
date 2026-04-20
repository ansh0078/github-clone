import mongoose from "mongoose";
import { Repository } from "../models/repoModel.js";
import { Issue } from "../models/issueModel.js";
import { User } from "../models/userModel.js";

const createRepository = async (req, res) => {
  const { owner, name, issues, content, description, visibility } = req.body;
  try {
    if (!name) {
      return res.status(400).json({ error: "Respository name is required!" });
    }

    if (!mongoose.Types.ObjectId.isValid(owner)) {
      return res.status(400).json({ error: "Invalid User Id!" });
    }

    const newRespository = new Repository({
      name,
      description,
      visibility,
      owner,
      content,
      issues,
    });

    const result = await newRespository.save();
    return res
      .status(201)
      .json({ message: "Repository created!", repositoryID: result._id });
  } catch (error) {
    console.error("Error during repository creation: ", error.message);
    return res.status(500).send("Server Error!");
  }
};

const getAllRepositories = async (req, res) => {
  try {
    const repositories = await Repository.find({}).populate("owner issues");

    return res.status(200).json(repositories);
  } catch (error) {
    console.error("Error during fechting repository: ", error.message);
    return res.status(500).send("Server Error!");
  }
};

const fetchRepositoryById = async (req, res) => {
  const repoID = req.params.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(repoID)) {
      return res.status(400).json({ message: "Invalid repository ID" });
    }

    const repository =
      await Repository.findById(repoID).populate("owner issues");

    if (!repository) {
      return res.status(404).json({ message: "Repository not found" });
    }

    return res.status(200).json(repository);
  } catch (error) {
    console.error("Error during fetch by id repository: ", error.message);
    return res.status(500).send("Server Error!");
  }
};

const fetchRepositoryByName = async (req, res) => {
  const repoName = req.params.name;

  try {
    const repository = await Repository.find({ name: repoName }).populate(
      "owner issues",
    );

    if (!repository) {
      return res.status(404).json({ message: "Repository not found" });
    }

    return res.status(200).json(repository);
  } catch (error) {
    console.error("Error during fetch by id repository: ", error.message);
    return res.status(500).send("Server Error!");
  }
};

const fetchRepositoryForCurrentUser = async (req, res) => {
  const userId = req.user;
  try {
    if (!mongoose.Types.ObjectId.isValid(repoID)) {
      return res.status(400).json({ message: "Invalid repository ID" });
    }

    const repositories = await Repository.find({ owner: repoID });

    if (!repositories || repositories.length == 0) {
      return res.status(404).json({ message: "User Repositories not found" });
    }

    return res
      .status(200)
      .json({ message: "User Repository found", repositories });
  } catch (error) {
    console.error("Error during fecthing currnet user repository: ", error.message);
    return res.status(500).send("Server Error!");
  }
};

const updatedRepositoryById = async (req, res) => {
  const { id } = req.params;
  const { content, description } = req.body;

  try {
    const repository = await Repository.findById(id);
    if (!repository) {
      return res.status(404).json({ message: "Repositories not found" });
    }

    repository.content.push(content);
    repository.description.push(description);

    const updatedRepository= await repository.save();

    res.status(200).json({
        message: "Repository updated successfully",
        repository: updatedRepository,
    })
  } catch (error) {
    console.error("Error during updating repository: ", error.message);
    return res.status(500).send("Server Error!");
  }
};

const toggleRepositoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const repository = await Repository.findById(id);
    if (!repository) {
      return res.status(404).json({ message: "Repositories not found" });
    }

    repository.visibility = !repository.visibility;

    const updatedRepository= await repository.save();

    res.status(200).json({
        message: "Repository visibility toggled successfully!",
        repository: updatedRepository,
    })
  } catch (error) {
    console.error("Error during repository creation: ", error.message);
    return res.status(500).send("Server Error!");
  }
};

const deletedRepositoryById = async (req, res) => {
    const id = req.params.id;

  try {
    const result = await Repository.findOneAndDelete( id );

    if(result.deletedCount == 0){
      return res.status(404).json({ message: "Repository not found!" });
    }
    
    return res.json({message: "Repository deleted successfully!"});

  } catch (error) {
    console.error("Error during deleting repository: ", error.message);
    return res.status(500).send("Server Error!");
  }
};

export {
  createRepository,
  getAllRepositories,
  fetchRepositoryById,
  fetchRepositoryByName,
  fetchRepositoryForCurrentUser,
  updatedRepositoryById,
  toggleRepositoryById,
  deletedRepositoryById,
};
