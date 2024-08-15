import { CREATE_MESSAGE } from "../logging.ts";

export default {
	name: "git",
	description: "git (wip)",
	execute(args : object[]) {
		// returns a project lol
		CREATE_MESSAGE("marketplace - project name [|@|click me|https://google.com/|@|]");
	}
}
