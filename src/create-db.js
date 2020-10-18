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

  for (const file of files) {
    const contents = await readFile(
      path.join(__dirname, `../src/data/${file}`),
      'utf8'
    );
    const parsedData = csvParse(contents);
    let rows = '';

    Object.keys(parsedData[0])
      .filter(key => key !== 'num')
      .filter(key => key !== '')
      .forEach(key => {
        if (key === 'rc') {
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

export const insertIntoTable = async () => {
  const files = await getFileNames();
  for (const file of files) {
    const contents = await readFile(
      path.join(__dirname, `../src/data/${file}`),
      'utf8'
    );
    const parsedData = csvParse(contents);
    const keys = Object.keys(parsedData[0])
      .filter(key => key !== 'num')
      .filter(key => key !== '');
    let rowNames = '';

    Object.keys(parsedData[0])
      .filter(key => key !== 'num')
      .filter(key => key !== '')
      .forEach(key => {
        if (key === 'rc') {
          rowNames += `${key}`;
        } else {
          rowNames += `${key}, `;
        }
      });

    console.log(chalk.cyan('---- INSER INTO TABLE ----'));
    parsedData.forEach(item => {
      const sql = `INSERT INTO poc_config.season_${
        file.split('.')[0]
      } (${rowNames}) VALUES ('${item[keys[0]]}', '${
        item[keys[1]]
      }', '${item[keys[2]]}', '${item[keys[3]]}', '${
        item[keys[4]]
      }', '${item[keys[5]]}', '${item[keys[6]]}', '${
        item[keys[7]]
      }', '${item[keys[8]]}', '${item[keys[9]]}', '${
        item[keys[10]]
      }', '${item[keys[11]]}', '${item[keys[12]]}', '${
        item[keys[13]]
      }');`;

      console.log(sql);
      query(sql);
    });
  }
};
