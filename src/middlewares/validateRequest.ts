import { AnySchema } from "yup";
import { Request, Response, NextFunction } from "express";
import log from "../loggers";

const validate =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      return next();
    } catch (err: unknown) {
      log.error(err);
      res.status(400).send({
        error: "Validation failed",
        message: err,
        status: 400,
      });
    }
  };

export default validate;
