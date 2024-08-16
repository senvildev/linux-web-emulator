function setup_package(package_content, utils) {
	const package_name = package_content.name;
	const package_author = package_content.author;
	const package_version = package_content.version;
	const package_changes = package_content.changes;
	utils.create_message(`${package_name} by ${package_author}`);
	utils.create_message(`version ${package_version}`);
}

function install(packages, utils) {
	utils.create_message(`looking for package${packages.length > 1 ? "s" : ""} ${packages.join(", ")}...`);
}

async function link_install(link, utils) {
	return new Promise(async (resolve, reject) => {
		utils.create_message(`checking link ${link} for a package file...`);

		try {
			const url = new URL(link);
			const check_package_resource = await fetch(url.href, { method: "HEAD" });
		
			if (check_package_resource.ok) {
				utils.create_message("found files. downloading and installing:");
				const response = await fetch(url.href);
				const package_code = new Function(await response.text());
				const package_content = package_code();
				setup_package(package_content, utils);
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
	async execute(args, Utilities) {
		return new Promise(async (resolve, reject) => {
			const utils = new Utilities();
			if (args.length < 1) {
				utils.create_message("error: no operation specified");
			} else {
				const operation = args[0];
				if (operation == "install") {
					const packages = args;
					packages.shift();
					if (packages.length > 0) install(packages, utils);
					else utils.create_message("error: no package(s) specified");
				} else if (operation == "link") {
					const link = args[1];
					if (link) await link_install(link, utils);
					else utils.create_message("error: no link specified");
				}
			}
			resolve();
		});
	}
};
