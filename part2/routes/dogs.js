const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.get('/dogs', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Dogs');
        res.json(rows);
    }
})