<template>
  <div>
    <header></header>
    <div class="container">
      <transition appear :name="transitionName" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
    <footer></footer>
  </div>
</template>

<script>
  import header from './layout/header.vue'
  import footer from './layout/footer.vue'

  export default {
    data () {
      return {
        transitionName: 'slide-up'
      }
    },
    components: {
      header,
      footer
    },
    watch: {
      '$route' (to, from) {
        const toDepth = to.path.split('/').length
        const fromDepth = from.path.split('/').length
        if (toDepth === fromDepth) {
          this.transitionName = 'slide-up'
        } else {
          this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
        }
      }
    }
  }
</script>

<style lang="scss"></style>
