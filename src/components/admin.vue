<template>
	<div id="admin">
		<div class="content">
			<aAside/>
			<div class="main">
				<aHeader/>
				<router-view/>
			</div>
		</div>
	</div>
</template>

<script>
import aHeader from './aHeader.vue'
import aAside from './aAside.vue'
export default {
	name: 'admin',
	components: { aHeader, aAside }
}
</script>

<style scoped>
#admin{
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
}
.main {
	position: absolute;
	top: 0;
	left: 210px;
	right: 0;
	bottom: 0;
}
</style>
