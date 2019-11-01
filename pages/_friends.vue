<template>
  <div class="container">
    <select class="links" @change="jump">
      <option hidden>おともだち を えらぼう！</option>
      <option v-for="friend of friends" :key="friend.id" :value="`../${friend.dir}`">{{ friend.title }}</option>
    </select>
    <div class="card" @click="open=!open" :class="{active:open}">
      <div class="Bcard">
        <img src="~/assets/yumaruou.jpg" alt="遊〇王">
      </div>
      <div class="Fcard">
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
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      title: '',
      mainv: '',
      body: '',
      open: false
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
  },
  methods: {
    jump (e) {
      location.href = e.target.value
    }
  }
}
</script>

<style lang="scss">
$Cwidth: 400px;
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
  transform-style: preserve-3d;
  transform:translate3d(0,0,0);
  perspective: 800px;
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
  .card{
    position: relative;
    background: #2d3436;
    width: $Cwidth;
    height: calc(#{$Cwidth} * 1.58928571429);
    border-radius: 10px;
    box-shadow: 0px 3px 10px rgba(0,0,0,0.5);
    transform: rotateY(180deg);
    transition-duration: 1s;
    .Bcard{
      img{
        border-radius: 8px;
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 72px;
        transition-delay: 300ms;
        transform: rotateY(180deg);
      }
      border-radius: 10px;
    }
    .Fcard{
      border-radius: 8px;
      padding: 15px;
      background: #2d3436;
      height: 100%;
      .title{
        width: 100%;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .mainv{
        width: 100%;
        height: 40%;
        img{
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 10px;
        }
      }
      .contents{
        width: 100%;
        margin: 20px 0 10px;
        border: solid 1px #dfe6e9;
        border-radius: 5px;
        h2{
          background: #dfe6e9;
          color: #2d3436;
          padding: 5px 0;
        }
        p{
          padding: 20px 0;
        }
      }
    }
  }
  .card.active{
    transform: rotateY(0deg);
    .Fcard{
      z-index: 0;
    }
    .Bcard{
      img{
        opacity: 0;
      }
    }
  }
}
</style>
