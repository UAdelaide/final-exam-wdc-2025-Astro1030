var express = require('express');
var router = express.Router();
var db =require('../db');

//request_id, dog_name, 
router.get('/open', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT wr.request_id, d.name AS dog_name, wr.requested_time
        `)
    }
})