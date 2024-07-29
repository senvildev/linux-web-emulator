import { markRaw } from "vue";
import Message from "../components/Message.vue";
import Cursor from "../components/Cursor.vue";

function CREATE_MESSAGE(History : array, text : string) : void {
	History.value.push({component: markRaw(Message), content: text });
}

function CREATE_CURSOR(History : array) : void {
	History.value.push({component: markRaw(Cursor)});
}

const COMMAND_FUNCTIONS : object = {
	"balls": [(History : array) => {
		CREATE_MESSAGE(History, "hello balls");
	}, "test command"],
	"clear": [(History : array) => {
		History.value = [];
	}, "clears the terminal screen"],
	"help": [(History : array, options : array) => {
		if (options.length < 1) {
			CREATE_MESSAGE(History, "use \"help <command>\" for detailed info on using the specified command");
			for (const command in COMMAND_FUNCTIONS)
				CREATE_MESSAGE(History, `${command} - ${COMMAND_FUNCTIONS[command][1]}`);
		} else {
			for (const option of options) {
				let found : boolean = false;
				for (const command in COMMAND_FUNCTIONS)
					if (command.startsWith(option)) {
						CREATE_MESSAGE(History, `${command} - ${COMMAND_FUNCTIONS[command][1]}`);
						found = true; 
					}
				if (!found)
					CREATE_MESSAGE(History, `bash: help: no matches found for "${option}"`);
			}
		}
	}, "shows the help menu"],
	"git": [(History : array, options : array) => {
		CREATE_MESSAGE(History, "marketplace - lorem ipsum [|@|click me|https://google.com/|@|]");
	}, "my projects from github"],
	"echo": [(History : array, options : array) => {
		let output : string = "";
		for (const option of options)
			output += ` ${option}`;
		CREATE_MESSAGE(History, output);
	}, "outputs given arguments"]
}

function command_handler(History : array, command : string) {
	command = command.trim();

	if (command != "") {
		const split_command : array = command.split(" ");
		const given_command : string = split_command[0];
		if (COMMAND_FUNCTIONS[given_command]) {
			split_command.shift();
			COMMAND_FUNCTIONS[given_command][0](History, split_command);
		} else
			CREATE_MESSAGE(History, `bash: ${command}: no such command`);
	}

	setTimeout(() => {
		CREATE_CURSOR(History);
	});
}

export {
	command_handler,
	CREATE_MESSAGE, CREATE_CURSOR
}
