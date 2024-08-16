import { Utilities } from "./utilities.ts";

import { openDB } from "idb";
import { ref } from "vue";

const utilities = new Utilities();

const filesystem = await openDB("filesystem", 1, {
	upgrade(database) {
		const store = database.createObjectStore("filesystem", {
			keyPath: "path"
		});
	}
});

await filesystem.put("filesystem", { path: "/", content: "" });
await filesystem.put("filesystem", { path: "/scripts/", content: "" });
await filesystem.put("filesystem", { path: "/scripts/echo.js", content: "const script = {name: \"hi\",execute(args, Utilities) {console.log(\"hi\\nballs\");}}; return script;" });
const file = await filesystem.get("filesystem", "/scripts/echo.js");
const content = file.content;
const funct = new Function(content);
funct().execute([], Utilities);

// handles passed commands
async function command_handler(command : string) {
	// trims the spaces
	command = command.trim();

	// if it isnt empty
	if (command != "") {
		// split the passed command into arguments and filter it out
		const split_command : object[] = command.split(" ").filter(arg => arg !== "");
		// get the command name itself
		const given_command : string = split_command[0];
		// remove the command name
		split_command.shift();
		try {
			if (given_command == "pkg") {
				const package_command = await import("./commands/pkg.js");
				await package_command.default.execute(split_command, Utilities)
			} else {
				// wip
			}
		} catch(error) {
			// otherwise show that it doesnt exist
			console.log(error);
			utilities.create_message(`bash: ${given_command}: no such command`);
		}
	}

	// create a new cursor (timeout required dont delete)
	setTimeout(() => {
		utilities.create_cursor();
	});
}

export {
	command_handler
}
