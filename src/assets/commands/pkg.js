async function setup_package(package_content, utils, filesystem) {
	return new Promise(async (resolve, reject) => {
		const package_name = package_content.name;
		const package_author = package_content.author;
		const package_version = package_content.version;
		const package_changes = package_content.changes;
		const number_of_changes = Object.keys(package_changes).length;
		utils.create_message(`installing ${package_name} by ${package_author}`);
		utils.create_message(`version ${package_version}`);
		utils.create_message(`changes to apply: ${number_of_changes}`);
	
		for (const path in package_changes) {
			const content = package_changes[path].content;
			const write_result = await utils.write_file(filesystem, path, content);
			console.log(write_result);
			if (write_result == 2) {
				const option = await utils.create_cursor(`file ${path} already exists. overwrite? [Y/n]`);
			}
		}

		resolve();
	});
}

function install(packages, utils) {
	utils.create_message(`looking for package${packages.length > 1 ? "s" : ""} ${packages.join(", ")}...`);
}

async function link_install(link, utils, filesystem) {
	return new Promise(async (resolve, reject) => {
		utils.create_message(`checking given url for a package file...`);

		try {
			const url = new URL(link);
			const check_package_resource = await fetch(url.href, { method: "HEAD" });
			const content_type = check_package_resource.headers.get("Content-Type");
		
			if (check_package_resource.ok && content_type.includes("application/javascript")) {
				const option = await utils.create_cursor("found files. install? [Y/n] ");
				const first_character = option ? option[0].toLowerCase() : "";
				const accepting = [" ", "", "y"];
				if (accepting.includes(first_character)) {
					const response = await fetch(url.href);
					const package_code = new Function(await response.text());
					const package_content = package_code();
					await setup_package(package_content, utils, filesystem);
				} else {
					utils.create_message("cancelling installation...");
				}
			} else {
				utils.create_message("error: no package found");
			}
		} catch (error) {
			console.log(error);
			utils.create_message("error: an error occured");
		}

		resolve();
	});
}

export default {
	name: "balls",
	description: 'test command',
	async execute(args, Utilities, filesystem) {
		return new Promise(async (resolve, reject) => {
			const utils = new Utilities();
			if (args.length < 1) {
				utils.create_message("error: no operation specified");
			} else {
				const operation = args[0];
				if (operation == "install") {
					const packages = args;
					packages.shift();
					if (packages.length > 0) install(packages, utils, filesystem);
					else utils.create_message("error: no package(s) specified");
				} else if (operation == "link") {
					const link = args[1];
					if (link) await link_install(link, utils, filesystem, filesystem);
					else utils.create_message("error: no link specified");
				}
			}
			resolve();
		});
	}
};
