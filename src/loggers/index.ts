import logger from "pino";
import config from "../../config/default";

const transport = logger.transport({
  target: "pino-pretty",
  options: {
    colorize: true,
  },
});

const log = logger({ level: "info" }, transport);

export default log;
