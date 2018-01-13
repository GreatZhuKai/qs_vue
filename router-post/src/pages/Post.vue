<template>
  <div class="post">
      <div v-if="loading" class="loading">Loading</div>
      <div v-if="error" class="error">{{error}}</div>
      <!-- 包着动画部分 -->
      <transition name="slide">
          <div v-if="post" class="content">
              <h2>{{post.title}}</h2>
              <p>{{post.body}}</p>
          </div>
      </transition>
  </div>
</template>
<script>
import {getPost} from '@/api'
export default {
  data() {
      return {
          loading:false,
          error:null,
          post:null
      }
  },
  created() {
      // 请求数据   
      this.fetchData()
  },
  // 监听路由改变
  watch:{
      '$route':'fetchData'
  },
  methods:{
      fetchData() {
          this.error = this.post = null
          this.loading = true
          getPost(this.$route.params.id,(err,post) => {
              this.loading = false
              if(err) {
                  this.error = err.toString()
              } else {
                  this.post = post
                //   console.log(post)
              }
          })
      }
  }
}
</script>

<style>
.loading {
    position: absolute;
    top: 10px;
    right: 10%;
}
.error {
    color:red;
}
.content {
    transition: all .35s ease;
    position: absolute;
}
.slide-enter {
    opacity: 0;
    transform: translate(30px,0);
}
.slide-leave-active {
    opacity: 0;
    transform: translate(-30px,0);
}
</style>
