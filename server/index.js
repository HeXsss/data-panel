const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const app = express();
app.use(cookieParser());
require('dotenv').config()
const cors = require("cors");
app.use(express.json())
const port = process.env.PORT || 3000;
app.use(cors({
  credentials: true,
  origin: `http://localhost:3000`
}));
app.use(bodyParser.json());
const jwt = require('jsonwebtoken')
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

const refreshTokens = []

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    console.log(err)
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}
const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: '15s' })
}
app.post('/api/v1/token', (req, res) => {
  const refreshToken = req.body.token
  if (refreshToken == null) return res.sendStatus(401)
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
    if (err) return res.sendStatus(403)
    const accessToken = generateAccessToken({ name: user.name })
    res.json({ accessToken: accessToken })
  })
})
// app.get("/api/v1/cookie", (req, res) => {
//   console.log(req.cookies['vlife-panel:token'])
//   res.send()
// });
app.get('/api/v1/getSession', (req, res, next) => {
  if (req.cookies['vlife-panel:token']) { 
    res.send(req.cookies['vlife-panel:token'])
  } else {
    res.send(null)
  }
})
app.post('/api/v1/login', (req, res, next) => {
  const username = req.body.username || ''
  const password = req.body.password || ''
  console.log(username, password)
  connection.query('SELECT id FROM panel_users WHERE username = ? AND password = ?', [username, password], (error, results, fields) => {
    if (error) return 
    if (results.length > 0) {
      const user = results[0]
      const userData = {}
      const keys = Object.keys(user)
      for (let i = 0; i < keys.length; i++) {
        userData[keys[i]] = user[keys[i]]
      }
      const accessToken = generateAccessToken(userData)
      const refreshToken = jwt.sign(userData, process.env.REFRESH_TOKEN)
      refreshTokens.push(refreshToken)
      const cookieData = JSON.stringify({ accessToken, refreshToken })
      console.log(cookieData)
      res.cookie("vlife-panel:token", cookieData, {
        secure: false,
        // expires: new Date(new Date().getTime() + 30 * 1000),
        httpOnly: true,
      })
      res.send({
        accessToken,
        refreshToken
      })
    } else {
      res.sendStatus(401)
    }
  })
})
app.listen(port, (req, res, next) => {
  console.log(`🚀 Server booted on port ${port}`)
})