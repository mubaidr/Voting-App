<template>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
        <router-link to="/home" class="navbar-brand">Open Vote</router-link>
      </div>
      <ul class="nav navbar-nav">
        <li>
          <router-link to="/polls-all">Latest Polls</router-link>
        </li>
        <template v-if="isAuthenticated">
          <li>
            <router-link to="/polls">My Polls</router-link>
          </li>
          <li>
            <router-link to="/polls-create">Create new Poll</router-link>
          </li>
        </template>
      </ul>
      <ul class="nav navbar-nav pull-right">
        <template v-if="isAuthenticated">
          <li>
            <a href="#" @click.prevent.stop="logout">Logout</a>
          </li>
        </template>
        <template v-else>
          <li>
            <router-link to="/register">Register</router-link>
          </li>
          <li>
            <router-link to="/login">Login</router-link>
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<script>
  import router from '../../utilities/router'
  import store from '../../utilities/store'
  import { mapGetters } from 'vuex'
  // import axios from 'axios'

  export default {
    name: "header-comp",
    computed: {
      ...mapGetters(['isAuthenticated'])
    },
    methods: {
      logout () {
        store.commit('removeAuthentication')
        router.push('home')
      }
    }
  }
</script>

<style>
  .navbar {
    border-radius: 0;
  }

  .navbar-brand {
    font-weight: bold;
  }
</style>

