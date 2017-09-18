const router = require('express').Router()
const parse = require('url-parse')

const Poll = require('../models').Poll

router.get('/api/polls/all', (req, res, next) => {
  let offset = parse(req.originalUrl, true).query.offset || 0

  Poll.find({}).skip(offset).limit(10).sort({
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

router.delete('/api/polls/:id', (req, res, next) => {
  let id = req.params.id

  Poll.findOneAndRemove({
    _id: id,
    created_by: req.account.data._id
  }).exec((err, result) => {
    if (err) next(err)

    if (result) {
      res.send(result)
    } else {
      res.status(403).end()
    }
  })
})

router.put('/api/polls/:id', (req, res, next) => {
  let id = req.params.id
  let updatedPoll = req.body.poll

  Poll.update({
        _id: id,
        created_by: req.account.data._id
      },
      updatedPoll)
    .exec((err, result) => {
      if (err) next(err)

      if (result) {
        res.send(result)
      } else {
        res.status(403).end()
      }
    })
})

router.get('/api/polls', (req, res, next) => {
  let offset = parse(req.originalUrl, true).query.offset || 0
  let userId = req.account.data._id

  Poll.find({
    created_by: userId
  }).skip(offset).limit(10).sort({
    'created_at': -1
  }).exec((err, result) => {
    if (err) next(err)

    res.send(result)
  })
})

router.post('/api/polls', (req, res, next) => {
  let userId = req.account.data._id

  let poll = new Poll({
    created_at: new Date(),
    created_by: userId,
    title: req.body.title,
    options: req.body.options,
    vote_stats: {
      total: 0,
      options: []
    }
  })

  poll.save(err => {
    if (err) next(err)

    res.json({
      success: true
    })
  })
})

module.exports = router
