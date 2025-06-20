const express = require('express');
const path = require('path');
require('dotenv').config();
const session = require('express-session');

const app = express();


app.use(session({
  secret: 'mydogsecret',
  resave: false,
  saveUninitialized: true
}));

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: false }));


// Routes
const walkRoutes = require('./routes/walkRoutes');
const userRoutes = require('./routes/userRoutes');


app.use('/api/walks', walkRoutes);
app.use('/api', userRoutes);

// Export the app instead of listening here
module.exports = app;