const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const chalk = require('chalk')

const router = require('express').Router()
const User = require('./models').User
const Poll = require('./models').Poll

const validate = require('./validators')
const config = require('./config')

/* authentication */
router.post('/auth/register', (req, res, next) => {
  let username = req.body.username.toLowerCase()
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
  }).exec((err, user) => {
    if (err) next(err)

    if (user) {
      res.json({
        success: false,
        error: 'Username already registered'
      })
    } else {
      let user = new User({
        username: username,
        password: passwordHash
      })

      user.save((err, usr) => {
        if (err) next(err)

        jwt.sign({
          data: user
        }, config.secret, {
          expiresIn: 60 * 60 * 24
        }, function (err, token) {
          if (err) next(err)

          res.json({
            success: true,
            error: null,
            token: token
          })
        })
      })
    }
  })
})

router.post('/auth/login', (req, res, next) => {
  let username = req.body.username.toLowerCase()
  let password = req.body.password

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

    if (!user) {
      res.json({
        success: false,
        error: 'Authentication failed'
      })
    } else {
      bcrypt.compare(password, user.password, function (err, same) {
        if (err) next(err)

        if (same) {
          jwt.sign({
            data: user
          }, config.secret, {
            expiresIn: 60 * 60 * 24
          }, function (err, token) {
            if (err) next(err)

            res.json({
              success: true,
              error: null,
              token: token
            })
          })
        } else {
          res.json({
            success: false,
            error: 'Authentication failed'
          })
        }
      })
    }
  })
})

router.use('/api/*', (req, res, next) => {
  let token = req.body.token || req.query.token || req.headers['x-access-token']

  if (token) {
    jwt.verify(token, config.secret, (err, account) => {
      if (err) next(err)

      req.account = account
      next()
    })
  } else {
    res.sendStatus(403)
  }
})

/* users */
router.get('/api/users/self', (req, res, next) => {
  res.json(req.account)
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
  let userId = req.account.data._id

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
  let id = req.params.id

  Poll.findById(id).exec((err, result) => {
    if (err) next(err)

    res.send(result)
  })
})

router.post('/api/polls/create', (req, res, next) => {
  let userId = req.account.data._id

  let poll = new Poll({
    created_at: new Date(),
    created_by: userId,
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
router.get('*', (req, res) => {
  console.dir(chalk.bgRed('404! Not Found!'))
  res.status(404).end()
})

/* Error handler */
router.use(function (err, req, res, next) {
  console.dir(chalk.bgRed(err))
  res.status(500).send(err)
})

module.exports = router
