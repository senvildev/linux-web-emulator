import { CREATE_MESSAGE } from "../logging.ts";

export default {
	name: "echo",
	description: "returns the provided string",
	execute(args) {
		// creates a message with the output
		CREATE_MESSAGE(args.join(' '));
	}
}
