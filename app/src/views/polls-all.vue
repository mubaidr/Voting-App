<template>
  <div class="row">
    <div class="col-lg-offset-2 col-lg-8">
      <h2>Latest Polls: </h2>
      <ul class="list-group">
        <a href="#" @click="viewPoll(poll._id)" v-for="poll in polls" :key="poll._id">
          <li class="list-group-item">
            <span class="badge" title="Total Votes">{{poll.vote_stats.total}}</span>
            {{poll.title}}
          </li>
        </a>
      </ul>
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
        polls: []
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
      axios.get(this.getAPI.url + 'api/polls/all').then(res => {
        this.polls = res.data
      }).catch(() => {
        alert('Error! Please try again.')
      })
    }
  }
</script>

<style>

</style>

