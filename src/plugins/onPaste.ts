import { ReactEditor } from "slate-react";
import { insertImage } from "./withImages";

/**
 * Triggered by the Slate Editor to handle the onPaste event.
 * @param event 
 * @param editor 
 * @param onImagePaste 
 * @returns 
 */
export default function onPaste(
    event: React.ClipboardEvent,
    editor: ReactEditor,
    onImagePaste?: (imageResult: File) => Promise<string>
) {
    event.preventDefault();

    const text = event.clipboardData.getData("text/plain");
    const files = event.clipboardData.files;

    if (!files || (files && files.length === 0)) {
        editor.insertText(text);
        return;
    }

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        const [mime] = file.type.split("/");

        if (mime === "image") {
            reader.addEventListener("load", async () => {
                if (reader.result && onImagePaste) {
                    const url = await onImagePaste(file);
                    insertImage(editor, url);
                }
            });
            reader.readAsDataURL(file);
        }
    }

}