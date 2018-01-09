<template>
  <div class="comment">
      <comment-form @addComment="addComment"></comment-form>
      <comment-List :List="List"/>
      <pagination @transferPage="getPage" :totalCount="totalCount" :currentPage="currentPage"/>
  </div>
</template>
<style>

</style>
<script>
import CommentForm from './CommentForm.vue';
import CommentList from './CommentList.vue';
import Pagination from './Pagination.vue';
export default {
    data(){
        return {
            totalCount:0,
            currentPage:1,
            pageSize:3,
            totalData:[],
            List:[]
        }
    },
  components:{
      Pagination,
      CommentForm,
      CommentList
  },
  methods:{
      // 子组件向父组件的数据提交
      addComment(msg) {
          console.log(msg);
          this.totalData.push({text:msg});
          this.totalCount = this.totalData.length;
          if(this.totalCount <= this.pageSize) {
              this.List = this.totalData
          } else {
              this.List = this.totalData.slice(this.totalCount - this.pageSize)
          }
          this.currentPage = 1;
          // reverse方法，反过来
          this.List.reverse();
          // 数据驱动界面
          // 单向数据绑定 v-bind:(数据) = ""
          // data -> template
          // 双向数据绑定 input -> data 
          // data <=> template 性能差些
      },
      getPage(curr,size) {
          this.currentPage = curr;
          if(this.totalCount <= this.pageSize) {
              this.List = this.totalData;
          } else {
              let pages = Math.ceil(this.totalCount / this.pageSize);
              let res = this.totalCount % this.pageSize;
              let start = this.totalCount - this.currentPage * this.pageSize;
              if(start < 0) start = 0;
              this.List = this.totalData.slice(start,start + this.pageSize)
          }
          this.List.reverse();
      }
  }
}
</script>
