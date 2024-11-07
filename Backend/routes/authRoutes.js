const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');
const router = express.Router();
require('dotenv').config()


const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: 'mithul45',
    database: process.env.DB_NAME,
});
console.log(process.env.DB_PASSWORD);

db.connect((err) => {
    if (err) throw err;
    console.log("MySQL Connected...");
});

// Registration Route
router.post('/register', (req, res) => {
    const { name, email, password } = req.body;
  console.log();
  
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
        if (err) throw err;

        if (result.length > 0) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Hash password
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) throw err;

            // Insert user into database
            const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
            db.query(query, [name, email, hashedPassword], (err, result) => {
                if (err) throw err;
                res.status(201).json({ msg: 'User registered successfully' });
            });
        });
    });
});

router.post("/login", (req, res) => {
    const { email, password } = req.body;


    try {
      db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
        if (err) throw err;
    
        if (result.length === 0) {
          return res.status(400).json({ msg: "User not found" });
        }
    
        const user = result[0];
        console.log(user.password,password);
        bcrypt.compare(password, user.password, (err, isMatch) => {
          
          if (err) throw err;
    
          if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
          }
    
          const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
          res.json({ token });
        });
      });
    } catch (error) {
      console.log(error);
      
    }
  
   
});

 
module.exports = router;
