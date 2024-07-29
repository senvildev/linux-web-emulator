<script setup lang="ts">
import Message from "./Message.vue";
import { ref } from "vue";
import type { Ref } from "vue";

const ALLOWED_CHARACTERS : string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()`~-=_+[]{};'|,./?\"\\\<\> ";

const emit : Ref<any> = defineEmits(["ranCommand"]);

let User : Ref<string> = ref("user");
let CurrentDirectory : Ref<string> = ref("~");
let IsSuperuser : Ref<boolean> = ref(false);
let Command : Ref<string> = ref("");
let CursorBlink : Ref<boolean> = ref(true)

let sent : boolean = true;

function handle_keys(event : array) : void {
	const key : string = event.key;
	if (ALLOWED_CHARACTERS.includes(key)) {
		Command.value += key;
	} else if (key == "Backspace") {
		Command.value = Command.value.slice(0, Command.value.length - 1);
	} else if (key == "Enter") {
		destroy()
	}
}

function destroy() : void {
	clearInterval(cursor_blinker, handle_keys);
	CursorBlink.value = false;
	removeEventListener('keydown', handle_keys);

	emit("ranCommand", Command.value);
}

addEventListener("keydown", handle_keys);

const cursor_blinker : void = setInterval(() => {
	CursorBlink.value = !CursorBlink.value;
}, 500);

</script>

<template>
	<div class="main">
		<Message id="cursor">
		[{{User}}@portfolio {{ CurrentDirectory }}]{{ IsSuperuser ? "#" : "$" }}
		{{ Command + (CursorBlink ? "_" : "") }}
		</Message>
	</div>
</template>
