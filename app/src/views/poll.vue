<template>
  <div class="row">
    <div class="col-lg-offset-2 col-lg-8">
      <div class="panel panel-primary" v-if="poll">
        <div class="panel-heading">
          <h3 class="panel-title">{{poll.title}}</h3>
        </div>
        <div class="panel-body">
          <hr/>
          <div class="radio" v-for="option in poll.options" :key="option">
            <label>
              <input type="radio" name="optionsRadios" :value="option" @click="addVote(option)"> {{option}}
            </label>
          </div>
          <hr/>
          <span class="text-muted text-small">Created on: {{new Date(poll.created_at).toDateString()}}</span>
        </div>
      </div>
      <div class="progress progress-striped active" v-else>
        <div class="progress-bar" style="width: 45%"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import axios from 'axios'

  export default {
    data () {
      return {
        poll: null
      }
    },
    computed: {
      ...mapGetters(['getAPI'])
    },
    methods: {
      addVote (opt) {
        alert(opt)
      }
    },
    mounted () {
      let id = this.$route.params.id

      axios.get(this.getAPI.url + 'api/polls/' + id).then(res => {
        this.poll = res.data
      }).catch(() => {
        alert('Error! Please try again.')
      })
    }
  }
</script>

<style>

</style>

