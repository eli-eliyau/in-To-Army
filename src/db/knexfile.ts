import { log } from "console";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

//זה חיבור לדיבי של הפרוד
export default {
  development: {
    client: "pg",
    connection: {
      user: process.env.DB_USER,
      connectionTimeoutMillis: 0,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: 5432,
      database: process.env.DB_DATABASE,
      connTimeout: 40000,
      ssl: { rejectUnauthorized: false },
    },
    migrations: {
      tableName: "knex_migrations",
      directory: __dirname + "/migrations",
    },
    seeds: {
      directory: __dirname + "/seeds",
    },
  },
};
//חיבור לדיבי של הדב
// export default {
//   development: {
//     client: "pg",
//     connection: {
//       user: "postgres",
//       connectionTimeoutMillis: 0,
//       password: "`1qa2ws3ed",
//       host: "dev.tevelhatal.com",
//       port: 5432,
//       database: "oketz-dev",
//       connTimeout: 40000,
//     },
//     migrations: {
//       tableName: "knex_migrations",
//       // directory: __dirname + "/migrations",
//     },
//     // seeds: {
//     //   directory: __dirname + "/seeds",
//     // },
//   },
// };
