import { createClient } from '@libsql/client';
import path from 'path';

// Use Turso cloud DB if configured, otherwise fall back to local file for dev
const url = process.env.TURSO_DATABASE_URL || `file:${path.resolve(process.cwd(), 'quick-commerce.db')}`;
const authToken = process.env.TURSO_AUTH_TOKEN;

const db = createClient({
  url,
  authToken,
});

export default db;
