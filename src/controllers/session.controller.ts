import { Request, Response } from "express";
import { validatePassword } from "../services/user.service";
import { createSession } from "../services/session.service";

export async function createUserSessionHandler(req: Request, res: Response) {
  // validate the email and password
  const user = await validatePassword(req.body);

  if (!user) {
    return res.status(401).json({
      error: "Invalid email or password",
    });
  }

  // create a sessions
  const session = await createSession(user._id, req.get("user-agent") || "");
  console.log(session);
}
