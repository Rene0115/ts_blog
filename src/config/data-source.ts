import { DataSource } from "typeorm"
import { User } from "../entity/user.entity"
import { Post } from "../entity/post.entity"

export const AppDataSource = new DataSource({
    type: "postgres",
    url:"postgres://yblwwxaa:16Ok9eQoW4c2eYEdui7z-QwyM1dDp_7q@silly.db.elephantsql.com/yblwwxaa",
    synchronize: true,
    logging: false,
    entities: [User, Post],
    migrations: [],
    subscribers: [],
})
