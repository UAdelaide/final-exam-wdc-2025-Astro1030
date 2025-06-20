import mysql from 'mysql2/promise';

export db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'DogWalkService'
});
