<script setup lang="ts">
import { ref, onMounted } from "vue";

// reference to the element
const MessageElement : Ref<HTMLElement> = ref(null);

// after the component finishes loading
onMounted(() => {
	// get the element
	const element : HTMLElement = MessageElement.value;
	
	// stop if it is a cursor
	if (element.id == "cursor") return 0;

	// get its content
	const content : string = element.innerHTML;
	// split for hyperlinks
	const hyperlink_split : string[] = content.split("|@|");
	// prepare a string for the final content
	let final_content : string = "";
	// check if it has a hyperlink
	if (hyperlink_split.length > 1) {
		for (const hyperlink of hyperlink_split) {
			// split the hyperlink format
			const split_hyperlink_content : array = hyperlink.split("|");
			if (split_hyperlink_content.length > 1) {
				// create <a> element with link and given text in the hyperlink format
				final_content +=
					`<a href="${split_hyperlink_content[1]}" target="_blank">${split_hyperlink_content[0]}</a>`;
			} else final_content += split_hyperlink_content[0]; // i forgor
		}
	} else final_content = content; // else set it to the normal content
	// overwrite the inner html
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
