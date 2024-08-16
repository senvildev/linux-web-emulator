<script setup lang="ts">
// required import to update the component list
import { Utilities, History } from "../assets/utilities.ts";
import { onMounted, ref } from "vue"

import { command_handler } from "../assets/commands.ts";

const utilities = new Utilities();

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
	//utilities.create_message("welcome to my portfolio!");
	//utilities.create_message("type `help` and press enter to get a list of commands");
	utilities.create_cursor("");
});
</script>

<template>
	<div class="main" ondragstart="return false;"
		v-for="item in History"
	>
		<component :is="item.component" @ran-command="handle_command" :content="item.content">
			<template #default>
			<div v-html="item.content"></div>
			</template>
		</component>
	</div>
</template>

<style scoped>
div.main {
	width: 100%;
}
</style>
