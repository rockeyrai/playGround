const express = require('express');
const Test = require('../models/test');


const router = express.Router();

// Create a new Test entry
router.post('/tests', async (req, res) => {
    try {
        const test = await Test.create(req.body);
        res.status(201).json(test);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
