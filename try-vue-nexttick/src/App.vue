<template>
  <div id="app">
    <div>姓名:{{name}}</div>
    <ul ref="movies">
      <li v-for="item in movies" :key="item.id">{{item.title}}</li>
    </ul>
  </div>
</template>
<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'app',
  data() {
    return {
      name:'',
      movies:[]
    }
  },
  beforeCreate() {
    this.$nextTick(() => {
      this.name = '峰峰';
      // console.log('峰峰');
    });
  },
  mounted(){
    // console.log('aa')
    this.name = '旅梦开发团';
    fetch('https://www.easy-mock.com/mock/5a09867f28b23066479b8365/ajaxData/movie#!method=get')
    .then(data => data.json())
    .then(result => {
      this.movies = result.subjects;
      // console.log(this.$refs.movies);
      // this.$refs.movies.getElementsByTagName('li')[0].style.color = 'red'; 
      this.$nextTick(() => {
        this.$refs.movies.getElementsByTagName('li')[0].style.color = 'red';
      });
    })
    .catch(err => {
      console.log(err);
    })
  },
  components:{

  }
}
</script>
<style>

</style>