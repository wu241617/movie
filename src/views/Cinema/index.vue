<template>
	<div>
		<Header title="喵喵影院"></Header>
			<ul>
				<router-link tag="li" to="/cinema/quanCheng">全城<i class="el-icon-caret-bottom"></i></router-link>
				<router-link tag="li" to="/cinema/pinPai">品牌<i class="el-icon-caret-bottom"></i></router-link>
				<router-link tag="li" to="/cinema/teSe">特色<i class="el-icon-caret-bottom"></i></router-link>
			</ul>
			<keep-alive>
				<router-view></router-view>
			</keep-alive>
		<Footer></Footer>
	</div>
</template>

<script>
	import Footer from '@/components/footer.vue'
	import Header from '@/components/header.vue'

	export default {
		name: 'cinema',
		components:{
			Header,
			Footer
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
	ul{
		position:fixed;
		top:3rem;
		left:0;
		list-style:none;
		width:100%;
		height:2rem;
		display:flex;
		background-color:lightblue;
		z-index: 999;
	}
	ul li{
		flex:1;
	    height:2rem;
		line-height:2rem;
		text-align:center;
	}
	ul li.router-link-active{
		border-bottom:0.1rem solid red;
	}
</style>
