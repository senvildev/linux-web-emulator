<script setup lang="ts">
// required import to update the component list
import { History } from "../assets/logging.ts";

import { onMounted, ref } from "vue"

import {
	CREATE_CURSOR, CREATE_MESSAGE
} from "../assets/logging.ts";

import { command_handler } from "../assets/commands.ts";

// emit required to handle entered commands
const emit = defineEmits<{
	(e: "ranCommand", val: string) : void
}>();

// after a command has been entered
function handle_command(command : string) : void {
	command_handler(command);
}

// after the component finishes loading
onMounted(() => {
	CREATE_MESSAGE("welcome to my portfolio!");
	CREATE_MESSAGE("type `help` and press enter to get a list of commands");
	CREATE_CURSOR();
});
</script>

<template>
	<div class="main" ondragstart="return false;"
		v-for="item in History"
	>
		<component :is="item.component" @ran-command="handle_command">
			{{ item.content }}
		</component>
	</div>
</template>

<style scoped>
div.main {
	width: 100%;
}
</style>
