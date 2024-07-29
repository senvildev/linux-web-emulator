<script setup lang="ts">
import { ref, onMounted } from "vue";
const MessageElement : Ref<HTMLElement> = ref(null);

onMounted(() => {
	const element : HTMLElement = MessageElement.value;
	if (element.id == "cursor") return 0;
	const content : string = element.innerHTML;
	const check_for_hyperlink : array = content.split("|@|");
	let final_content : string = "";
	if (check_for_hyperlink.length > 1) {
		for (const hyperlink of check_for_hyperlink) {
			const split_hyperlink : array = hyperlink.split("|");
			if (split_hyperlink.length > 1) {
				final_content +=
					`<a href="${split_hyperlink[1]}" target="_blank">${split_hyperlink[0]}</a>`;
			} else final_content += split_hyperlink[0];
		}
	} else final_content = content;

	element.innerHTML = final_content;
});
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
