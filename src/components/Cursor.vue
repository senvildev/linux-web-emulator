<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";

import Message from "./Message.vue";

// allowed signs for input
const ALLOWED_CHARACTERS : string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()`~-=_+[]{};'|,./?\"\\\<\> ";

// required emits to handle entering commands
const emit = defineEmits<{
	(e: "ranCommand", val: string) : void
}>();

// required for the shell so it looks somewhat realistic
let User : Ref<string> = ref("user");
let CurrentDirectory : Ref<string> = ref("~");
let IsSuperuser : Ref<boolean> = ref(false);
let Command : Ref<string> = ref("");
let CursorBlink : Ref<boolean> = ref(true)

// determine if its sent to pause the components functionality
let sent : boolean = true;

// handles pressed keys
function handle_keys(event : array) : void {
	// get the key
	const key : string = event.key;
	// check if the key is allowed
	if (ALLOWED_CHARACTERS.includes(key)) {
		Command.value += key; // adds the key if its valid
	} else if (key == "Backspace") {
		// remove the last character if its backspace
		Command.value = Command.value.slice(0, Command.value.length - 1);
	} else if (key == "Enter") {
		// if sent then send message and stop the functionality
		destroy()
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
		<Message id="cursor">[{{User}}@portfolio {{ CurrentDirectory }}]{{ IsSuperuser ? "#" : "$" }}
		{{ Command + (CursorBlink ? "_" : "") }}
		</Message>
	</div>
</template>

<style scoped>
div.main {
	white-space: pre;
}
</style>
