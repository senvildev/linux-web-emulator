import { markRaw } from "vue";
import Message from "../components/Message.vue";
import Cursor from "../components/Cursor.vue";

const WORKING_COMMANDS : array = [
	"balls", "clear"
];

function CREATE_MESSAGE(History, text) {
	History.value.push({component: markRaw(Message), content: text });
}

function CREATE_CURSOR(History) {
	History.value.push({component: markRaw(Cursor)});
}

const COMMAND_FUNCTIONS : object = {
	"balls": (History) => {
		CREATE_MESSAGE(History, "hello balls");
	},
	"clear": (History) => {
		History.value = [];
	}
}

function command_handler(command : string, History : array) {
	command = command.trim();

	if (command != "") {
		if (WORKING_COMMANDS.includes(command))
			COMMAND_FUNCTIONS[command](History);
		else {
			CREATE_MESSAGE(History, `bash: ${command}: no such command`);
		}
	}

	setTimeout(() => {
		CREATE_CURSOR(History);
	});
}

export {
	command_handler
}
