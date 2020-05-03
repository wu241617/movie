<template>
	<div class="messageBox">
		<h3>{{title}}</h3>
		<p><i class="el-icon-location"></i>{{content}}</p>
		<hr>
		<div>
			<button @touchstart="handleCancel">{{cancel}}</button>
			<button  @touchstart="handleOk">{{ok}}</button>
		</div>
	</div>
</template>

<script>
	export default {
		name:'MessageBox'
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
	.messageBox{
		width:13rem;
		height:11rem;
		border:0.1rem solid lightblue;
		border-radius: 0.4rem;
		position:fixed;
		top:50%;
		left:50%;
		margin-left:-7.5rem;
		margin-top:-6.5rem;
		box-shadow:0.3rem 0.6rem 0.6rem 0.3rem #999; 
		padding:1rem;
		background-color:white;
	}
	h3{
		width:100%;
		height:2.5rem;
		line-height:2.5rem;
		text-align:center;
		background-color:#F2F8FE;
		box-shadow:0.2rem 0.2rem 0.2rem 0.2rem lavender;
		color:#666;
	}
	p{
		margin:1.5rem 0;
		text-align:center;
		border:none;
	}
	hr{
		margin-bottom:2rem;
		border:0.05rem solid #999;
	}
	button{
		display:block;
		width:40%;
		height:2rem;
		line-height:2rem;
		border:0;
		background-color:#F2F8FE;
		box-shadow:0.2rem 0.2rem 0.2rem 0.2rem lavender;
		color:black;
		cursor:pointer;
		font-weight:#666;
	}
	button:nth-child(1){
		float:left;
	}
	button:nth-child(2){
		float:right;
	}
</style>
