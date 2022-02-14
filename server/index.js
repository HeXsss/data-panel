const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
require('dotenv').config()
const cors = require("cors");
app.use(cors());
const port = process.env.PORT || 3000;
app.use(bodyParser.json());

const mysql = require('mysql');
const connectionData = {
  host: process.env.HOST || 'localhost',
  user: process.env.USER || 'root',
  password: process.env.PASSWORD || '',
  database: process.env.DATABASE || 'roleplay',
}
const connection = mysql.createConnection(connectionData)
try {
  connection.connect();
} catch (err) {
  console.log(err)
}
// connection.query('SELECT COUNT(*) FROM societies', (error, results, fields) => {
//   if (error) throw error;
//   console.log(results[0]['COUNT(*)'])
// })
app.listen(port, (req, res, next) => {
  console.log(`🚀 Server booted on port ${port}`)
})