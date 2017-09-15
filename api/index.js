var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var cors = require('cors')

// var authService = require('./auth-service')
// var dbService = require('./db-service')
var routes = require('./routes')

var app = express()
var port = process.env.PORT || 9000

app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())
app.use(bodyParser.json())

app.use('/', routes)

app.get('*', function (req, res) {
  res.status(404).send('Not Found!')
})

app.listen(port)
