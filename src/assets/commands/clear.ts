import { History } from "../logging.ts";

export default {
	name: "clear",
	description: "clears the terminal screen",
	execute(args : string[]) {
		// clears history which deletes all the components
		History.value = [];
	}
}
