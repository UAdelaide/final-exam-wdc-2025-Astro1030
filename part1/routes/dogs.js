var express = require('express');
var router = express.Router();
var db =require('../db');

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT d.name AS dog_name, d.size, u.username AS owner_username
      FROM Dogs d
      JOIN Users u ON d.owner_id = u.user_id
    `);
    res.json(rows);
  } catch (err) {
    console.error('Error fetching dogs:', err.message);
    res.status(500).json({ error: 'Failed to fetch dogs' });
  }
});

module.exports = router;
