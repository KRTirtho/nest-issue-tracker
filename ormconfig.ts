import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import {
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_PORT,
  DATABASE_USERNAME,
} from "config";

const config: PostgresConnectionOptions = {
  type: "postgres",
  username: DATABASE_USERNAME,
  host: DATABASE_HOST,
  port: DATABASE_PORT,
  database: DATABASE_NAME,
  password: DATABASE_PASSWORD,
  logger: "simple-console",
  logging: ["query"],
  synchronize: true,
};
export default config;
