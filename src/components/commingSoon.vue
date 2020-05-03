<template>
	<div id="main">
		<Loading v-if="isLoading"></Loading>
		<Scroll v-else>
			<ul>
				<li v-for="data in comingList" :key="data.id">
					<img :src="data.img | setWH('100.140')" alt="图片加载失败!"  @tap="handleToDetail(data.id)">
					<div id="text">
						<h3  @tap="handleToDetail(data.id)">{{data.nm}}</h3>
						<p>期待观看人数: <strong> {{data.wish}} </strong></p>
						<p>主演:{{data.star}}</p>
						<p>上映时间:{{data.comingTitle}}</p>
					</div>
					<button>预售</button>
				</li>
			</ul>
		</Scroll>
		
	</div>
</template>

<script>
	export default {
		name:"CommingSoon",
		data(){
			return {
				comingList:[],
				isLoading:true,
				prevCityId:-1
			}
		},
		activated(){
			
			var cityId = this.$store.state.id;
			if(this.prevCityId === cityId){ return; }
			this.isLoading = true;
			
			this.axios.get('/api/movieComingList?cityId='+cityId).then((res)=>{
				var msg = res.data.msg;
				if(msg === 'ok'){
					this.isLoading=false;
					this.comingList = res.data.data.comingList;
					this.prevCityId = cityId;
				}
			});
		},
		methods:{
			handleToDetail(movieId){
				this.$router.push("/movie/detail/"+movieId);
			}
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
	
	#main {
		position: absolute;
		top: 5rem;
		left: 0;
		width: 100%;
		height:20rem;
	}
	ul {
		width: 100%;
		height: auto;
	}
	
	ul li {
		min-height: 8rem;
		padding:3%;
		width: 94%;
		border-bottom: 1px solid black;
		cursor:pointer;
	}
	ul li img{
		width:25%;
		height:7rem;
	}
	ul li img,ul li #text{
		float:left;
	}
	strong{
		color:#f60;
		font-style:italic;
	}
	ul li #text{
		margin:0 0.5rem;
		width:55%;
	}
	ul li #text p{
		color:#666;
		margin:0.2rem 0;
		font-size:0.9rem;
		text-overflow: ellipsis;
		white-space: nowrap; 
		overflow: hidden; 
	}
	#text h3{
		font-size:1.1rem;
	}
	ul li button{
		float:right;
		color:white;
		background-color:deepskyblue;
		border:0;
		width:14%;
		height:2rem;
		margin-top:1.5rem;
		cursor:pointer;
	}
	ul #last{
		text-align:center;
		color:#666;
		height:1rem;
	}
</style>
