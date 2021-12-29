import { LeanDocument, FilterQuery, UpdateQuery } from "mongoose";
import config from "config";
import { get } from "lodash";
import { IUser } from '../models/user.model'
import Session, { ISession } from '../models/session.model'
import { sign, decode } from "../utils/jwt.utils";
import { findUser } from "./user.service";

export async function createSession(
  userID: string,
  userAgent: string,
): Promise<string> {
  const session = await Session.create({
    user: userID,
    userAgent,
  });

  return session.toJSON();
}

export function createAccessToken(
  user,
  session,
): string {
    user:
        | Omit<IUser, "password">
        | LeanDocument<Omit<IUser, "password">>
    session:
        | Omit<ISession, "password">
        | LeanDocument<Omit<ISession, "password">>
  });

}
