<template>
  <div id="order">
    <p>空空如也</p>
    <e-item  @click.native="toChat(v)" :data="v" v-for="(v,k) in userList" :key="k" ></e-item>
  </div>
</template>

<script>
  export default {
    name: 'order',
    components: {
    },
    data() {
      return {
      }
    },
    methods: {
    }
  }
</script>