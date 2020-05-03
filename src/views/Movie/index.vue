<template>
	<div>
		<Header></Header>
		<ul>
			<router-link to="/movie/city" tag="li"city="city"><i class="el-icon-location"></i><span>{{$store.state.nm}}</span></router-link>
			<router-link to="/movie/nowPlaying" tag="li"><i class="el-icon-view"></i>正在热映</router-link>
			<router-link to="/movie/commingSoon" tag="li"><i class="el-icon-video-play"></i>即将上映</router-link>
			<router-link to="/movie/search" tag="li"><i class="el-icon-search"></i>搜索</router-link>
		</ul>
		<keep-alive>
			<router-view @event="updateCity($event)"></router-view>
		</keep-alive>
		<Footer></Footer>
		<router-view name="detail"></router-view>
	</div>
</template>

<script>
	import Footer from '@/components/footer.vue'
	import Header from '@/components/header.vue'
	import {messageBox} from '@/components/JS'

	export default {
		name: 'movie',
		components: {
			Header,
			Footer
		},
		data(){
			return {
				city:'城市'
			}
		},
		methods:{
			updateCity(data){
				console.log("hello");
				this.city=data;
			}
		},
		mounted(){
			setTimeout(()=>{
				this.axios.get('/api/getLocation').then((res)=>{
					var msg = res.data.msg;
					if(msg === 'ok'){
						
						var nm = res.data.data.nm;
						var id = res.data.data.id;
						if(this.$store.state.id == id){
							return;
						}
						messageBox({
							title:'城市定位',
							content:nm,
							cancel:'取消',
							ok:'切换定位',
							handleCancel(){},
							handleOk(){
								window.localStorage.setItem('nowNm',nm);
								window.localStorage.setItem('nowId',id);
								window.location.reload();
							}
						});
					}
					
				});
			},3000);
	
		}
	}
</script>

<style scoped="scoped">
	* {
		margin: 0;
		padding: 0;
	}
	
	html,
	body {
		height: 100%;
		width: 100%;
	}
	
	html {
		font-size: 20px;
	}
	
	body {
		position: relative;
	}
	ul{
		display:flex;
		width:100%;
		height:2rem;
		position:fixed;
		top:3rem;
		left:0;
		list-style:none;
		z-index: 999;
		background-color:lightblue; 
	}
	ul li{
		flex:1;
		height:2rem;
		line-height:2rem;
		text-align:center;
		cursor:pointer;
	}
	
	ul li.router-link-active{
		border-bottom:0.1rem solid red;
	}
	@media (max-width:320px) {
		ul{
			font-size:0.9rem;
		}
	}
</style>
