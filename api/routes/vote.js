const router = require('express').Router()

const Vote = require('../models').Vote
const Poll = require('../models').Poll

router.post('/api/vote', (req, res, next) => {
  let vote = new Vote(req.body)

  Poll.findById(vote.poll_id).exec((err, poll) => {
    if (err) next(err)

    let index = poll.options.indexOf(vote.option)
    poll.vote_stats.total = poll.vote_stats.total ? ++poll.vote_stats.total : 1
    poll.vote_stats.options[index] = poll.vote_stats.options[index] ? ++poll.vote_stats.options[index] : 1

    poll.save((err) => {
      if (err) next(err)

      vote.save((err) => {
        if (err) next(err)

        res.json({
          success: true
        })
      })
    })
  })
})

module.exports = router
