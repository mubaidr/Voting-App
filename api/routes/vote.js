const router = require('express').Router()

router.get('/api/votes/:poll_id', (req, res, next) => {
  res.send('Vote')
})

module.exports = router
