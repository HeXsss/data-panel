const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
require('dotenv').config()
const cors = require("cors");
app.use(cors());
const port = process.env.PORT || 3000;
app.use(bodyParser.json());

app.listen(port, (req, res, next) => {
  console.log(`🚀 Server booted on port ${port}`)
})