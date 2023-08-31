import mongoose from "mongoose";
import "dotenv/config"

export default mongoose.connect(process.env.MONGO_URI, {
  dbName: process.env.DB_NAME,
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
