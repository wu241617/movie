<template>
	<div id="main">
		<Loading v-if="isLoading"></Loading>
		<Scroll v-else>
			<ul>
				<li v-for="(data,index) in cinemaList" :key="data.id">
					<h3>{{data.nm}}<strong>{{data.tag.hallType[1]}}</strong></h3>
					<p>{{data.addr}}</p><span>{{data.distance}}</span>
					<p>
						<button v-for="(num,key) in data.tag" v-if="num===1" :key="key" :class="key | classCard">{{key | formatCard}}</button>
					</p>
				</li>
			</ul>
		</Scroll>
	</div>
</template>

<script>
	export default {
		name:"PinPai",
		data(){
			return {
				cinemaList:[],
				isLoading:true,
				prevCityId:-1
			}
		},
		activated(){
			
			var cityId = this.$store.state.id;
			if(cityId === this.prevCityId){ return; }
			this.isLoading=true;
			
			this.axios.get('/api/cinemaList?cityId='+cityId).then((res)=>{
				var msg = res.data.msg;
				if(msg === 'ok'){
					this.isLoading=false;
					this.cinemaList = res.data.data.cinemas;
					this.prevCityId = cityId;
				}
			});
		},
		filters:{
			formatCard(key){
				var card = [
					{key:'allowRefund',value:'改签'},
					{key:'endorse',value:'退款'},
					{
						key:'sell',value:'折扣卡'
					},
					{key:'snack',value:'小吃'}
				];
				for(var i=0; i<card.length; i++){
					if(card[i].key === key){
						return card[i].value;
					}
				}
				return '';
			},
			classCard(key){
				var card = [
					{key:'allowRefund',value:'or'},
					{key:'endorse',value:'or'},
					{
						key:'sell',value:'bl'
					},
					{key:'snack',value:'bl'}
				];
				for(var i=0; i<card.length; i++){
					if(card[i].key === key){
						return card[i].value;
					}
				}
				return '';
			}
		}
	}
</script>

<style scoped="scoped">
	*{
		margin:0;
		padding:0;
	}
	html,
	body {
	  height: 100%;
	  width: 100%;
	}
	html{
		font-size:20px;
	}
	body{
		position:relative;
	}
	#main{
		position:absolute;
		top:5rem;
		left:0;
		width:100%;
		height:20rem;
	}
	ul{
		width:100%;
		height:auto;
	}
	ul li{
		min-height:5.5rem;
		width:91%;
		/* margin:0.7rem 0; */
		border-bottom:1px solid black;
		cursor:pointer;
		padding:0 1rem;
	}
	h3,p{
		margin:1.2rem 0;
		text-overflow: ellipsis;
		white-space: nowrap; 
		overflow: hidden;
	}
	strong{
		color:rgba(255,0,0,0.8);
	}
	span{
		float:right;
		color:red;
	}
	button{
		width:3rem;
		height:1.2rem;
		line-height:1.2rem;
		margin:0 0.5rem;
		background-color:white;
		cursor:pointer;
	}
	
	.bl{
		border:0.05rem solid #f60;
		color:#f60;
	}
	
	.or{
		border:0.05rem solid blue;
		color:blue;
	}
</style>

