const express = require('express');
const router = express.Router();
const db = require('../config/db.js'); 
const cookieParser = require('cookie-parser');


router.use(cookieParser());


router.get('/profile', (req, res) => {
  const userId = req.cookies.user_id;

  if (!userId) {
    return res.status(400).json({ message: 'User not authenticated' });
  }

 
  const query = 'SELECT name, email, gender FROM users WHERE id = ?';
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Error fetching user profile' });
    }
    console.log('Database results:', results);
    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ user: results[0] });
  });
  
});


router.put('/profile', (req, res) => {
  const userId = req.cookies.user_id;
  const { email, password } = req.body;

  if (!userId) {
    return res.status(400).json({ message: 'User not authenticated' });
  }

 
  let query = 'UPDATE users SET ';
  const values = [];

  if (email) {
    query += 'email = ?, ';
    values.push(email);
  }
  if (password) {
    query += 'password = ?, ';
    values.push(password);
  }

  
  query = query.slice(0, -2);
  query += ' WHERE id = ?';
  values.push(userId);

  db.query(query, values, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error updating profile' });
    }
    res.status(200).json({ message: 'Profile updated successfully' });
  });
});

module.exports = router;
