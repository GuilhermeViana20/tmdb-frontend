import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Movie from '@/views/Movie.vue'
import Search from '@/views/Search.vue'
import Genres from '@/views/Genres.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
  },
  {
    path: '/genres',
    name: 'Genres',
    component: Genres
  },
  {
    path: '/movie/:id',
    name: 'Movie',
    component: Movie,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
