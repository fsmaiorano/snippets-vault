// Models
import User from "../models/user";
import bcrypt from "bcryptjs";
import { UserService } from "../../database/services";
import { Request, Response } from "express";
import { NextFunction } from "connect";

class AuthController {
  constructor() {}

  async signin(req: Request, res: Response, next: NextFunction) {
    return res.render("auth/signin");
  }

  async signup(req: Request, res: Response, next: NextFunction) {
    return res.render("auth/signup");
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = req.body;
      const user = await UserService.getByEmail(email);

      if (user) {
        // usuário já existe
        return res.redirect("back");
      }

      const newPassword = await bcrypt.hash(password, 5);

      let newUser = new User();
      newUser = {
        name: name,
        password: newPassword,
        email: email,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const createdUser = await UserService.create(newUser);

      req.session.user = createdUser;
      req.session.save(e => {
        return res.redirect("/app/dashboard");
      });
    } catch (err) {
      return next(err);
    }
  }

  async authentication(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const user = await UserService.getByEmail(email);

      if (!user) {
        return res.redirect("back");
      }

      if (!(await bcrypt.compare(password, user.password))) {
        return res.redirect("back");
      }

      req.session.user = user;
      req.session.save(e => {
        return res.redirect("/app/dashboard");
      });
    } catch (err) {
      return next(err);
    }
  }
}

export default new AuthController();
