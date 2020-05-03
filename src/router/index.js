import Vue from 'vue'
import VueRouter from 'vue-router'
import Movie from '../views/Movie/index.vue'
import Mine from '../views/Mine/index.vue'
import Cinema from '../views/Cinema/index.vue'
import City from '@/components/city.vue'
import CommingSoon from '@/components/commingSoon.vue'
import NowPlaying from '@/components/nowPlaying.vue'
import Search from '@/components/search.vue'
import QuanCheng from '@/components/quanCheng.vue'
import PinPai from '@/components/pinPai.vue'
import TeSe from '@/components/teSe.vue'
import Detail from '@/components/detail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/movie',
    component: Movie,
	children:[
		{
			path:'/movie/city',
			component:City
		},
		{
			path:'/movie/commingSoon',
			component:CommingSoon
		},
		{
			path:'/movie/nowPlaying',
			component:NowPlaying 
		},
		{
			path:'/movie/search',
			component:Search
		},
		{
			path:'/movie/detail/:movieId',
			components:{
				detail:Detail
			},
			props:{
				detail:true
			}
		},
		{
			path:'/movie/',
			redirect:'/movie/nowPlaying'
		}
	]
  },
  {
    path: '/mine',
    component: Mine
  },
  {
    path: '/cinema',
    component: Cinema,
	children:[
		{
			path:"/cinema/quancheng",
			component:QuanCheng
		},
		{
			path:"/cinema/pinPai",
			component:PinPai
		},
		{
			path:"/cinema/teSe",
			component:TeSe
		},
		{
			path:"/cinema/",
			redirect:"/cinema/pinPai"
		}
	]
  },
  {
	path: '/',
	redirect:'/movie'
  }
]

const router = new VueRouter({
  routes
})

export default router
