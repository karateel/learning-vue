import Main from '@/pages/Main';
import { createRouter, createWebHistory } from 'vue-router'
import PostPage from '@/pages/PostPage';
import About from '@/pages/About';
import PostIdPage from '@/pages/PostIdPage';
import PostPageWithStore from '@/pages/PostPageWithStore';


const routes = [
  {
    path: '/',
    component: Main
  },
  {
    path: '/posts',
    component: PostPage
  },
  {
    path: '/about',
    component: About
  },
  {
    path: '/posts/:id',
    component: PostIdPage
  },
  {
    path: '/store',
    component: PostPageWithStore
  }
]

const router = createRouter({
  routes,
  history: createWebHistory(),
})

export default router