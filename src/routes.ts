import { Express, Request, Response } from 'express';
import {
  createUserHandler,
  createUserSessionHandler,
} from './controllers/user.controller';
import validateRequest from './middlewares/validateRequest';
import {
  createUserSchema,
  createUserSessionSchema,
} from './schemas/user.schema';

export default function (app: Express) {
  app.get('/healthcheck', (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  // register a user
  app.post('/api/users', validateRequest(createUserSchema), createUserHandler);

  // login a user
  app.post(
    '/api/sessions',
    validateRequest(createUserSessionSchema),
    createUserSessionHandler
  );
  //
  // get the user's sessions
  // GET /api/sessions
  //
  // logout
  // DELETE /api/sessions/:id
}
