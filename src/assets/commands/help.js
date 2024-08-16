import { CREATE_MESSAGE } from "../logging.ts";

export default {
	name: "help",
	description: "shows a list of commands",
	async execute(args) {
		// get all the commands available
		const commands = import.meta.glob("./*.js");
		
		// if arguments are specified
		if (args.length > 0) {
			// for every command available
			for (const path in commands) {
				// get the command
				const command = await commands[path]();
				// for every argument
				for (const arg of args) {
					// if starts with the given argument
					if (path.startsWith(`./${arg}`)) {
						// show name and description
						CREATE_MESSAGE(`${command.default.name} - ${command.default.description}`);
					}
				}
			}
		} else {
			// show this thing for informational purposes
			CREATE_MESSAGE("use \"help (command)\" for detailed info on using the specified command");
			
			// for every command available
			for (const path in commands) {
				// get the command
				const command = await commands[path]();
				// show name and description
				CREATE_MESSAGE(`${command.default.name} - ${command.default.description}`);
			}
		}
	}
}
