export default {
  getAuth () {
    return JSON.parse(window.localStorage.getItem('auth'))
  },
  setAuth (obj) {
    window.localStorage.setItem('auth', JSON.stringify(obj))
  },
  getUser () {
    return JSON.parse(window.localStorage.getItem('userinfo'))
  },
  setUser (obj) {
    window.localStorage.setItem('userinfo', JSON.stringify(obj))
  }
}
