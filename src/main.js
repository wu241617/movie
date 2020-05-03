import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//导入组件库
import ElementUI from 'element-ui';
//导入组件相关样式
import 'element-ui/lib/theme-chalk/index.css';
//配置Vue插件
Vue.use(ElementUI);

import Scroll from '@/components/scroll.vue'
Vue.component('Scroll',Scroll);

import Loading from '@/components/loading.vue'
Vue.component('Loading',Loading);

//添加全局过滤器，处理图片路径问题
Vue.filter('setWH',(url,arg)=>{
	return url.replace(/w\.h/,arg);
});

import axios from 'axios'
Vue.prototype.axios = axios;

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
