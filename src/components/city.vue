<template>
	<div id="main" style="top:5rem">
		<Loading v-if="isLoading"></Loading>
		<Scroll ref="city_list" v-else>
			<div id="body">
				<h4>热门城市</h4>
				<div class="city" id="city1">
					<span :key="data.id" v-for="(data,index) in hostList" @tap="toggle(data.nm,data.id)">
						{{data.nm}}
					</span>
				</div>

				<div ref="city_sort">
					<div :key="item.id" v-for="(item,index) in cityList">
						<h4>{{item.index}}</h4>
						<div class="city">
							<p v-for="(itemList,index) in item.list" :key="itemList.id"  @tap="toggle(itemList.nm,itemList.id)">{{itemList.nm}}</p>
						</div>
					</div>
				</div>

			</div>
		</Scroll>
		<div id="aside">
			<ul>
				<li :key="data.id" v-for="(data,index) in cityList" @touchstart="handleToIndex(index)">
					{{data.index}}
				</li>
			</ul>
		</div>

	</div>
</template>

<script>
	export default {
		name: "City",
		data() {
			return {
				cityList: [],
				hostList: [],
				isLoading: true
			}
		},
		mounted() {

			var cityList = window.localStorage.getItem('cityList');
			var hostList = window.localStorage.getItem('hostList');

			if (cityList && hostList) {
			   this.isLoading=false;
               this.cityList = JSON.parse(cityList);
               this.hostList = JSON.parse(hostList);
			} else {
				this.axios.get('/api/cityList').then((res) => {
					var msg = res.data.msg;
					if (msg === 'ok') {
						this.isLoading = false;
						var cities = res.data.data.cities;
						//[{index:'A',list:[{nm:'ad',id:12}]}]
						var {
							cityList,
							hostList
						} = this.formatCityList(cities);
						this.cityList = cityList;
						this.hostList = hostList;
						window.localStorage.setItem('cityList', JSON.stringify(cityList));
						window.localStorage.setItem('hostList', JSON.stringify(hostList));
						hostList
					}
				});
			}

		},
		methods: {

			formatCityList(cities) {
				var cityList = [];
				var hostList = [];

				for (var i = 0; i < cities.length; i++) {
					if (cities[i].isHot === 1) {
						hostList.push(cities[i]);
					}
				}

				for (var i = 0; i < cities.length; i++) {
					var firstLetter = cities[i].py.substring(0, 1).toUpperCase();
					if (toCom(firstLetter)) { //新添加index
						cityList.push({
							index: firstLetter,
							list: [{
								nm: cities[i].nm,
								id: cities[i].id
							}]
						});

					} else { //累加到已有的index中
						for (var j = 0; j < cityList.length; j++) {
							if (cityList[j].index === firstLetter) {
								cityList[j].list.push({
									nm: cities[i].nm,
									id: cities[i].id
								});
							}

						}
					}
				}

				cityList.sort((n1, n2) => {
					if (n1.index > n2.index) {
						return 1;
					} else if (n1.index < n2.index) {
						return -1;
					} else {
						return 0;
					}
				})

				function toCom(firstLetter) {
					for (var i = 0; i < cityList.length; i++) {
						if (cityList[i].index === firstLetter) {
							return false;
						}
					}
					return true;
				}

				return {
					cityList,
					hostList
				}
			},

			handleToIndex(index) {
				var h4 = this.$refs.city_sort.getElementsByTagName("h4");
				this.$refs.city_list.toScrollTop(-h4[index].offsetTop);
			},

			toggle(nm,id) {
				this.$store.commit('CITY_INFO',{nm,id});
				window.localStorage.setItem('nowNm',nm);
				window.localStorage.setItem('nowId',id);
				this.$router.push('/movie/nowPlaying');
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

	#body {
		background-color: lavenderblush;
	}

	h4 {
		width: auto;
		height: 2.2rem;
		line-height: 2.2rem;
		font-size: 0.9rem;
		padding-left: 1rem;
		background-color: #D9D9D9;
		margin: 1rem 0;
	}

	.city {
		min-height: 2rem;
		padding: 0 2rem;
	}

	span {
		display: block;
		width: 23%;
		height: 2rem;
		text-align: center;
		line-height: 2rem;
		background-color: white;
		margin:2% 5%;
		cursor: pointer;
	}

	span:hover {
		box-shadow: 0.2rem 0.4rem 0.4rem 0.2rem gray;
	}

	#city1 {
		display: flex;
		flex-wrap: wrap;
	}

	p {
		margin: 0.5rem 0;
		cursor: pointer;
	}

	#aside {
		width: 6%;
		height: 38rem;
		position: fixed;
		top: 5rem;
		right: 0;
		background-color: white;
	}

	#aside ul {
		list-style: none;
	}

	#aside ul li {
		color: black;
		width: 100%;
		height: 1.5rem;
		line-height: 1.5rem;
		text-align: center;
		cursor: pointer;
	}

	#aside ul li:hover,
	span:hover,
	p:hover {
		color: red;
	}
	@media (max-width:320) {
		#aside ul li{
			height: 1rem;
			line-height: 1rem;
		}
	}
</style>
