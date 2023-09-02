import * as mongoose from "mongoose";

let url = process.env.MONGO_URI ?? "mongo"
let dbname = process.env.DB_NAME ?? "users"
export default mongoose.connect(
  url,
  {
    dbName: dbname,
  }
);
