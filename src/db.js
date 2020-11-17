import mysql from 'mysql';
import util from 'util';

export const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'poc_config',
});

export const query = util.promisify(db.query).bind(db);
