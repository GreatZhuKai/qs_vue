<template>
  <div id="app">
    <el-badge class="item" :value="1" :max="9">
      <el-button size="medium" @click="addComment" nativeType="submit">评论</el-button>
    </el-badge>
    <el-badge class="item" :value="1" :max="9" isDot>
      <el-button :disabled="saveDisabled" @click="doSave" size="small" type="primary">发布</el-button>
    </el-badge>
    <el-badge class="item" :value="10" :max="9">
      <el-button size="mini" type="text">前往</el-button>
    </el-badge>
  </div>
</template>

<script>
import ElBadge from '@/components/ElBadge'
import ElButton from '@/components/ElButton'
import HelloWorld from './components/HelloWorld'

export default {
  data() {
    return {
      saveDisabled:false
    }
  },
  name: 'app',
  mounted() {
    setTimeout(() => {this.saveDisabled = true},5000)
  },
  methods:{
    addComment() {
      console.log("添加评论")
    },
    doSave() {
      console.log('发布')
    }
  },
  components: {
    ElButton,
    ElBadge
  }
}
</script>

<style>

</style>
