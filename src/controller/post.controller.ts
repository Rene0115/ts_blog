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
        data: newPost
      })
    } catch (err) {
      return res.status(400).send({
        success: false,
        message: err.message,
      });
    }
  }

  async getPostsbyPage(req: Request, res: Response) {

    const page = parseInt(req.query.page as string); // Default to page 1 if not provided
    const limit = parseInt(req.query.limit as string) ; // Default to 10 items per page, adjust as needed
  
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
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
  }
}

export default new PostController();
