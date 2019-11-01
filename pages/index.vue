<template>
  <div class="container">
    <select class="links" @change="jump">
      <option hidden>おともだち を えらぼう！</option>
      <option v-for="friend of friends" :key="friend.id" :value="friend.dir">{{ friend.title }}</option>
    </select>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  computed: {
    ApiFlag () { return this.$store.state.friends.ApiFlag },
    friends () { return this.$store.state.friends.friend }
  },
  mounted () {
    // 一度も取得していなければAPI通信
    if (this.ApiFlag === false) {
      axios.get('https://mcmstest.microcms.io/api/v1/test', {
        headers: { 'X-API-KEY': 'a8b319a1-39ab-45e9-b184-b797538a384a' }
      })
        .then((res) => {
          console.log(res.data.contents)
          this.$store.commit('friends/FlagChange')
          this.$store.commit('friends/getFriends', res.data.contents)
        })
    }
  },
  methods: {
    jump (e) {
      location.href = e.target.value
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #dfe6e9;
  flex-wrap: wrap;
  width: 400px;
}
.links{
  width: 250px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #dfe6e9;
  color: #2d3436;
  border-radius: 5px;
}
</style>
