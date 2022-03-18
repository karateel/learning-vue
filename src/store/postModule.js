import axios from 'axios';

export const postModule = {
  state: () => ({
    posts: [
    ],
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
  }),
  getters: {
    sortedPosts(state){
      return [state.posts].sort((post1, post2) =>
        post1[state.selectedSort]?.localeCompare(post2[state.selectedSort])
      )
    },
    sortedAndSearchedPosts(state, getters){
      return getters.sortedPosts.filter(post => post.title.toLowerCase().includes(state.searchQuery.toLowerCase()))
    }
  },
  mutations: {
    // setPosts(state){
    //   // state.posts = posts;
    // },
    setLoading(state, bool){
      state.isPostLoading = bool
    },
    setPage(state, page){
      state.page = page
    },
    setSelectedSort(state, selectedSort){
      state.selectedSort = selectedSort
    },
    setTotalPage(state, totalPages){
      state.totalPages = totalPages
    },
    setSearchQuery(state, searchQuery){
      state.searchQuery = searchQuery
    },
  },
  actions: {
    async fetchPost({state, commit}){
      try{
        commit('setLoading', true)
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts?', {
          params:{
            _page: state.page,
            _limit: state.limit
          }
        });
        commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit))
        commit('setPosts', response.data)
      } catch(e){
        alert('Error')
      } finally {
        commit('setLoading', false)
      }
    },
    async loadMorePots({state, commit}){
      try{
        commit('setPage', state.page + 1)
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts?', {
          params:{
            _page: state.page,
            _limit: state.limit
          }
        });
        commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit))
        commit('setPosts', [...state.posts, ...response.data])
      } catch(e){
        alert('Error')
      }
    }
  }
}