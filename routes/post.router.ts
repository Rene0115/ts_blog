import express from 'express';
import postController from '../src/controller/post.controller';
import authentication from '../src/middleware/auth.middleware';

const postRouter = express.Router();

postRouter.post("/create", authentication, postController.create);
postRouter.get("/", postController.getPostsbyPage);

export default postRouter;