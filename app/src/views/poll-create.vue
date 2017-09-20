<template>
  <div class="row">
    <div class="col-lg-offset-2 col-lg-8">
      <form class="form-horizontal">
        <fieldset>
          <legend>Create a new Poll</legend>
          <div class="form-group">
            <label class="col-lg-4 control-label">Title</label>
            <div class="col-lg-8 input-group">
              <textarea class="form-control" placeholder="Title of Poll" rows="3" v-model="form.title"></textarea>
            </div>
          </div>
          <div class="form-group" v-for="(i, index) in form.options.length" :key="i">
            <label class="col-lg-4 control-label">Option {{i}}</label>
            <div class="col-lg-8 input-group">
              <input class="form-control" type="text" placeholder="Option text" v-model="form.options[index]">
              <span class="input-group-btn">
                <button class="btn btn-danger" type="button" @click="removeOption(index)" :disabled="!isRemoveableOption">X</button>
              </span>
            </div>
          </div>
          <div class="form-group">
            <div class="col-lg-offset-4 col-lg-8">

            </div>
          </div>
          <div class="form-group">
            <div class="col-lg-8 col-lg-offset-4">
              <button class="btn btn-success" type="button" @click="create" :disabled="!isFormValid">Create Poll</button>
              <button type="button" class="btn btn-primary" @click="addOption">Add more option</button>
              <router-link class="btn btn-default" to="/home">Cancel</router-link>
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
          options: ['', '']
        }
      }
    },
    watch: {},
    computed: {
      ...mapGetters(['getAPI']),
      isRemoveableOption () {
        return this.form.options.length > 2
      },
      isFormValid () {
        return this.form.title.length > 6 && this.form.options.filter((item) => {
          return item.length > 3
        }).length > 1
      }
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
      },
      removeOption (index) {
        this.form.options.splice(index, 1)
      },
      addOption () {
        this.form.options.push('')
      }
    }
  }
</script>

<style>
  textarea.form-control {
    overflow: hidden;
  }
</style>

