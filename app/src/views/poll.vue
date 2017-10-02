<template>
  <div class="row">
    <div class="col-lg-offset-2 col-lg-8">
      <div class="panel panel-primary" v-if="poll">
        <div class="panel-heading">
          <h3 class="panel-title">{{poll.title}}</h3>
        </div>
        <div class="panel-body" v-show="!hasVoted">
          <div class="radio" v-for="option in poll.options" :key="option">
            <label>
              <input type="radio" name="optionsRadios" :value="option" @click="addVote(option)"> {{option}}
            </label>
          </div>
          <hr/>
          <span>Created on: {{new Date(poll.created_at).toDateString()}}</span>
          <br/>
          <span>Total Votes: {{poll.vote_stats.total}}</span>
        </div>
        <div class="panel-body" v-show="hasVoted">
          <canvas ref="myChart" width="400" height="400"></canvas>
        </div>
        <div class="panel-body" v-if="poll.created_by==getUser.data._id">
          <button type="button" class="btn btn-danger btn-sm" @click="deletePoll">Delete</button>
        </div>
      </div>
      <div class="progress progress-striped active" v-else>
        <div class="progress-bar" style="width: 100%"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Chart } from 'chart.js'
  import router from '../utilities/router'
  import { mapGetters } from 'vuex'
  import axios from 'axios'

  export default {
    data () {
      return {
        poll: null,
        hasVoted: null
      }
    },
    watch: {
      'hasVoted' (val) {
        if (val) {
          this.loadChart()
        }
      }
    },
    computed: {
      ...mapGetters(['getAPI', 'getUser'])
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
      },
      deletePoll () {
        axios.delete(this.getAPI.url + 'api/polls/' + this.poll._id).then(() => {
          router.push('/polls')
        }).catch(() => {
          alert('Error! Please try again.')
        })
      },
      loadChart () {
        let myPieChart = new Chart(this.$refs.myChart, {
          type: 'doughnut',
          data: {
            labels: this.poll.options,
            datasets: [{
              backgroundColor: [
                "#2ecc71",
                "#3498db",
                "#95a5a6",
                "#9b59b6",
                "#f1c40f",
                "#e74c3c",
                "#34495e"
              ],
              data: this.poll.vote_stats.options
            }]
          }
        });
      }
    },
    mounted () {
      let id = this.$route.params.id

      axios.get(this.getAPI.url + 'api/polls/' + id).then(res => {
        let pollData = res.data

        axios.get(this.getAPI.url + 'api/vote/' + pollData._id).then(res => {
          this.poll = pollData

          this.$nextTick(() => {
            if (res.data.success) {
              this.hasVoted = res.data.hasVoted
            }
          })

        }).catch(() => {
          alert('Error! Please try again.')
        })
      }).catch(() => {
        alert('Error! Please try again .')
      })
    }
  }
</script>

<style>

</style>

