var express = require('express');
var router = express.Router();
var db =require('../db');


router.get('/open', async (req, res) => {
    try {
        const [rows] = await db.query(
            
        )
    }
})