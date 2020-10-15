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

function isValid(str) {
  return !/[~`!#$%^&*+=\-[\]\\';,/{}|\\":<>?]/g.test(str);
}

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

export const insertIntoTable = async () => {
  const files = await getFileNames();
  for (const file of files) {
    const contents = await readFile(
      path.join(__dirname, `../src/data/${file}`),
      'utf8'
    );
    const parsedData = csvParse(contents);
    const keys = Object.keys(parsedData[0])
      .filter(item => item !== '')
      .filter(item => item !== 'WT')
      .filter(item => item !== 'HT');
    let rowNames = '';

    Object.keys(parsedData[0])
      .filter(item => item !== '')
      .filter(item => item !== 'HT')
      .filter(item => item !== 'WT')
      .forEach(key => {
        if (key === 'RC') {
          rowNames += `${key}`;
        } else {
          rowNames += `${key}, `;
        }
      });
    console.log('');
    console.log(chalk.cyan('---- INSER INTO TABLE ----'));
    parsedData.forEach(item => {
      const NAME = isValid(item[keys[0]])
        ? item[keys[0]].replace(/[0-9]/g, '')
        : item[keys[0]]
            .replace(/[^a-zA-Z ]/g, '')
            .replace(/[0-9]/g, '');

      const sql = `INSERT INTO poc_config.season_${
        file.split('.')[0]
      } (${rowNames}) VALUES ('${NAME}', '${item[keys[1]]}', '${
        item[keys[2]]
      }', '${item[keys[3]]}', '${item[keys[4]]}', '${
        item[keys[5]]
      }', '${item[keys[6]]}', '${item[keys[7]]}', '${
        item[keys[8]]
      }', '${item[keys[9]]}', '${item[keys[10]]}', '${
        item[keys[11]]
      }', '${item[keys[12]]}', '${item[keys[13]]}');`;

      console.log(sql);
      query(sql);
    });
  }
};
