import { markRaw, ref } from "vue";
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

	create_cursor(content : string) : void {
		if (!content)
			content = "";
		History.value.push({component: markRaw(Cursor), content: content });
	}
}

export { Utilities };
