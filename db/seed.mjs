import fs from 'node:fs/promises';
import pg from 'pg';
import nextEnv from '@next/env';

const { loadEnvConfig } = nextEnv;
loadEnvConfig(process.cwd());

const connectionString = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL or DATABASE_URL_UNPOOLED is required. Set it in .env.local before seeding Neon.');
}

const { Client } = pg;
const client = new Client({ connectionString });

try {
  await client.connect();
  const schema = await fs.readFile(new URL('./schema.sql', import.meta.url), 'utf8');
  await client.query(schema);
  console.log('MediTrack PostgreSQL schema and fictional sample data loaded.');
} finally {
  await client.end();
}
