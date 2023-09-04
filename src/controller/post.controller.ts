import { AppDataSource } from "../config/data-source";
import { Request, Response } from "express";
import { Post } from "../entity/post.entity";

const postRepository = AppDataSource.getRepository(Post);
class PostController {
  async create(req: Request, res: Response) {
    try {
      const { title, description, body } = req.body;

      const post = new Post();
      post.Description = description;
      post.Body = body;
      post.Title = title;
      //@ts-ignore
      post.User_id = req.user.id;
      //@ts-ignore
      const newPost = await postRepository.save(post);
      return res.status(201).send({
        success: true,
        data: newPost,
      });
    } catch (err) {
      return res.status(400).send({
        success: false,
        message: err.message,
      });
    }
  }

  async getPostsbyPage(req: Request, res: Response) {
    const page = parseInt(req.query.page as string) || 1; // Default to page 1 if not provided
    const limit = parseInt(req.query.limit as string) || 10; // Default to 10 items per page, adjust as needed

    const skip = (page - 1) * limit;
    try {
      const [posts, total] = await postRepository.findAndCount({
        take: limit,
        skip,
      });

      const totalPages = Math.ceil(total / limit);

      res.status(200).send({
        page,
        limit,
        totalPages,
        totalItems: total,
        data: posts,
      });
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  async getPosts(req: Request, res: Response) {
    const posts = await postRepository.find();
    if (posts.length < 1) {
      return res
        .status(404)
        .send({ success: false, message: "No posts found" });
    }
    return res.status(200).send({
      success: true,
      data: posts,
    });
  }

  async getPostById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const post = await postRepository.findOneBy({ id: id });
    if (!post) {
      return res.status(404).send({
        success: false,
        message: "Post not found",
      });
    }
    return res.status(200).send({
      success: true,
      data: post,
    });
  }

  async deletePost(req: Request, res: Response) {
    const post = await postRepository.findOneBy({
      id: parseInt(req.params.id),
    });
    //@ts-ignore
    if (post.User_id !== req.user.id) {
      return res.status(404).send({
        success: false,
        message: "You cannot delete this post because you did not create it",
      });
    }
    if (!post) {
      return res.status(404).send({
        success: false,
        message: "Post not found",
      });
    }
    const deletePost = await postRepository.remove(post);
    if (!deletePost) {
      return res.status(404).send({
        success: false,
        message: "Error Deleting",
      });
    }
    return res.status(200).send({
      success: true,
      message: `Post with id: ${req.params.id} deleted successfully`,
    });
  }
}

export default new PostController();
