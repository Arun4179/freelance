const express = require("express");
const mysql = require("mysql2");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes"); 
const cors=require('cors')
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors(
    {
        origin: "http://localhost:3000",
    }
))
// Database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) throw err;
    console.log("MySQL Connected...");
});


app.use('/api/auth', authRoutes); 

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
