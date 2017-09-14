var express = require('express')
var path = require('path')
var url = require('url')

var authService = require('./auth-service')
var dbService = require('./db-service')
var routes = require('./routes')

var app = express()
var port = process.env.PORT || 9000

/* static resources */
app.use(express.static(path.join(__dirname, 'public')))

/* favicon */
app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/favicon.png'))
})

/* invalid */
app.get('/404', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/404.html'))
})

//  Connect all our routes to our application
app.use('/', routes);

/* all others */
app.get('*', function (req, res) {
  res.redirect('/404')
})

/* start app */
app.listen(port)
