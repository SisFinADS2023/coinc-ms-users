import { config } from "dotenv";
import * as path  from "path";

const dotenvPath = path.join(__dirname, '../', `config/.env.${process.env.NODE_ENV}`);
config({
  path: dotenvPath,
});
