// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import VueRouter from 'vue-router'
import App from './App'
// import ElementUI from 'element-ui'
import '../node_modules/element-ui/lib/theme-chalk/index.css'
// import Post from '@/pages/Post.vue'

// Vue.use(VueRouter)
// Vue.use(ElementUI)
Vue.config.productionTip = false
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})


// const Home = {template:'<div>home</div>'}
// const router = new VueRouter ({
//   mode:'history',
//   base:__dirname,
//   routes:[
//     {
//       path:'/',
//       component:Home
//     },
//     {
//       path:'/post/:id',
//       component:Post
//     }
//   ]
// })
/* eslint-disable no-new */
// new Vue({
//   // el: '#app',
//   router,
//   template:`
//   <div id="app">
//     <h1>Data Fetching</h1>
//     <ul>
//     <li><router-link to="/">/</router-link></li>
//       <li><router-link to="/post/1">/post/1</router-link></li>
//       <li><router-link to="/post/2">/post/2</router-link></li>
//       <li><router-link to="/post/3">/post/3</router-link></li>
//     </ul>
//     <router-view class="view"></router-view>
//   </div>`,
//   // template: '<App/>',
//   components: { App }
// }).$mount('#app')
