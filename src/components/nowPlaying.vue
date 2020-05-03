<template>
	<div id="main" ref="movie_body">
		<Loading v-if="isLoading"></Loading>
		<Scroll v-else :handleToScroll="handleToScroll" :handleToTouchEnd="handleToTouchEnd">
			<ul>
				<div id="first">{{pullDownMsg}}</div>
				<li v-for="(data,index) in movieList" :key="data.id">
					<img :src="data.img | setWH('100.140')" alt="图片加载失败!" @tap="handleToDetail(data.id)">
					<div id="text">
						<h3  @tap="handleToDetail(data.id)">{{data.nm}}</h3>
						<p>放映次数<strong> {{data.wish}} </strong> 次</p>
						<p>主演:{{data.star}}</p>
						<p>上映时间:{{data.comingTitle}}</p>
					</div>
					<button>购票</button>
				</li>
			</ul>
		</Scroll>
		
	</div>

</template>

<script>
	//import BScroll from 'better-scroll';

	export default {
		name: "NowPlaying",
		data() {
			return {
				movieList: [],
				pullDownMsg: '',
				isLoading:true,
				prevCityId:-1
			}
		},
		activated() {
			
			var cityId = this.$store.state.id;
			if(this.prevCityId === cityId){ return; }
			this.isLoading=true;
			
			this.axios.get('/api/movieOnInfoList?cityId='+cityId).then((res) => {
				var msg = res.data.msg;
				if (msg === 'ok') {
					this.movieList = res.data.data.movieList;
					this.isLoading = false;
					this.prevCityId = cityId;
					/* this.$nextTick(() => {
						var scroll = new BScroll(this.$refs.movie_body, {
							tap: true,
							probeType: 1
						});

						scroll.on('scroll', (pos) => {
							if (pos.y > 30) {
								this.pullDownMsg = '正在更新中...'
							}
						});

						scroll.on('touchEnd', (pos) => {
							if (pos.y > 30) {
								this.axios.get('/api/movieOnInfoList?cityId=10').then((res) => {
									var msg = res.data.msg;
									if (msg === 'ok') {
										this.pullDownMsg='已更新完毕!'
										setTimeout(()=>{
											this.movieList = res.data.data.movieList;
											this.pullDownMsg='';
											
										},1000)
									}
								});
							}
							
						});

					});*/

				}
			});
		},
		methods: {
			handleToDetail(movieId) {
				this.$router.push("/movie/detail/"+movieId);
			},
			handleToScroll(pos){
				if(pos.y > 30){
					this.pullDownMsg = '正在更新中...';
				}
			},
			handleToTouchEnd(pos){
				if (pos.y > 30) {
					this.axios.get('/api/movieOnInfoList?cityId=10').then((res) => {
						var msg = res.data.msg;
						if (msg === 'ok') {
							this.pullDownMsg='已更新完毕!'
							setTimeout(()=>{
								this.movieList = res.data.data.movieList;
								this.pullDownMsg='';
								
							},1000)
						}
					});
				}
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
		height: 20rem;
	}

	#first {
		margin-top: 1rem;
		text-align: center;
		border:0;
	}

	ul {
		width: 100%;
		min-height: 10rem;
		list-style: none;
	}

	ul li {
		min-height: 8rem;
		padding: 3%;
		width: 94%;
		border-bottom: 0.05rem solid black;
		cursor: pointer;
	}

	ul li img {
		width: 25%;
		height: 7rem;
	}

	ul li img,
	ul li #text {
		float: left;
	}

	strong {
		color: #f60;
		font-style: italic;
	}

	ul li #text {
		margin: 0 0.5rem;
		width: 55%;
		min-height: 7.5rem;
		text-overflow: ellipsis;
		white-space: nowrap; 
		overflow: hidden;
	}

	ul li #text p {
		color: #666;
		margin: 0.2rem 0;
		font-size: 0.9rem;
	}

	#text h3 {
		font-size: 1.1rem;
	}

	ul li button {
		float: right;
		color: white;
		background-color: red;
		border: 0;
		width: 14%;
		height: 2rem;
		margin-top: 1.5rem;
		cursor: pointer;
	}
</style>
