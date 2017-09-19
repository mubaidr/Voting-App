<template>
  <div class="row">
    <div class="col-lg-offset-2 col-lg-8">
      <form class="form-horizontal">
        <fieldset>
          <legend>Create a new Poll</legend>
          <div class="form-group">
            <label class="col-lg-4 control-label">Title</label>
            <div class="col-lg-8">
              <textarea class="form-control" placeholder="Title of Poll" rows="3" v-model="form.title"></textarea>
            </div>
          </div>
          <div class="form-group" v-for="i in form.options.length" :key="i">
            <label class="col-lg-4 control-label">Option {{i}}</label>
            <div class="col-lg-8">
              <input class="form-control" type="text" placeholder="Option text" v-model="form.options[i]">
            </div>
          </div>
          <div class="form-group">
            <div class="col-lg-8 col-lg-offset-4">
              <a class="btn btn-default" href="/home">Cancel</a>
              <button class="btn btn-primary" type="button" @click.prevent.stop="create">Create</button>
            </div>
          </div>
        </fieldset>
      </form>
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
        form: {
          title: '',
          options: ['yes', 'no', 'maybe']
        }
      }
    },
    computed: {
      ...mapGetters(['getAPI'])
    },
    methods: {
      create () {
        axios.post(this.getAPI.url + 'api/polls', this.form).then(res => {
          if (res.data.success) {
            router.push('poll/' + res.data.poll._id)
          } else {
            alert(res.data.error)
          }
        }).catch(() => {
          alert('Error! Please try again.')
        })
      }
    }
  }
</script>

<style>
  textarea.form-control {
    overflow: hidden;
  }
</style>

