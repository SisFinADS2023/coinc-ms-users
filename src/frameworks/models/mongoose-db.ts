import * as mongoose from "mongoose";

console.log("called mongoose-db");
mongoose.set("debug", true);

let uri = process.env.MONGO_URI;

if (!uri) {
  console.log("ERRRO: env nao tem uri");
  process.exit(1);
}

mongoose
  .connect(uri)
  .then(() => {
    console.log("Mongo connection success");
    console.log("database name:", mongoose.connection.name);
  })
  .catch((error) => {
    // MongoDB connection error. Please make sure MongoDB is running.
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit the Node.js process with an error code
  });
