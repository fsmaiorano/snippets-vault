// Models
import User from "app/models/users";
import bcrypt from "bcryptjs";
import { UserService } from "../../database/services";
import { Request, Response } from "express";
import { NextFunction } from "connect";

class AuthController {
  constructor() {}

  async authentication(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const user = await UserService.getByEmail(email);

      if (!user) {
        req.flash("error", "Usuário inexistente");
        return res.redirect("back");
      }

      if (!(await bcrypt.compare(password, user.password))) {
        req.flash("error", "Senha incorreta");
        return res.redirect("back");
      }

      debugger;
    } catch (err) {
      return next(err);
    }
  }
}

export default new AuthController();
