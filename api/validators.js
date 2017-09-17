module.exports = {
  username: function (str) {
    return typeof str === 'string' && str.length >= 6 && str.length <= 12 && str.indexOf(' ') === -1
  },
  password: function (str) {
    return typeof str === 'string' && str.length >= 8
  },
  poll: function (obj) {
    return obj.title.length > 6 && obj.title.length < 250 && obj.options.length >= 2
  }
}
