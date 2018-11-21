import { Request, Response, NextFunction } from "express";

class Middlewares {
  constructor() {}

  public log(req: Request, res: Response, next: NextFunction) {
    console.log(`
        HOST: ${req.headers.host} | URL: ${req.url} | METHOD: ${req.method}
    `);
    return next();
  }
}

export default new Middlewares();
