import { DocumentDefinition, FilterQuery } from "mongoose";
import User, { IUser } from "../models/user.model";
import { omit } from "lodash";

export async function createUser(
  input: DocumentDefinition<IUser>
): Promise<IUser> {
  try {
    return await User.create(input);
  } catch (error) {
    throw error;
  }
}

export async function findUser(query: FilterQuery<IUser>): Promise<IUser> {
  try {
    return await User.findOne(query).lean();
  } catch (error) {
    throw error;
  }
}
