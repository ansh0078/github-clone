import express from "express";
import {
  createReposittory,
  getAllReposittories,
  fetchReposittoryById,
  fetchReposittoryByName,
  fetchReposittoryForCurrentUser,
  updatedReposittoryById,
  toggleReposittoryById,
  deletedReposittoryById,
} from "../controllers/repoController.js";

const repoRouter = express.Router();

repoRouter.post("/repo/all", createReposittory);
repoRouter.get("/repo/all", getAllReposittories);
repoRouter.get("/repo/:id", fetchReposittoryById);
repoRouter.get("/repo/:name", fetchReposittoryByName);
repoRouter.get("/repo/:userId", fetchReposittoryForCurrentUser);
repoRouter.put("/repo/update/:id", updatedReposittoryById);
repoRouter.delete("/repo/delete/:id", deletedReposittoryById);
repoRouter.patch("/repo/toggle/:id", toggleReposittoryById);

export default repoRouter;
