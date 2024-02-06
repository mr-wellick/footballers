import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { promisify } from 'util';
import { csvParse } from 'd3-dsv';
import { fileURLToPath } from 'url';
import client from './db.ts';

const __dirname = fileURLToPath(import.meta.url);

const logger = (message: string, sqlQuery: string) =>
  console.log(message, chalk.cyan(sqlQuery));
const readFile = promisify(fs.readFile);
const readDir = promisify(fs.readdir);

async function getFileNames(): Promise<string[] | unknown> {
  const files = await readDir(path.join(__dirname, '../data'));
  let filteredFiles: string[] = [];

  try {
    filteredFiles = files.filter((file) => file.includes('csv'));
  } catch (err) {
    return err;
  }

  return filteredFiles;
}

export const dropTable = async () => {
  const files = (await getFileNames()) as string[];

  const sqlCommands = files.map(
    (file) => `DROP TABLE IF EXISTS season_${file.split('.')[0]};`,
  );

  try {
    await Promise.all(
      sqlCommands.map(async (command) => {
        logger('DROPPING THE FOLLOWING TABLE: ', command);
        return await client.query(command);
      }),
    );
  } catch (err) {
    console.log('Failed to drop tables.', err);
    return;
  }

  return;
};

export const createTable = async () => {
  const files = (await getFileNames()) as string[];

  try {
    for (const file of files) {
      const contents = await readFile(
        path.join(__dirname, `../data/${file}`),
        'utf8',
      );
      const data = csvParse(contents).columns;
      const rows = data
        .map((row) => `${row} VARCHAR(255)`)
        .join(', ');
      const sql = `CREATE TABLE season_${file.split('.')[0]}(${rows});`;
      logger('CREATING TABLE: ', sql);
      await client.query(sql);
    }
  } catch (err) {
    console.error('Cannot create table', err);
    return;
  }

  return;
};

export const insertIntoTable = async () => {
  const files = (await getFileNames()) as string[];

  try {
    for (const file of files) {
      const contents = await readFile(
        path.join(__dirname, `../data/${file}`),
        'utf8',
      );
      const data = csvParse(contents).columns;
      const rows = data.join(', ');

      data.forEach(async (item) => {
        const values = Object.values(item)
          .map((value) => `'${value}'`)
          .join(', ');
        const sql = `INSERT INTO season_${file.split('.')[0]}(${rows}) VALUES (${values});`;
        logger('INSERTING INTO TABLE: ', sql);
        await client.query(sql);
      });
    }
    return;
  } catch (err) {
    console.log('Cannot insert values into table', err);
    return;
  }
};

export const checkBeforeRunningQueries = async () => {
  const res = await client.query(
    "SELECT table_name FROM information_schema.tables WHERE table_schema='public'",
  );

  try {
    if (res.rows.length > 0) {
      return true;
    }
  } catch (err) {
    console.log(err);
    return false;
  }

  return false;
};
