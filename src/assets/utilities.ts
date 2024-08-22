import { markRaw, ref, h } from "vue";
import type { Ref } from "vue";

import Message from "../components/Message.vue";
import Cursor from "../components/Cursor.vue";

export const History : Ref<object[]> = ref([]);

class Utilities {
	create_message(content : string) : void {
		// split for hyperlinks
		const hyperlink_split : string[] = content.split("|@|").filter(Boolean);
		// prepare a string for the final content
		let final_content : string = "";
		// check if format is okay and iterate through the hyperlinks
		for (let hyperlink of hyperlink_split) {
			// split the hyperlink format
			const split_hyperlink_content : array = hyperlink.split("|");
			if (split_hyperlink_content.length === 2) {
				// create <a> element with link and given text in the hyperlink format
				final_content +=
					`<a href="${split_hyperlink_content[1]}" target="_blank">${split_hyperlink_content[0]}</a>`;
			} else final_content += hyperlink;
		}

		History.value.push({component: markRaw(Message), content: final_content });
	}

	create_cursor(content : string, handling : any) : void {
		return new Promise((resolve, reject) => {
			if (!content) content = "";
			const cursorVNode = h(Cursor, {
				content: content,
				onRanCommand: (command : string) => {
					if (handling) handling(command);
					resolve(command);
				}
			});
			History.value.push({ component: cursorVNode, content: content });
		});
	};

	async write_file(filesystem : any, path : string, content: string, force : boolean) {
		return new Promise(async (resolve, reject) => {
			const check_for_file = await filesystem.get("filesystem", path);
			const is_directory = check_for_file[check_for_file.length - 1];
			if (!is_directory) {
				if (check_for_file) {
					resolve(2);
				} else {
					await filesystem.put("filesystem", {
						path: path,
						content: content
					});
				}
			}
			resolve(0);
		});
	}
}

export { Utilities };
