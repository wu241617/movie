<template>
	<div>
		<Header title="我的喵喵"></Header>
		<Login></Login>
		<Footer></Footer>
	</div>
</template>

<script>
	import Footer from '@/components/footer.vue'
	import Header from '@/components/header.vue'
	import Login  from '@/components/login.vue'

	export default {
		name: 'mine',
		components:{
			Header,
			Footer,
			Login
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
		top:3rem;
		left:0;
		width:100%;
		min-height:40rem;
	}
	ul{
		width:100%;
		height:auto;
	}
	ul li{
		height:4rem;
		line-height:4rem;
		width:100%;
		text-align:center;
		margin:0.7rem 0;
		border-bottom:1px solid black;
		color:red;
		background-color:lightblue;
		cursor:pointer;
	}
</style>
