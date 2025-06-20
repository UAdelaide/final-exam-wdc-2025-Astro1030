var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// P1 ROUTER
const dogsRouter = require('./routes/dogs');
const walkrequestsRouter = require('./routes/walkrequests');
const walkersRouter = require('./routes/walkers');

const db = require('./db');


var app = express();


async function seedIfEmpty() {
    try {
        const [rows] = await db.query(`SELECT COUNT(*) AS cnt FROM Users`);
        if (rows[0].cnt === 0) {
            console.log('🔄 Seeding test data...');

            await db.query(`
        INSERT INTO Users (username, email, password_hash, role) VALUES
          ('alice123','alice@example.com','hashed123','owner'),
          ('bobwalker','bob@example.com','hashed456','walker'),
          ('caro123','carol@example.com','hashed789','owner'),
          ('astro','astro@example.com','hash111','walker'),
          ('abc','abc@example.com','abc123','walker')
      `);

            await db.query(`
        INSERT INTO Dogs (owner_id,name,size) VALUES
          ((SELECT user_id FROM Users WHERE username='alice123'),'Max','medium'),
          ((SELECT user_id FROM Users WHERE username='caro123'),'Bella','small'),
          ((SELECT user_id FROM Users WHERE username='astro'),'Dog1','small'),
          ((SELECT user_id FROM Users WHERE username='abc'),'Dog2','small'),
          ((SELECT user_id FROM Users WHERE username='bobwalker'),'Dog3','small')
      `);

            await db.query(`
        INSERT INTO WalkRequests (dog_id,requested_time,duration_minutes,location,status) VALUES
          ((SELECT dog_id FROM Dogs WHERE name='Max'),'2025-06-10 08:00:00',30,'Parklands','open'),
          ((SELECT dog_id FROM Dogs WHERE name='Bella'),'2025-06-10 09:30:00',45,'Beachside Ave','accepted'),
          ((SELECT dog_id FROM Dogs WHERE name='Dog1'),'2025-06-10 10:30:00',45,'Beachside Ave','accepted'),
          ((SELECT dog_id FROM Dogs WHERE name='Dog2'),'2025-06-10 12:30:00',45,'Beachside Ave','accepted'),
          ((SELECT dog_id FROM Dogs WHERE name='Dog3'),'2025-06-10 14:30:00',45,'Beachside Ave','accepted')
      `);

            console.log('Seeding complete.');
        } else {
            console.log('Data already exists; skipping seed.');
        }
    } catch (err) {
        console.error('❌ Seeding error:', err.message);
    }
}
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// P1 ROUTER
app.use('/api/dogs', dogsRouter);
app.use('/api/walkrequests', walkrequestsRouter);
app.use('/api/walkers', walkersRouter);


app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
