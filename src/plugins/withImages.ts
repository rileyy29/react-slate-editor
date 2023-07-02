import { Editor, Element as SlateElement, Transforms } from 'slate';
import { ReactEditor } from 'slate-react';
import { isCustomElement } from '../helpers';
import { getEmptyTextElement } from '../nodes';
import { CustomElement } from '../types';

/**
 * Insert a custom image node into the editor.
 * @param editor 
 * @param url 
 */
export function insertImage(editor: ReactEditor, url: string) {
    const image: CustomElement = { type: "image", url, children: [{ text: "" }] };
    Transforms.insertNodes(editor, [image, getEmptyTextElement()]);
}

/**
 * Wraparound function for ReactEditor to support the management of custom image nodes.
 * @param editor 
 * @returns 
 */
export default function withImages(editor: ReactEditor): ReactEditor {
    const { insertBreak, isVoid } = editor;

    editor.isVoid = (element) => {
        if (SlateElement.isElement(element) && isCustomElement(element as CustomElement, "image")) {
            return true;
        }

        return isVoid(element);
    }

    editor.insertBreak = () => {
        if (!editor.selection) {
            insertBreak();
            return;
        }

        const [node] = Editor.node(editor, editor.selection);
        if (SlateElement.isElement(node) && isCustomElement(node as CustomElement, "image")) {
            Transforms.insertNodes(editor, getEmptyTextElement());
            return;
        }

        insertBreak();
    }

    return editor;
}