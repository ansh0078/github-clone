import express from "express";
import {
  createRepository,
  getAllRepositories,
  fetchRepositoryById,
  fetchRepositoryByName,
  fetchRepositoryForCurrentUser,
  updatedRepositoryById,
  toggleRepositoryById,
  deletedRepositoryById,
} from "../controllers/repoController.js";

const repoRouter = express.Router();

repoRouter.post("/repo/create", createRepository);
repoRouter.get("/repo/all", getAllRepositories);
repoRouter.get("/repo/:id", fetchRepositoryById);
repoRouter.get("/repo/name/:name", fetchRepositoryByName);
repoRouter.get("/repo/user/:userId", fetchRepositoryForCurrentUser);
repoRouter.put("/repo/update/:id", updatedRepositoryById);
repoRouter.delete("/repo/delete/:id", deletedRepositoryById);
repoRouter.patch("/repo/toggle/:id", toggleRepositoryById);

export default repoRouter;
