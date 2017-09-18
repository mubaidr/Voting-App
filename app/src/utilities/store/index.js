import Vue from 'vue'
import Vuex from 'vuex'
import session from './session'

Vue.use(Vuex)

const state = {
  auth: session.getAuth(),
  user: session.getUser()
}

const mutations = {
  setAuthentication (state, auth) {
    state.auth = auth
    session.setAuth(auth)
  },
  setUserInfo (state, userInfo) {
    state.userInfo = userInfo
    session.setUser(userInfo)
  },
  removeAuthentication (state) {
    state.auth = null
    state.user = null
    session.clear()
  }
}

const actions = {}

const getters = {
  getAuth (state) {
    return state.auth
  },
  isAuthenticated (state) {
    return state.auth !== null && typeof state.auth !== 'undefined'
  },
  userInfo (state) {
    return state.userInfo
  }
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
