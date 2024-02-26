const express = require("express");
const cors = require("cors");
const bodyParser =require('body-parser');
const mysql = require('mysql');
/*const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieparser = require("cookie-parser");*/

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
    host: 'budsirekuv46bhs9ttyc-mysql.services.clever-cloud.com',
    user: 'ugsvjt9dhgpseg2n',
    password: 'V19jIbxfP8M51RdebJDF',
    database: 'budsirekuv46bhs9ttyc',
  });
  
  // Connect to MySQL
  db.connect((err) => {
    if (err) {
      throw err;
    }
    console.log('Connected to the MySQL database');
  });
  
  // Create Employee
  app.post('/employee', (req, res) => {
    const formData = req.body;
  
    // Validate employee name length
    if (formData.name.length > 20) {
      return res.status(400).send('Employee name should not exceed 20 characters');
    }
  
    // Validate year of birth
    const currentYear = new Date().getFullYear();
    const dob = new Date(formData.dob);
    if (dob.getFullYear() > 2002 || dob.getFullYear() >= currentYear) {
      return res.status(400).send('Year of birth must be before 2002 and after current year');
    }
  
    // Convert formData.dob string to Date object
    formData.dob = dob;
  
    // Insert formData into employees table
    const sql = 'INSERT INTO employees SET ?';
    db.query(sql, formData, (err, result) => {
      if (err) {
        console.error('Error inserting employee:', err);
        res.status(500).send('Error inserting employee');
      } else {
        console.log('Employee inserted successfully:', result);
        res.status(200).send('Employee inserted successfully');
      }
    });
  });
app.listen(PORT, () => {
    console.log("server is running on port ${PORT}");
})