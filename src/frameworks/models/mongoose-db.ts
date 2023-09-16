import * as mongoose from "mongoose";

console.log("called mongoose-db");
mongoose.set("debug", true);

let uri = process.env.MONGO_URI;

console.log(uri);

if (!uri) {
  console.log("ERRO: env nao tem uri");
  process.exit(1);
}

mongoose
  .connect(uri)
  .then(() => {
    console.log("Mongo connection success");
    console.log("database name:", mongoose.connection.name);
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });
