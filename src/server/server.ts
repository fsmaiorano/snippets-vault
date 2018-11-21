import express from "express";
import session from "express-session";
import path from "path";
import nunjucks from "nunjucks";
import routes from "./routes/routes";
import database from "../database";
import bodyParser = require("body-parser");

class ServerExpress {
  private app!: express.Application;
  private environment: any = process.env.NODE_ENV;
  private port!: string | number;
  public static readonly PORT: number = 4000;

  constructor() {
    this.createApp();
    this.config();
    this.middlewares();
    this.routes();
    this.listen();
    this.createDBConnection();
    this.initNunjucks();
  }

  private createApp(): void {
    this.app = express();
  }

  private middlewares(): void {
    this.app.use(express.json());
    this.app.use(bodyParser());

    this.app.use(
      session({
        secret: "secret",
        resave: false,
        saveUninitialized: true
      })
    );

    const staticPath =
      this.environment === "production"
        ? path.resolve("app", "public")
        : path.resolve("src", "app", "public");

    this.app.use(express.static(staticPath));
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
    const pathViews =
      this.environment === "production"
        ? path.resolve("app", "views")
        : path.resolve("src", "app", "views");

    nunjucks.configure(pathViews, {
      autoescape: true,
      express: this.app,
      watch: true
    });
    this.app.set("view engine", "njk");
  }

  private createDBConnection(): void {
    database.createConnection();
  }
}

export default new ServerExpress();
