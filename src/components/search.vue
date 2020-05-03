<template>
	<div id="main">
		<div id="top">
			<div id="search">
				<input type="text" v-model="message">
				<i class="el-icon-search"></i> 
			</div>
			<h4>电影/电视剧/综艺</h4>
		</div>
		
		
		<ul>
			<li v-for="(data,index) in moviesList" :key="data.id">
				<img :src="data.img | setWH('100.140')" alt="图片加载失败!">
				<div id="text">
					<h3>{{data.nm}}</h3>
					<p>影片效果<strong>{{data.ver}}</strong></p>
					<p>主演:{{data.star}}</p>
					<p>{{data.pubDesc}}</p>
				</div>
				<button>预售</button>
			</li>
			
		</ul>
	</div>
</template>

<script>
	export default {
		name:"Search",
		data(){
			return {
				message:"",
				moviesList:[]
			}
		},
		methods:{
			cancelRequest(){//防抖策略
				if(typeof this.source === 'function'){
					this.source('终止请求');
				}
			}
		},
		watch:{
			message:function(val){
				var that = this;
				var cityId = this.$store.state.id;
				this.cancelRequest();
				
				this.axios.get('/api/searchList?cityId='+cityId+'&kw='+val,{
					cancelToken:new this.axios.CancelToken(function(c){
						that.source = c;
					})
				}).then((res)=>{
					var msg = res.data.msg;
					var movies = res.data.data.movies;
					if(msg && movies){
							this.moviesList = res.data.data.movies.list;
					}
				}).catch(err=>{
					if(this.axios.isCancel(err)){
						console.log('Request canceled',err.message);
					}else{
						console.log(err);
					}
				})
			}
		}
	}
</script>

<style scoped="scoped">
	*{
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
		min-height: 40rem;
	}
	#main #top{
		position:fixed;
		top: 5rem;
		left: 0; 
		width: 100%;
		background-color: #E6F1FE;
	}
	h4{
		border-bottom:0.05rem solid #999;
		border-top:0.05rem solid #999;
		padding:1rem;
		color:#666;
	}
	i{
		width:15%;
		height:1.6rem;
		line-height:1.6rem;
		text-align: center;
		color:#666;
		font-size:1rem;
		font-weight:bold;
		cursor:pointer;
		background-color:red;
		color:white;
		float:left;
	}
	#main ul {
		width: 100%;
		min-height: 10rem;
		list-style: none;
		position:absolute;
		top:12.6rem;
		left:0;
		z-index:-1;
	}
	
	ul li {
		min-height: 8rem;
		padding:3%;
		width: 93%;
		margin: 0.5rem 0;
		border-bottom: 1px solid #999;
		cursor:pointer;
	}
	ul li img{
		width:25%;
		height:7rem;
	}
	ul li img,ul li #text{
		float:left;
	}
		
	ul li h3{
		font-size:1rem;
	}
	ul li p{
		font-size:0.9rem;
	}
	strong{
		color:#f60;
		font-style:italic;
	}
	ul li #text{
		margin:0 3%;
		width:55%;
		text-overflow: ellipsis;
		white-space: nowrap; 
		overflow: hidden;
	}
	ul li #text p{
		color:#666;
		margin:0.2rem 0;
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
		height:5rem;
		border-bottom:0;
	}
	#search{
		width:84%;
		height:3rem;
		padding:5% 8% 0 8%;
	}
	#search input{
		width:75%;
		height:1.4rem;
		float:left;
	}
	
</style>
