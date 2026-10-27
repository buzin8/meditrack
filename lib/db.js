import pg from 'pg';
const g = globalThis;
const { Pool } = pg;
pg.types.setTypeParser(1082, (value) => value);
export const pool = g.__pool ||= new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 3,
});
