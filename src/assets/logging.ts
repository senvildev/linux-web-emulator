import { markRaw, ref } from "vue";
import type { Ref } from "vue";

import Message from "../components/Message.vue";
import Cursor from "../components/Cursor.vue";

// defines a public history with commands
export const History : Ref<array> = ref([]);

// adds a message component
function CREATE_MESSAGE(text : string) : void {
	History.value.push({component: markRaw(Message), content: text });
}

// adds a cursor component
function CREATE_CURSOR() : void {
	History.value.push({component: markRaw(Cursor)});
}

export {
	CREATE_MESSAGE, CREATE_CURSOR
}
