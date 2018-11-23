import { Request, Response, NextFunction } from "express";

class Middlewares {
  constructor() {}

  public log(req: Request, res: Response, next: NextFunction) {
    console.log(`
        HOST: ${req.headers.host} | URL: ${req.url} | METHOD: ${req.method}
    `);
    return next();
  }

  public isLogged(req: Request, res: Response, next: NextFunction) {
    if (req.session && req.session.user) {
      res.locals.user = req.session.user;
      return next();
    }

    return res.redirect("/");
  }

  public guest(req: Request, res: Response, next: NextFunction) {
    if (req.session && !req.session.user) {
      return next();
    }

    return res.redirect("/app/dashboard");
  }
}

export default new Middlewares();
