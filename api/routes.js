// var url = require('url')
const router = require('express').Router()

router.get('/', (req, res) => {
  res.redirect('/home')
})

router.get('/home', (req, res) => {
  res.status(200).json({
    message: 'home!'
  })
})

router.get('/signin', (req, res) => {
  res.status(200).json({
    message: 'signin!'
  })
})

router.get('/user', (req, res) => {
  res.status(200).json({
    message: 'user!'
  })
})

router.get('/poll', (req, res) => {
  res.status(200).json({
    message: 'poll!'
  })
})

router.get('/poll/:id', (req, res) => {
  res.status(200).json({
    message: 'poll/:id!'
  })
})

router.post('/poll/create', (req, res) => {
  res.status(200).json({
    message: 'poll/create!'
  })
})

module.exports = router
