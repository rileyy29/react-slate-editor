import { ReactEditor } from "slate-react";
import { toggleMark } from "../nodes";

const MARK_HOTKEYS = [
    { key: "b", mark: "bold" },
    { key: "i", mark: "italic" },
    { key: "u", mark: "underline" },
    { key: "'", mark: "code" }
];

/**
 * Triggered by the Slate Editor to handle the onKeyDown event.
 * @param event 
 * @param editor 
 * @returns 
 */
export default function onKeyDown(event: React.KeyboardEvent, editor: ReactEditor) {
    const hotkey = MARK_HOTKEYS.find((key) => event.key === key.key);
    if (!event.ctrlKey || !hotkey) {
        return;
    }

    event.preventDefault();
    toggleMark(editor, hotkey.mark);
}