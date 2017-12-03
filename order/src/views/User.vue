<template>
  <div id="user">
    {{state}}
  </div>
</template>

<script>
  export default {
    name: 'user',
    components: {},
    data() {
      return {}
    },
    computed: {
      state() {
        return this.$store.state.user.userInfo
      }
    },
    methods: {}
  }
</script>