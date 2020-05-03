<template>
	<div id="detail" class="slide-enter-active">
		<div id="header">
			<h1>
			  <span>影片详情</span>
			</h1>
			 <i class="el-icon-arrow-left" @touchstart="handleToBack"></i>
		</div>
		 <Loading v-if="isLoading"></Loading>
		 <div class="main" v-else>
			 <div class="top" >
				 <img :src="detailMovie.img | setWH('100.200')" alt="图片加载失败!">
				 <div class="right">
					 <h2>{{detailMovie.nm}}</h2>
					 <p>{{detailMovie.enm}}</p>
					 <p>{{detailMovie.scoreLabel}}</p>
					 <p>{{detailMovie.cat}}/{{detailMovie.oriLang}}</p>
					 <p>{{detailMovie.src}}/{{detailMovie.dur}}分钟</p>
					 <p>{{detailMovie.star}}</p>
					 <p>{{detailMovie.pubDesc}}</p>
				 </div>
			 </div>
		     
			 <div class="jianjie">
				 {{detailMovie.dra}}
			 </div> 
			 
			 <div class="detail_player swiper-container" ref="detail_player">
				 <ul class="swiper-wrapper">
					 <li v-for="(item,index) in detailMovie.photos" :key="index" class="swiper-slide">
						 <div>
							 <img :src="item | setWH('100.150')" alt="图片加载失败!">
						 </div>
					 </li>
				 </ul>
				 
			 </div>
			 
		 </div>
	</div>
</template>

<script>
	
	import Swiper from 'swiper'
	// import style
	import 'swiper/css/swiper.css'
	
	export default {
		name:"Detail",
		props:['movieId'],
		data(){
			return {
				detailMovie:{},
				isLoading:true
			}
		},
		methods:{
			handleToBack(){
				this.$router.back();
			}
		},
		mounted(){
			this.axios.get('/api/detailmovie?movieId='+this.movieId).then((res)=>{
				var msg = res.data.msg;
				if(msg === 'ok'){
					this.isLoading=false;
					this.detailMovie = res.data.data.detailMovie;
					this.$nextTick(()=>{
						new Swiper(this.$refs.detail_player,{
							slidesPerView:'auto',
							freeMode:true,
							freeModeSticky:true
						})
					});
				}
			});
		}
	}
</script>

<style scoped="scoped">
	*{
		margin:0;
		padding:0;
	}
	html,body{
		height:100%;
		width:100%;
	}
	html{
		font-size:20px;
	}
	#detail{
		width:100%;
		min-height:100%;
	}
	#detail #header{
		position:fixed;
		top:0;
		left:0;
		z-index:2000;
		height:3rem;
		width:100%;
	}
	
	h1{
		height:3rem;
		line-height:3rem;
		background-color:brown;
		color:white;
		font-size:1.5rem;
		text-align:center;
		position:relative;
	}
	i{
		color:white;
		font-size:1.5rem;
		position:absolute;
		top:0.9rem;
		left:0;
	}
	.main{
		position:absolute;
		top:3rem;
		left:0;
		z-index:1999;
		width:100%;
		min-height:43rem;
	    background-color:beige;
	}
	
	.top{
		width:90%;
		height:15rem;
		padding:5%;
		position:relative;
		/* background-size: 100% 100%; */
		background-color:rgba(0,0,0,.6);
	}

	img{
		display:block;
		width:40%;
		height:14rem;
		float:left;
		border:0.1rem solid white;
	}
	.right{
		width:50%;
		float:right;
		color:white;
	}
	h2{
		font-size:1.25rem;
		min-height:2.5rem;
		line-height:2.5rem;
		text-overflow: ellipsis;
		white-space: nowrap; 
		overflow: hidden;
	}
	p{
		width:100%;
		color:beige;
		height:1.7rem;
		line-height:1.7rem;
		font-size:0.9rem;
		text-overflow: ellipsis;
		white-space: nowrap; 
		overflow: hidden;
	}
	.jianjie{
		width:90%;
		min-height:5rem;
		padding:5%;
		text-indent: 2rem;
	}
	.slide-enter-active{
		animation: 0.3s slideMove;
	}
	@keyframes slideMove{
		0%{transform:translateX(100%);}
		100%{transform:translateX(0%);}
	}
	.detail_player .swiper-slide{
		width:8rem;
		margin-right:1rem;
		text-align:center;
		font-size:1rem;
		list-style:none;
		margin-bottom:1rem;
	}
	.detail_player .swiper-slide img{
		width:100%;
		height:6rem;
		margin-bottom:0.3rem;
	}
</style>
