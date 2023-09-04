import { knex } from "knex";
import knexfile from "./knexfile";

export const dbConnect = knex(knexfile.development);
