<template>
  <div class="row">
    <div class="col-lg-offset-2 col-lg-8">
      <div class="panel panel-primary" v-if="poll">
        <div class="panel-heading">
          <h3 class="panel-title">{{poll.title}}</h3>
        </div>
        <div class="panel-body" v-if="!hasVoted">
          <div class="radio" v-for="option in poll.options" :key="option">
            <label>
              <input type="radio" name="optionsRadios" :value="option" @click="addVote(option)"> {{option}}
            </label>
          </div>
          <hr/>
          <span class="text-muted text-small">Created on: {{new Date(poll.created_at).toDateString()}}</span>
        </div>
        <div class="panel-body" v-else>
          Load graph
        </div>
      </div>
      <div class="progress progress-striped active" v-else>
        <div class="progress-bar" style="width: 45%"></div>
      </div>
    </div>
    <pre>{{poll}}</pre>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import axios from 'axios'

  export default {
    data () {
      return {
        poll: null,
        hasVoted: false
      }
    },
    computed: {
      ...mapGetters(['getAPI'])
    },
    methods: {
      addVote (opt) {
        axios.post(this.getAPI.url + 'api/vote', {
          poll_id: this.poll._id,
          option: opt
        }).then(res => {
          if (res.data.success) {
            this.poll = res.data.poll
            this.hasVoted = true
          } else {
            alert(res.data.error)
          }
        }).catch(() => {
          alert('Error! Please try again.')
        })
      }
    },
    mounted () {
      let id = this.$route.params.id

      axios.get(this.getAPI.url + 'api/polls/' + id).then(res => {
        let pollData = res.data

        axios.get(this.getAPI.url + 'api/vote', {
          poll_id: pollData._id
        }).then(res => {
          if (res.data.success) {
            this.hasVoted = res.data.hasVoted
          }
          this.poll = pollData
        }).catch(() => {
          alert('Error! Please try again.')
        })
      }).catch(() => {
        alert('Error! Please try again.')
      })
    }
  }
</script>

<style>

</style>

