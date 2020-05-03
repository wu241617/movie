<template>
	<div id="main">
		<div id="login">
			<input type="text" placeholder="账户名/手机号/Email">
			<input type="password" placeholder="请输入您的密码">
			<button>登录</button>
			<p>
				<span>立即注册</span>
				<span>忘记密码</span>
			</p>
		</div>
		
	</div>
</template>

<script>
	export default {
		name:"Login"
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
	#main{
		width:100%;
		height:10rem;
	}
	#main #login{
		width:100%;
		height:10rem;
		position:fixed;
		top:3rem;
		left:0;
	}
	#main input{
		width:80%;
		height:2rem;
		line-height:2rem;
		margin:6% 10%;
		border:0;
		border-bottom:0.05rem solid #666;
	} 
	button{
		width:80%;
		height:2.5rem;
		line-height:2.5rem;
		margin:6% 10%;
		text-align:center;
		background-color:brown;
		color:white;
		border:0;
		cursor:pointer;
	}
	span{
		display:block;
		margin:1rem;
		color:red;
		cursor:pointer;
	}
	span:nth-child(1){
		float:left;
	}
	span:nth-child(2){
		float:right;
	}
</style>
