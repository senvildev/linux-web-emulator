import {
	History,
	CREATE_MESSAGE, CREATE_CURSOR
} from "./logging.ts";

// handles passed commands
async function command_handler(command : string) {
	// trims the spaces
	command = command.trim();

	// if it isnt empty
	if (command != "") {
		// split the passed command into arguments and filter it out
		const split_command : array = command.split(" ").filter(arg => arg !== "");
		// get the command name itself
		const given_command : string = split_command[0];
		// remove the command name
		split_command.shift();
		try {
			// get the file with the command
			const command_module = await import(`./commands/${given_command}.ts`);
			if (command_module) // execute the command if it exists
				await command_module.default.execute(split_command);

		} catch(error) {
			// otherwise show that it doesnt exist
			CREATE_MESSAGE(`bash: ${given_command}: no such command`);
		}
	}

	// create a new cursor (timeout required dont delete)
	setTimeout(() => {
		CREATE_CURSOR();
	});
}

export {
	command_handler
}
