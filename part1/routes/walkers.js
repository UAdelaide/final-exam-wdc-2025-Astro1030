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
                u.username AS walker_username,
                COUNT(r.rating_id) AS total_rating,
                ROUND(AVG(r.rating), 1) AS average_rating,
                COUNT(CASE WHEN wr.status = 'completed' THEN 1 END) AS completed_walks

            FROM Users u
            LEFT JOIN WalkRatings r On u.user_id = r.walker_id
            LEFT JOIN WalkReequests wr ON r.request_id = wr.request_Id
            WHERE u.role = 'walker'
            GROUP BY u.
        `)
    }
})
