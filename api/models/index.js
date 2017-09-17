const mongoose = require('mongoose')

let User = new mongoose.Schema({
  first_name: String,
  last_name: String,
  username: {
    index: {
      unique: true
    },
    type: String,
    min: 6,
    max: 12,
    required: true
  },
  password: {
    type: String,
    min: 8,
    required: true
  }
})

let Poll = new mongoose.Schema({
  created_at: {
    type: Date,
    required: true
  },
  created_by: {
    type: String,
    required: true
  },
  title: {
    type: String,
    min: 6,
    max: 250,
    required: true
  },
  options: [String]
})

let Vote = new mongoose.Schema({
  user_id: {
    type: String,
    required: true
  },
  post_id: {
    type: String,
    required: true
  },
  option: String
})

Vote.pre('save', next => {
  console.log('Vote: ', this, Vote)
  next()
})

module.exports = {
  User: mongoose.model('User', User),
  Poll: mongoose.model('Poll', Poll),
  Vote: mongoose.model('Vote', Vote)
}
