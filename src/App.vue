<template>
  <div id="app">
	<keep-alive>
		 <router-view/>
	</keep-alive>
  </div>
</template>

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
</style>
