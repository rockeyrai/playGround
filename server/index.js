const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql2');

app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '*#$(req)405R@i',
    database: 'rockey'
});

db.connect(err => {
    if (err) console.error('Database connection failed:', err.stack);
    else console.log('Connected to database.');
});

app.get('/users', (req, res) => {
    db.query('SELECT * FROM User', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
});

app.post('/users', (req, res) => {
    const { username, title } = req.body;
    db.query('INSERT INTO users (username, title) VALUES (?, ?)', [username, title], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'User created', userId: results.insertId });
    });
});

app.listen(3001, () => {
    console.log('Server running on http://localhost:3001');
});
