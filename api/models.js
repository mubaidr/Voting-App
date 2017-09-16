const mongoose = require('mongoose')

let User = new mongoose.Schema({
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
  options: {
    type: Array,
    required: function () {
      return this.length > 2
    }
  }
})

module.exports = {
  User: mongoose.model('User', User),
  Poll: mongoose.model('Poll', Poll)
}
