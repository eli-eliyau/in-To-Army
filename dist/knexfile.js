"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onUpdateTrigger = void 0;
exports.default = {
    development: {
        client: "pg",
        connection: {
            user: process.env.DB_USER,
            connectionTimeoutMillis: 0,
            password: process.env.DB_PASSWORD,
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            database: process.env.DB_DATABASE,
            connTimeout: 40000,
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
const onUpdateTrigger = (table) => `
    create trigger updatedate before
    update
      on
      ${table} for each row execute function on_update_timestamp();
    `;
exports.onUpdateTrigger = onUpdateTrigger;
