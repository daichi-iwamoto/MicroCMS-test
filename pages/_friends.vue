<template>
  <div class="container">
    <select class="links" @change="jump">
      <option hidden>おともだち を えらぼう！</option>
      <option v-for="friend of friends" :key="friend.id" :value="`../${friend.dir}`">{{ friend.title }}</option>
    </select>
    <input type="checkbox" id="toggle" hidden>
    <label class="cardlabel" for="toggle">
      <div class="card">
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
    </label>
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
  },
  methods: {
    jump (e) {
      location.href = e.target.value
    }
  }
}
</script>

<style lang="scss">
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
    width: 400px;
    border-radius: 10px;
    box-shadow: 0px 3px 10px rgba(0,0,0,0.5);
    transform: rotateY(180deg);
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
      }
      border-radius: 10px;
    }
    .Fcard{
      border-radius: 8px;
      padding: 15px;
      background: #2d3436;
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
  #toggle:checked+.cardlabel{
    .card{
      animation-name: open;
      animation-duration: 1s;
      animation-fill-mode: forwards;
      animation-delay: 500ms;
      .Bcard{
        img{
          animation-name: upindex;
          animation-duration: 1s;
          animation-fill-mode: forwards;
          animation-delay: 500ms;
        }
      }
    }
  }
}
@keyframes open {
  0%{
    transform: rotateY(180deg);
  }
  100%{
    transform: rotateY(0deg);
  }
}
@keyframes upindex {
  0%{
    z-index: 0;
  }
  100%{
    z-index: -1;
  }
}
</style>
