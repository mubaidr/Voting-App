<template>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
        <a class="navbar-brand" href="/home">Open Vote</a>
      </div>
      <ul class="nav navbar-nav">
        <li>
          <a href="/polls-all">Latest Polls</a>
        </li>
        <template v-if="isAuthenticated">
          <li>
            <a href="/polls">My Polls</a>
          </li>
          <li>
            <a href="/polls-create">Create new</a>
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
            <a href="/register">Register</a>
          </li>
          <li>
            <a href="/login">Login</a>
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

