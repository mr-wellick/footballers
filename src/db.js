import pg from 'pg';

const client = new pg.Client({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DATABASE,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

export default client;
