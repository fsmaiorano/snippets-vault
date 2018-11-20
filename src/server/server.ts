import express, { Request, Response, NextFunction } from "express";
import path from "path";
import nunjucks from "nunjucks";
import routes from "../routes/routes";

class ServerExpress {
  private app!: express.Application;
  private port!: string | number;
  public static readonly PORT: number = 3000;

  constructor() {
    this.createApp();
    this.config();
    this.middlewares();
    this.routes();
    this.listen();
    this.initNunjucks();
  }

  private createApp(): void {
    this.app = express();
  }

  private middlewares(): void {
    this.app.use(express.json());
  }

  private config(): void {
    this.port = process.env.PORT || ServerExpress.PORT;
  }

  private routes(): void {
    this.app.use("/", new routes().router);
  }

  private listen(): void {
    this.app.listen(this.port, () => {
      console.log(`SERVER ONLINE on port: ${this.port}`);
    });
  }

  public startApp(): express.Application {
    return this.app;
  }

  private initNunjucks(): void {
    nunjucks.configure(path.resolve("src", "views"), {
      autoescape: true,
      express: this.app,
      watch: true
    });
    this.app.set("view engine", "njk");
  }
}

export default new ServerExpress();
