import express from "express";
import session from "express-session";
import path from "path";
import nunjucks from "nunjucks";
import routes from "./routes/routes";
import database from "../database";
import connectFlash from "connect-flash";
import bodyParser = require("body-parser");

const fileStore = require("session-file-store")(session);

class ServerExpress {
  private app!: express.Application;
  private environment: any = process.env.NODE_ENV;
  private port!: string | number;
  public static readonly PORT: number = 4000;

  constructor() {
    this.createApp();
    this.config();
    this.configStatic();
    this.configSession();
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
    this.app.use(connectFlash());
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

  private configStatic(): void {
    const staticPath =
      this.environment === "production"
        ? path.resolve("app", "public")
        : path.resolve("src", "app", "public");

    this.app.use(express.static(staticPath));

    let rootPath = path.dirname(
      require.main.filename || process.mainModule.filename
    );

    this.app.use(
      "/assetsPath",
      express.static(path.join(rootPath, "../dist/app/public"))
    );
    this.app.use("/rootPath", express.static(path.join(rootPath, "../")));
  }

  private configSession(): void {
    this.app.use(
      session({
        name: "root",
        secret: "secret",
        resave: true,
        saveUninitialized: true,
        store: new fileStore({
          path: path.resolve(__dirname, "sessions")
        })
      })
    );
  }
}

export default new ServerExpress();
