<template>
	<footer id="footer">
		<ul>
			<!-- tag="li"渲染成li -->
		<router-link to='/movie' class="link" tag="li">
					<i class="el-icon-orange"></i>电影</router-link>
		<router-link to='/cinema' class="link" tag="li">
					<i class="el-icon-video-camera-solid"></i>影院</router-link>
		<router-link to='/mine' class="link" tag="li">
					<i class="el-icon-user-solid"></i>我的</router-link>
		</ul>
	</footer>
</template>

<script>
	export default {
		name: 'Footer'
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

	#footer {
		position: fixed;
		bottom: 0;
		left: 0;
		height: 3rem;
		width: 100%;
		z-index: 999;
		background-color:white;
	}

	ul {
		width: 100%;
		height: 3rem;
		display: flex;
		list-style: none;
		border-top:0.05rem solid #999;
	}

	ul li:nth-child(1) {
		border-left: 0;
	}

	ul li {
		width: auto;
		flex: 1;
		height: 3rem;
		line-height: 3rem;
		text-align: center;
	}

	.link {
		text-decoration: none;
		font-size: 1rem;
		color: black;
		cursor:pointer;
	}
    /*vue-router自带的一个类.router-link-active  */
	ul li.router-link-active{
		color:red;
	}
</style>
