<template>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
        <a class="navbar-brand" href="/home">Open Vote</a>
      </div>
      <ul class="nav navbar-nav" v-if="isAuthenticated">
        <li>
          <a href="/polls">Latest Polls</a>
        </li>
        <li>
          <a href="/login">My Polls</a>
        </li>
      </ul>
      <ul class="nav navbar-nav" v-else>
        <li>
          <a href="/register">Register</a>
        </li>
        <li>
          <a href="/login">Login</a>
        </li>
      </ul>
      <form class="navbar-form navbar-right" role="search">
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Search Polls">
        </div>
        <button type="submit" class="btn btn-default">Search</button>
      </form>
    </div>
  </nav>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: "header-comp",
    computed: {
      ...mapGetters(['isAuthenticated', 'getAuth', 'getUser'])
    },
    mounted () { }
  }
</script>

<style>
  .navbar-brand {
    font-weight: bold;
  }
</style>

