const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')

// create the express app
const app = express()

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS, DELETE, PATCH')
  next()
})

// create middleware to handle the serving the app
app.use('/', serveStatic(path.join(__dirname, '/dist')))

// Create default port to serve the app on
const port = process.env.PORT || 5000

app.listen(port)

// Log a feedback that this is actually running
console.log('Listening on port ' + port)
