import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword: (password: string) => Promise<boolean>;
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre<IUser>("save", async function (next) {
  const user = this as IUser;
  if (!user.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(Number(config.get("saltRounds")));

  user.password = await bcrypt.hash(user.password, salt);

  return next();
});

userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  const user = this as IUser;
  return await bcrypt.compare(password, user.password);
};

const User = mongoose.model<IUser>("User", userSchema);

export default User;
