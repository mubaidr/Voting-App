const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const router = require('express').Router()
const ObjectId = require('mongodb').ObjectId

const User = require('./models').User
const Poll = require('./models').Poll
const config = require('./config')

router.post('/auth/register', (req, res) => {
  User.findOne({
    username: req.body.username
  }, (err, user) => {
    if (err) {
      res.status(500).json({
        success: false,
        error: 'Server error.'
      })
    }

    if (!user) {
      let user = new User({
        username: req.body.username,
        password: bcrypt.hash(req.body.password, 8)
      })

      user.save(err => {
        var token = jwt.sign(user, config.secret, {
          expiresInMinutes: 1440
        })

        res.json({
          success: !err,
          error: err,
          token: token
        })
      })
    } else {
      res.json({
        success: false,
        error: 'Username already registered.'
      })
    }
  })
})

router.post('/auth/login', (req, res) => {
  User.findOne({
    username: req.body.username,
    password: bcrypt.hash(req.body.password, 8)
  }, (err, user) => {
    if (err) {
      res.status(500).json({
        success: false,
        error: 'Server error.'
      })
    }

    if (!user) {
      res.json({
        success: false,
        error: 'Authentication failed. Invalid username or password.'
      })
    } else {
      var token = jwt.sign(user, config.secret, {
        expiresInMinutes: 1440
      })

      res.json({
        success: true,
        error: null,
        token: token
      })
    }
  })
})

/* authentication */
router.use('/api/*', (req, res, next) => {
  let token = req.body.token || req.query.token || req.headers['x-access-token']

  if (token) {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.json({
          success: !err,
          error: err
        })
      } else {
        console.log(decoded)
        req.decoded = decoded
        next()
      }
    })
  } else {
    return res.status(403).send({
      success: false,
      error: 'No token provided.'
    })
  }
})

/* users */
router.get('/api/users/self', (req, res) => {
  let id = ObjectId(req.decoded.id)

  User.findOne(id).exec((error, result) => {
    if (error) res.status(500).end()
    res.json(result)
  })
})

/* polls */
router.get('/api/polls/all', (req, res) => {
  Poll.find({}).limit(10).sort({
    'created_at': -1
  }).exec((error, result) => {
    if (error) res.status(500).end()
    res.send(result)
  })
})

router.get('/api/polls', (req, res) => {
  let userId = req.decoded.id

  Poll.find({
    created_by: userId
  }).limit(10).sort({
    'created_at': -1
  }).exec((error, result) => {
    if (error) res.status(500).end()
    res.send(result)
  })
})

router.get('/api/polls/:id', (req, res) => {
  let id = ObjectId(req.params.id)

  Poll.findOne(id).exec((error, result) => {
    if (error) res.status(500).end()
    res.send(result)
  })
})

router.post('/api/polls/create', (req, res) => {
  let poll = new Poll({
    created_at: new Date(),
    created_by: '', // TODO get userID
    title: req.body.title,
    options: req.body.options
  })

  poll.save(err => {
    res.json({
      success: !err,
      error: err
    })
  })
})

/* 404 */
router.get('*', (req, res) => {
  res.status(404).end()
})

module.exports = router
