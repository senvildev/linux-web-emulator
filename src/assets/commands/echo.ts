import { CREATE_MESSAGE } from "../logging.ts";

export default {
	name: "echo",
	description: "returns the provided string",
	execute(args : object[]) {
		// connect all arguments into one returned output
		let output : string = "";
		for (const arg of args)
			output += ` ${arg}`;
		// creates a message with the output
		CREATE_MESSAGE(output);
	}
}
