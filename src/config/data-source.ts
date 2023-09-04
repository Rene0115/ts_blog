import { DataSource } from "typeorm";
import { User } from "../entity/user.entity";
import { Post } from "../entity/post.entity";
import dotenv from "dotenv";

dotenv.config();
export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: true,
  logging: false,
  entities: [User, Post],
  migrations: [],
  subscribers: [],
});
