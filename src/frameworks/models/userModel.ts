import * as mongoose from "mongoose";

const schema = new mongoose.Schema({
  id: String,
  name: String,
  email: String
});

export const UserModel = mongoose.model("User", schema)
