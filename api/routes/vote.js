const router = require('express').Router()

const Vote = require('../models').Vote
const Poll = require('../models').Poll

router.get('/api/vote', (req, res, next) => {
  let vote = new Vote(req.body)
  let userId = req.account.data._id

  Vote.find({
    poll_id: vote.poll_id,
    user_id: userId
  }).exec((err, votes) => {
    if (err) next(err)

    res.json({
      success: true,
      vote: votes[0]
    })
  })
})

router.post('/api/vote', (req, res, next) => {
  let vote = new Vote(req.body)

  Poll.findById(vote.poll_id).exec((err, poll) => {
    if (err) next(err)

    let index = poll.options.indexOf(vote.option)
    poll.vote_stats.total = poll.vote_stats.total ? ++poll.vote_stats.total : 1
    poll.vote_stats.options[index] = poll.vote_stats.options[index] ? ++poll.vote_stats.options[index] : 1

    poll.save((err) => {
      if (err) next(err)

      vote.user_id = poll.created_by
      vote.save((err) => {
        if (err) next(err)

        res.json({
          success: true,
          poll: poll,
          vote: vote
        })
      })
    })
  })
})

module.exports = router
