const module = {
	name: "balls",
	description: 'test command',
	execute(args, Utilities) {
		const utils = new Utilities();
		// creates a message
		console.log("hi");
		utils.create_message("hello balls");
		return 0;
	}
}

return module;
