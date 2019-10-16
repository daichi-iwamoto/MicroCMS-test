<template>
  <div class="container">
    <div class="links">
      <nuxt-link to="/Chiba">チバニャン</nuxt-link>
      <nuxt-link to="/Hamagishi">ハマギシマン</nuxt-link>
      <nuxt-link to="/Shimizu">清水パイセン</nuxt-link>
      <nuxt-link to="/Dodo">DoDoさん</nuxt-link>
      <nuxt-link to="/Hashimoto">ハシモトサン</nuxt-link>
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
  async asyncData () {
    const { data } = await axios.get('https://mcmstest.microcms.io/api/v1/test', {
      headers: { 'X-API-KEY': 'a8b319a1-39ab-45e9-b184-b797538a384a' }
    })
    return {
      title: data.contents[0].title,
      mainv: data.contents[0].mainv,
      body: data.contents[0].body
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
