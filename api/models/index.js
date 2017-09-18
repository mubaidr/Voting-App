const mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
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

let pollSchema = new mongoose.Schema({
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
    type: [String],
    required: function () {
      return this.length >= 2
    }
  },
  vote_stats: {
    total: Number,
    options: [Number]
  }
})

let voteSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true
  },
  poll_id: {
    type: String,
    required: true
  },
  option: {
    type: String,
    required: true
  }
})

let userModel = mongoose.model('User', userSchema)
let pollModel = mongoose.model('Poll', pollSchema)
let voteModel = mongoose.model('Vote', voteSchema)

// voteSchema.pre('save', next => {
//   next()
// })

module.exports = {
  User: userModel,
  Poll: pollModel,
  Vote: voteModel
}
