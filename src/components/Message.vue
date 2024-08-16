<script setup lang="ts">

</script>

<template>
	<div class="message" ref="MessageElement">
		<slot class="text"></slot>
	</div>
</template>

<style scoped>
.message {
	color: white;
	font-size: 22px;
	font-family: "Monospace";
}
.message::selection {
	color: black;
	background: white;
}
</style>
