<template>
	<div id="admin">
		<Header :state="false"/>
		<div class="content">
			<aAside/>
			<div class="main">
				<router-view/>
			</div>
		</div>
	</div>
</template>

<script>
import Header from './header.vue'
import aAside from './aAside.vue'
export default {
	name: 'admin',
	components: { Header, aAside }
}
</script>

<style scoped>
.main {
	position: absolute;
	top: 40px;
	left: 140px;
	right: 0;
	bottom: 0;
}
</style>
