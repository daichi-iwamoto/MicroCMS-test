<template>
  <div class="container">
    <div class="links">
      <nuxt-link v-for="friend of friends" :key="friend.id" :to="friend.dir">{{ friend.title }}</nuxt-link>
    </div>
    <div class="card">
      <h1 class="title">
        {{ title }}
      </h1>
      <div class="mainv">
        <img :src="mainv.url" alt="メイン画像">
      </div>
      <div class="contents">
        <h2>プロフィール</h2>
        <span v-html="body" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      title: '',
      mainv: '',
      body: ''
    }
  },
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
  async asyncData ({ store, params, error, payload }) {
    // payloadでデータを受け取った場合
    if (payload) {
      alert(payload)
      return {
        title: payload.title,
        mainv: payload.mainv,
        body: payload.body
      }
    } else {
      let Ftitle
      let Fmainv
      let Fbody
      // API通信済みでない場合
      if (store.state.friends.ApiFlag === false) {
        await axios.get('https://mcmstest.microcms.io/api/v1/test', {
          headers: { 'X-API-KEY': 'a8b319a1-39ab-45e9-b184-b797538a384a' }
        })
          .then((res) => {
            res.data.contents.map((friend) => {
              if (friend.dir === params.friends) {
                Ftitle = friend.title
                Fmainv = friend.mainv
                Fbody = friend.body
              }
            })
          })
        // API通信済みの場合
      } else {
        store.state.friends.friend.map((friend) => {
          if (friend.dir === params.friends) {
            Ftitle = friend.title
            Fmainv = friend.mainv
            Fbody = friend.body
          }
        })
      }
      return {
        title: Ftitle,
        mainv: Fmainv,
        body: Fbody
      }
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
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.links a{
    width: 130px;
    height: 35px;
    background: #dfe6e9;
    color: #2d3436;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    margin: 10px;
    border-radius: 5px;
}
.card{
  background: #2d3436;
  width: 400px;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0px 3px 10px rgba(0,0,0,0.5);
}
.title{
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.mainv{
  width: 100%;
}
img{
  width: 100%;
  border-radius: 10px;
}
.contents{
  width: 100%;
  margin: 20px 0 10px;
  border: solid 1px #dfe6e9;
  border-radius: 5px;
}
.contents h2{
  background: #dfe6e9;
  color: #2d3436;
  padding: 5px 0;
}
.contents p{
  padding: 20px 0;
}
</style>
