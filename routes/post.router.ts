import express from "express";
import postController from "../src/controller/post.controller";
import authentication from "../src/middleware/auth.middleware";

const postRouter = express.Router();

postRouter.post("/create", authentication, postController.create);
postRouter.get("/", postController.getPostsbyPage);
postRouter.get("/all", postController.getPosts);
postRouter.delete("/delete/:id", authentication, postController.deletePost);
postRouter.get("/:id", postController.getPostById);

export default postRouter;
