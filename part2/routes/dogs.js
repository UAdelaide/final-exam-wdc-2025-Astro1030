const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.get('/dogs', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Dogs');
        res.json(rows);
    } catch (err) {
        console.error('Error fetching dogs:', err);
        res.status(500).json({ error: 'Failed to fetch dogs' });
    }
});

router.get('/mydogs', async (req, res) => {
  if (!req.session.user || req.session.user.role !== 'owner') {
    return res.status(401).json({ error: 'Not logged in as owner' });
  }

  const ownerId = req.session.user.user_id;

  try {
    const [rows] = await db.query('SELECT dog_id, name, size FROM Dogs WHERE owner_id = ?', [ownerId]);
    res.json(rows);
  } catch (err) {
    console.error('Error loading owner dogs:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;