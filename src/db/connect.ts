import mongoose from "mongoose";
import config from "config";
import log from "../loggers";

async function connect() {
  const uri = config.get("db") as string;

  return mongoose
    .connect(uri, {
      dbName: "restaurant-manager-api",
    })

    .then((client) => {
      log.info(`Connected to database successfully`);
    })
    .catch((error) => {
      log.error(`❗❗❗  ${error} ❗❗❗`);
      process.exit(1);
    });
}

export default connect;
