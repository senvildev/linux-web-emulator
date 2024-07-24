<template>
	<div class="message">
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
