import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import discover from '@/views/discover'
import songList from '@/views/songList'
import mvList from '@/views/mvList'
import searchMusic from '@/views/searchMusic'
import songList_detail from '@/views/songList_detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: '/discover',
      component: Home,
      children: [
        {
          path: '/songList',
          name: 'songList',
          component: songList
        },
        {
          path: '/discover',
          name: 'discover',
          component: discover
        },
        {
          path: '/mvList',
          name: 'mvList',
          component: mvList
        },
        {
          path: '/searchMusic',
          name: 'searchMusic',
          component: searchMusic
        },
        {
          path: '/songList_detail',
          name: 'songList_detail',
          component: songList_detail
        }
      ]
    }
  ]
})
