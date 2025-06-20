var express = require('express');
var router = express.Router();
var db =require('../db');

//request_id, dog_name, requested_time, duration_minutes, location, owner_username
router.get('/open', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT wr.request_id, d.name AS dog_name, wr.requested_time, wr.duration_minutes, wr.location, u.username AS owner_username
            FROM WalkRequests wr
            JOIN Dogs d ON wr.dog_id = d.dog_id
            JOIN User u ON d.owner_id = u.user_id
            WHERE wr.status = 'open'
        `);
        res.json(rows);
    } catch(err) {
        console.error('Error fetching open walk request:', err.message);
        res.status(500).json({ error: 'failed to fetch '})
    }
})