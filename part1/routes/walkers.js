var express = require('express');
var router = express.Router();
var db =require('../db');

// {
//     "walker_username": "bobwalker",
//     "total_ratings": 2,
//     "average_rating": 4.5,
//     "completed_walks": 2
//   }

router.get('/summary', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT
                u.
        `)
    }
})
