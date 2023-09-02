import * as mongoose from "mongoose";

let uri =
  process.env.MONGO_URI ??
  "mongodb://atlas-sql-64ebd7cca1a1b90087c1982a-kyntt.a.query.mongodb.net/ms-users?ssl=true&authSource=admin";

export default mongoose
  .connect(uri, {})
  .then(() => {
    console.log("Mongo connection success");
  })
  .catch((error) => {
    // MongoDB connection error. Please make sure MongoDB is running.
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit the Node.js process with an error code
  });
