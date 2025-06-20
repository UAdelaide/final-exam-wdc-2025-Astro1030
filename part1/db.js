import mysql from 'mysql2/promise';

export const db = await mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // add password if needed
  database: 'DogWalkService'
});
