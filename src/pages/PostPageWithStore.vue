<template>
  <div>
    <h1>{{ $store.state.posts.limit }}</h1>
<!--    <h1>Post page</h1>-->
<!--    <my-input-->
<!--      v-focus-->
<!--      v-model="searchQuery"-->
<!--      placeholder="Searching"-->
<!--    />-->
<!--    <div class="app_btns">-->
<!--      <my-button-->
<!--        @click="showDialog">-->
<!--        Create post-->
<!--      </my-button>-->
<!--      <my-select-->
<!--        v-model="selectedSort"-->
<!--        :options="sortOption"-->
<!--      />-->
<!--    </div>-->
<!--    <my-dialog-->
<!--      v-model:show="dialogVisible">-->
<!--      <post-form-->
<!--        @create="createPost"-->
<!--      />-->
<!--    </my-dialog>-->
<!--    <post-list-->
<!--      :posts="sortedAndSearchedPosts"-->
<!--      @remove="removePost"-->
<!--      v-if="!isPostLoading"-->
<!--    />-->
<!--    <div v-else>-->
<!--      Loading-->
<!--    </div>-->
<!--    <div v-intersection="loadMorePots" class="observer"></div>-->
    <!--    <div class="page__wrapper">-->
    <!--      <div v-for="pageNumber in totalPage"-->
    <!--        :key="pageNumber"-->
    <!--        class="page"-->
    <!--        :class="{-->
    <!--          'current-page': page === pageNumber-->
    <!--        }"-->
    <!--        @click="changePage(pageNumber)"-->
    <!--      >-->
    <!--        {{ pageNumber }}-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>

<script>
// import PostForm from '@/components/PostForm';
// import PostList from '@/components/PostList';
// import MyButton from '@/components/UI/MyButton';
import axios from 'axios'
// import MyInput from '@/components/UI/MyInput';

export default {
  // components: { MyInput, MyButton, PostList, PostForm },
  data(){
    return {
      posts: [
      ],
      dialogVisible: false,
      isPostLoading: false,
      selectedSort: '',
      searchQuery: '',
      page: 1,
      limit: 10,
      totalPage: 0,
      sortOption: [
        {value: 'title', name: 'By name'},
        {value: 'body', name: 'By body'},
      ]
    }
  },
  methods: {
    createPost(post){
      this.posts.push(post)
      this.dialogVisible = false;
    },
    removePost(post){
      this.posts =  this.posts.filter(p => p.id !== post.id)
    },
    showDialog(){
      this.dialogVisible = true;
    },
    // changePage(pageNumber){
    //   this.page = pageNumber
    // },
    async fetchPost(){
      try{
        this.isPostLoading = true
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts?', {
          params:{
            _page: this.page,
            _limit: this.limit
          }
        });
        this.totalPage = Math.ceil(response.headers['x-total-count'] / this.limit)
        this.posts = response.data
      } catch(e){
        alert('Error')
      } finally {
        this.isPostLoading = false
      }
    },
    async loadMorePots(){
      try{
        this.page +=1
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts?', {
          params:{
            _page: this.page,
            _limit: this.limit
          }
        });
        this.totalPage = Math.ceil(response.headers['x-total-count'] / this.limit)
        this.posts = [...this.posts, ...response.data]
      } catch(e){
        alert('Error')
      }
    }
  },
  mounted() {
    // this.fetchPost();
    // this.$refs.observer
    // const options = {
    //   rootMargin: '8px',
    //   threshold: 1.0
    // }
    // const callback = (entries) => {
    //   if(entries[0].isIntersecting && this.page < this.totalPage){
    //     this.loadMorePots()
    //   }
    // }
    // const observer = new IntersectionObserver(callback, options)
    // observer.observe(this.$refs.observer)

  },
  computed: {

  },
  watch:{
    // page(){
    //   this.fetchPost()
    // }
  }
};
</script>

<style>

.app_btns{
  margin: 15px 0px;
  display: flex;
  justify-content: space-between;
}
.page__wrapper{
  display: flex;
  margin-top: 15px;
}
.page{
  border: 1px solid black;
  padding: 10px;
}
.current-page{
  border: 2px solid green
}
.observer {
  height: 30px;
  background: green
}
</style>