<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from "vue";
import type { Ref } from "vue";

import Message from "./Message.vue";

// allowed signs for input
const ALLOWED_CHARACTERS : string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()`~-=_+[]{};:'|,./?\"\\\<\> ";

// required emits to handle entering commands
const emit = defineEmits<{
	(e: "ranCommand", val: string) : void
}>();

// required for the shell so it looks somewhat realistic
const props = defineProps<{ content: string }>();
let User : Ref<string> = ref("user");
let CurrentDirectory : Ref<string> = ref("~");
let IsSuperuser : Ref<boolean> = ref(false);
let Command : Ref<string> = ref("");
let CursorBlink : Ref<boolean> = ref(true)
let CursorText : Ref<string> = ref(``);

CursorText.value = `[${User.value}@portfolio ${CurrentDirectory.value}]${IsSuperuser.value ? "$" : "#"} `;

// determine if its sent to pause the components functionality
let sent : boolean = true;

// handles pressed keys
async function handle_keys(event : array) : void {
	// get the key
	const key : string = event.key;
	// check if the key is allowed
	if (ALLOWED_CHARACTERS.includes(key) && !event.ctrlKey) {
		Command.value += key; // adds the key if its valid
		event.preventDefault();
	} else if (key == "Backspace") {
		// remove the last character if its backspace
		Command.value = Command.value.slice(0, Command.value.length - 1);
	} else if (key == "Enter") {
		// if sent then send message and stop the functionality
		destroy()
	} else if (event.ctrlKey) {
		if (key == "v") {
			try {
				const clipboard_data = await navigator.clipboard.readText()
				Command.value += clipboard_data;
			} catch (error) { console.warn("couldnt paste") }
		}
	}
}

// handles sent commands
function destroy() : void {
	clearInterval(cursor_blinker, handle_keys); // stops cursor blinking
	CursorBlink.value = false; // disables the cursor blink
	removeEventListener('keydown', handle_keys); // stops listening for keys
	// emits the command
	emit("ranCommand", Command.value);
}

addEventListener("keydown", handle_keys); // listens for keys

// blinks the cursor every 500ms
const cursor_blinker : void = setInterval(() => {
	CursorBlink.value = !CursorBlink.value;
}, 500);

</script>

<template>
	<div class="main">
		<Message class="cursor">
		{{ props.content ? props.content : CursorText }}{{ Command + (CursorBlink ? "_" : "") }}
		</Message>
	</div>
</template>

<style scoped>
div.main {
	white-space: pre; display: inline;
}
</style>
