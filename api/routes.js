const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const chalk = require('chalk')

const router = require('express').Router()
const ObjectId = require('mongodb').ObjectId

const User = require('./models').User
const Poll = require('./models').Poll
const validate = require('./validators')
const config = require('./config')

/* authentication */
router.post('/auth/register', (req, res, next) => {
  let username = req.body.username
  let password = req.body.password
  let passwordHash = bcrypt.hashSync(password, 8)

  if (!validate.username(username) || !validate.password(password)) {
    res.json({
      success: false,
      error: 'Invalid request'
    })
    return
  }

  User.findOne({
    username: username
  }, (err, user) => {
    if (err) next(err)

    if (user) {
      res.json({
        success: false,
        error: 'Username already registered.'
      })
    } else {
      let user = new User({
        username: username,
        password: passwordHash
      })

      user.save(err => {
        if (err) next(err)

        jwt.sign(user, config.secret, {
          expiresInMinutes: 1440
        }, (err, token) => {
          if (err) next(err)

          res.json({
            success: !err,
            error: err,
            token: token
          })
        })
      })
    }
  })
})

router.post('/auth/login', (req, res, next) => {
  let username = req.body.username
  let password = req.body.password
  let passwordHash = bcrypt.hashSync(password, 8)

  if (!validate.username(username) || !validate.password(password)) {
    res.json({
      success: false,
      error: 'Invalid request'
    })
    return
  }

  User.findOne({
    username: username,
    password: passwordHash
  }, (err, user) => {
    if (err) next(err)

    if (!user) {
      res.json({
        success: false,
        error: 'Authentication failed. Invalid username or password.'
      })
    } else {
      jwt.sign(user, config.secret, {
        expiresInMinutes: 1440
      }, function (err, token) {
        if (err) next(err)

        res.json({
          success: !err,
          error: err,
          token: token
        })
      })
    }
  })
})

router.use('/api/*', (req, res, next) => {
  let token = req.body.token || req.query.token || req.headers['x-access-token']

  if (token) {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) next(err)

      console.log(decoded)
      req.decoded = decoded
      next()
    })
  } else {
    res.status(403).send({
      success: false,
      error: 'No token provided.'
    })
  }
})

/* users */
router.get('/api/users/self', (req, res, next) => {
  let id = ObjectId(req.decoded.id)

  User.findOne(id).exec((err, result) => {
    if (err) next(err)
    res.json(result)
  })
})

/* polls */
router.get('/api/polls/all', (req, res, next) => {
  Poll.find({}).limit(10).sort({
    'created_at': -1
  }).exec((err, result) => {
    if (err) next(err)
    res.send(result)
  })
})

router.get('/api/polls', (req, res, next) => {
  let userId = req.decoded.id

  Poll.find({
    created_by: userId
  }).limit(10).sort({
    'created_at': -1
  }).exec((err, result) => {
    if (err) next(err)
    res.send(result)
  })
})

router.get('/api/polls/:id', (req, res, next) => {
  let id = ObjectId(req.params.id)

  Poll.findOne(id).exec((err, result) => {
    if (err) next(err)
    res.send(result)
  })
})

router.post('/api/polls/create', (req, res, next) => {
  let poll = new Poll({
    created_at: new Date(),
    created_by: req.decoded.id,
    title: req.body.title,
    options: req.body.options
  })

  poll.save(err => {
    if (err) next(err)

    res.json({
      success: true
    })
  })
})

/* 404 */
router.get('*', (req, res, next) => {
  res.status(404).end()
})

/* Error handler */
router.use(function (err, req, res, next) {
  chalk.red(err)
  res.status(500).send('Internal Server Error')
})

module.exports = router
