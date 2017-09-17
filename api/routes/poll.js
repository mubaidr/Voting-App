const router = require('express').Router()

const Poll = require('../models').Poll

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

module.exports = router
