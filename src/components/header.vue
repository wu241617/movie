<template>
	<header id="header">
		<slot></slot>
		<h1>{{title}}</h1>
	</header>
</template>

<script>
	export default {
		name: 'Header',
		props:{
			title:{
				type:String,
				default:"喵喵电影"
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
	#header {
		position: fixed;
		top: 0;
		left: 0;
		height: 3rem;
		width: 100%;
		z-index: 999;
	}

	#header h1 {
		height: 3rem;
		line-height: 3rem;
		font-size:1.4rem;
		text-align: center;
		background-color:brown;
		color: white;
	}
</style>
