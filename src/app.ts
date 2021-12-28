import express from "express";
import config from "../config/default";
import log from "./loggers";
import connect from "./db/connect";
import routes from "./routes";

const PORT = config.port as number;
const HOST = config.host as string;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, HOST, () => {
  log.info(`Server running at http://${HOST}:${PORT}/`);

  connect();

  routes(app);
});
