import fs from 'fs';
import { promisify } from 'util';
import { db } from './db.js';
import path from 'path';
import { csvParse } from 'd3-dsv';
import chalk from 'chalk';

const query = promisify(db.query).bind(db);
const readFile = promisify(fs.readFile);
const readDir = promisify(fs.readdir);

const getFileNames = async () => {
  const files = await readDir(path.join(__dirname, '../src/data'));
  try {
    const filteredFiles = files.filter(file => file.includes('csv'));
    return filteredFiles;
  } catch (err) {
    return err;
  }
};

export const dropTable = async () => {
  const files = await getFileNames();
  const sqlCommands = files.map(
    file =>
      `DROP TABLE IF EXISTS poc_config.season_${file.split('.')[0]};`
  );

  try {
    /* eslint-disable-next-line */
    const result = await Promise.all(
      sqlCommands.map(command => query(command))
    );
    console.log(
      chalk.cyan('   DROPPING TABLES THE FOLLOWING TABLES:')
    );
    sqlCommands.forEach(command => console.log(`      ${command}`));
    return;
  } catch (err) {
    console.log('Failed to drop tables.', err);
    return;
  }
};

export const createTable = async () => {
  const files = await getFileNames();

  try {
    for (const file of files) {
      const contents = await readFile(
        path.join(__dirname, `../src/data/${file}`),
        'utf8'
      );
      const parsedData = csvParse(contents);
      const rows = parsedData['columns']
        .map(row => `${row} VARCHAR(255)`)
        .join(', ');
      const sql = `CREATE TABLE poc_config.season_${
        file.split('.')[0]
      }(${rows});`;
      console.log(chalk.cyan('  CREATING TABLE'), '===>', sql);
      query(sql);
    }
  } catch (err) {
    console.error('Cannot create table', err);
    return;
  }
};

export const insertIntoTable = async () => {
  const files = await getFileNames();

  try {
    for (const file of files) {
      const contents = await readFile(
        path.join(__dirname, `../src/data/${file}`),
        'utf8'
      );
      const parsedData = csvParse(contents);
      const rows = parsedData['columns'].join(', ');

      parsedData.forEach(item => {
        const values = Object.values(item)
          .map(value => `'${value}'`)
          .join(', ');
        const sql = `INSERT INTO poc_config.season_${
          file.split('.')[0]
        }(${rows}) VALUES (${values});`;
        console.log(sql);
        query(sql);
      });
    }
    return;
  } catch (err) {
    console.err('Cannot insert values into table', err);
    return;
  }
};
