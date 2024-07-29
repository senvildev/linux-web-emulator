<script setup lang="ts">
import Message from "./Message.vue";
import Cursor from "./Cursor.vue";

import { onMounted, ref, markRaw, watch } from "vue"

import {
	command_handler,
	CREATE_CURSOR, CREATE_MESSAGE
} from "../assets/commands.ts";

const emit = defineEmits<{
	(e: "ranCommand", val: string) : void
}>();

const History : Ref<array> = ref([]);

function handle_command(command : string) : void {
	command_handler(History, command);
}

onMounted(() => {
	CREATE_MESSAGE(History, "welcome to my portfolio!");
	CREATE_MESSAGE(History, "type `help` and press enter to get a list of commands");
	CREATE_CURSOR(History);
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
