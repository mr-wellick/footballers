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
    return files;
  } catch (err) {
    return err;
  }
};

export const dropTable = async () => {
  const files = await getFileNames();

  for (const file of files) {
    const sql = `DROP TABLE IF EXISTS poc_config.season_${
      file.split('.')[0]
    };`;
    console.log('');
    console.log(chalk.cyan('---- DROPPING TABLE ----'));
    console.log(sql);
    query(sql);
  }
};

export const createTable = async () => {
  const files = await getFileNames();
  for (const file of files) {
    const contents = await readFile(
      path.join(__dirname, `../src/data/${file}`),
      'utf8'
    );
    const parsedData = csvParse(contents);
    let rows = '';

    Object.keys(parsedData[0])
      .filter(item => item !== '')
      .filter(item => item !== 'HT')
      .filter(item => item !== 'WT')
      .forEach(key => {
        if (key === 'RC') {
          rows += `${key} varchar(255)\n`;
        } else {
          rows += `${key} varchar(255),\n`;
        }
      });

    let sql = `CREATE TABLE poc_config.season_${
      file.split('.')[0]
    }(${rows});`;

    console.log('');
    console.log(chalk.cyan('---- CREATING TABLE ----'));
    console.log(sql);
    query(sql);
    console.log('');
  }
};
