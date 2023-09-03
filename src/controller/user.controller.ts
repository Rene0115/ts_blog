import { AppDataSource } from "../config/data-source";
import e, { NextFunction, Request, Response } from "express";
import { User } from "../entity/user.entity";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import logger from "../app";

const userRepository = AppDataSource.getRepository(User);

class UserController {
  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const { firstName, age } = req.body;

      const password = bcrypt.hashSync(req.body.password, 10);
      const exists = await userRepository.findOneBy({ firstName: firstName });
      if (exists) {
        console.log(exists);
        return res.status(400).send({
          success: false,
          message: `User with first name : ${firstName} already exists`,
        });
      }

      const user = new User();
      user.age = age;
      user.password = password;
      user.firstName = firstName;

      const newUser = await userRepository.save(user);

      return res.status(200).send({
        success: true,
        data: newUser,
      });
    } catch (err: any) {
      logger.error(err);
      return res.status(400).send({
        success: false,
        message: err.message,
      });
    }
  }

  async login(req: Request, res: Response) {
    const { firstName, password } = req.body;
    const user = await userRepository.findOne({ where: { firstName } });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user not found",
      });
    }
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(404).send({
        success: false,
        message: "name or password is invalid",
      });
    }
    const token = jwt.sign(
      { id: user.id, name: user.firstName, age: user.age },
      process.env.TOKEN_SECRET,
      { expiresIn: "24h", algorithm: "HS512" }
    );
    return res.status(200).send({
      success: true,
      data: user,
      token: token,
    });
  }
}

export default new UserController();
