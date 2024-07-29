import { CREATE_MESSAGE } from "../logging.ts";

export default {
	name: "balls",
	description: 'test command',
	execute(args : object[]) {
		// creates a message
		CREATE_MESSAGE("hello balls");
	}
}
