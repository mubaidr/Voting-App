<template>
  <div class="row">
    <div class="col-lg-offset-2 col-lg-8">
      <h2>My Polls: </h2>
      <div class="progress progress-striped active" v-if="loading">
        <div class="progress-bar" style="width: 100%"></div>
      </div>
      <div v-else>
        <ul class="list-group">
          <router-link :to="'/poll/' + poll._id" v-for="poll in polls" :key="poll._id">
            <li class="list-group-item">
              <span class="badge" title="Total Votes">{{poll.vote_stats.total}}</span>
              {{poll.title}}
            </li>
          </router-link>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import router from '../utilities/router'
  import { mapGetters } from 'vuex'
  import axios from 'axios'

  export default {
    data () {
      return {
        polls: [],
        loading: true
      }
    },
    computed: {
      ...mapGetters(['getAPI'])
    },
    methods: {
      viewPoll (id) {
        router.push('poll/' + id)
      }
    },
    mounted () {
      axios.get(this.getAPI.url + 'api/polls').then(res => {
        this.polls = res.data
      }).catch(() => {
        alert('Error! Please try again.')
      }).then(() => {
        this.loading = false
      })
    }
  }
</script>

<style>

</style>

