import { mongoose } from "moongose";

const schema = new mongoose.Schema({
  id: String,
  name: String,
  email: String,
  address: {
    street: String,
    number: Number,
    zipcode: String,
  }
});

export const UserModel = mongoose.model("User", schema)
