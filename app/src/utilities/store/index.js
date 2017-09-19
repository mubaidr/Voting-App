import Vue from 'vue'
import Vuex from 'vuex'
import session from './session'
import api from '../../api'

Vue.use(Vuex)

const state = {
  auth: session.getAuth(),
  user: session.getUser(),
  api: api
}

const mutations = {
  setAuthentication(state, auth) {
    state.auth = auth
    session.setAuth(auth)
  },
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo
    session.setUser(userInfo)
  },
  removeAuthentication(state) {
    state.auth = null
    state.user = null
    session.clear()
  }
}

const actions = {}

const getters = {
  getAuth(state) {
    return state.auth
  },
  isAuthenticated(state) {
    return state.auth !== null && typeof state.auth !== 'undefined'
  },
  getUser(state) {
    return state.user
  },
  getAPI(state) {
    return state.api
  }
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
