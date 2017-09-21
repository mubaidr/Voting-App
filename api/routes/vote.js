const router = require('express').Router()

const Vote = require('../models').Vote
const Poll = require('../models').Poll

router.get('/api/vote', (req, res, next) => {
  let vote = req.body
  let userId = req.account.data._id

  console.log(vote, userId)

  Vote.find({
    poll_id: vote.poll_id,
    user_id: userId
  }).exec((err, votes) => {
    if (err) next(err)


    res.json({
      success: true,
      hasVoted: votes.length > 0
    })
  })
})

router.post('/api/vote', (req, res, next) => {
  let vote = new Vote(req.body)
  vote.user_id = req.account.data._id

  Poll.findById(vote.poll_id).exec((err, poll) => {
    if (err) next(err)

    let index = poll.options.indexOf(vote.option)
    poll.vote_stats.total = poll.vote_stats.total ? ++poll.vote_stats.total : 1
    poll.vote_stats.options[index] = poll.vote_stats.options[index] ? ++poll.vote_stats.options[index] : 1

    Poll.findByIdAndUpdate(poll._id, poll, (err) => {
      if (err) next(err)

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
