const express = require('express');
const db = require('../config/db'); 

const router = express.Router();


router.post('/register', (req, res) => {
    const { name, gender, email, password } = req.body;

    if (!name || !gender || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

   
    const query = `INSERT INTO users (name, gender, email, password) VALUES (?, ?, ?, ?)`;
    db.query(query, [name, gender, email, password], (err, results) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ error: 'Email already exists' });
            }
            return res.status(500).json({ error: 'Database error' });
        }
        
    const userId = results.insertId;

    
    res.cookie('user_id', userId, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

    res.status(201).json({ message: 'User registered successfully', userId });
    });
});
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    
    console.log("Received email:", email);
    console.log("Received password:", password);

   
    const query = `SELECT * FROM users WHERE email = ?`;
    
    db.query(query, [email], (err, results) => {
        if (err) {
            console.log("Database error:", err);  
            return res.status(500).json({ error: 'Database error' });
        }

        
        if (results.length === 0) {
            console.log("No user found with email:", email);  
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        
    const userId = results[0].id;

    
    res.cookie('user_id', userId, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

    res.status(200).json({ message: 'Login successful', userId });

    });
});








module.exports = router;
