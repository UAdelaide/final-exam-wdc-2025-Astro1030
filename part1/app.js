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


var app = express();

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
