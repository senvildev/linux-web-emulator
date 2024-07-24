<script setup lang="ts">
import Message from "./Message.vue";
import Cursor from "./Cursor.vue";

import { defineEmits, onMounted, ref, markRaw, watch } from "vue"

import { command_handler } from "../assets/commands.ts";

const emit = defineEmits<{
	(e: "ranCommand", val: string) : void
}>();

const History = ref([]);

function handle_command(command : string) : void {
	command_handler(command, History)
}

onMounted(() => {
	History.value.push({component: markRaw(Message), content: "welcome to my portfolio" });
	History.value.push({component: markRaw(Cursor)});
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
