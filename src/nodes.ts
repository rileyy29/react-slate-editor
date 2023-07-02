import { Descendant, Editor, Node, Element as SlateElement, Text, Transforms } from "slate";
import { ReactEditor } from "slate-react";
import { AlignType, CustomElement, ElementType, LIST_TYPES, TEXT_ALIGN_TYPES, TypeOrAlign } from "./types";

/**
 * Create an empty children array for the editor. 
 * @returns 
 */
export function getEmptyTextElement() {
    return { children: [{ text: "" }] };
}

/**
 * Determine whether the editor is empty. 
 * Adapted for inline image support.
 * @param value 
 * @returns 
 */
export function isEditorEmpty(value: Descendant[]) {
    if (!value || value?.length == 0) {
        return true;
    }

    for (let i = 0; i < value?.length; i++) {
        const node = value[i] as CustomElement;

        if (SlateElement.isElement(node) && node?.type === "image" && String(node?.url)?.trim() !== '') {
            return false;
        } else if (Text.isText(node) && node.text.trim() !== '') {
            return false;
        } else if (!Text.isText(node) && Node.string(node).trim() !== '') {
            return false;
        }
    }

    return true;
};

//! Editor Markings
/**
 * Determine whether the mark type is active.
 * @param editor 
 * @param format 
 * @returns 
 */
export function isMarkActive(editor: ReactEditor, format: string) {
    const marks: any = Editor.marks(editor);
    return marks ? marks[format] === true : false;
}

/**
 * Activate or deactivate the specified mark type.
 * @param editor 
 * @param format 
 * @returns 
 */
export function toggleMark(editor: ReactEditor, format: string) {
    const isActive = isMarkActive(editor, format);

    if (isActive) {
        Editor.removeMark(editor, format);
        return;
    }

    Editor.addMark(editor, format, true);
}

/**
 * Adaption of toggleMark for Toolbar-button support.
 * @param event 
 * @param editor 
 * @param format 
 */
export function onMarkButton(event: React.MouseEvent, editor: ReactEditor, format: string) {
    event.preventDefault();
    toggleMark(editor, format);
    ReactEditor.focus(editor);
}

//! Editor Blocks
/**
 * Determine whether the block type is active.
 * @param editor 
 * @param format 
 * @param blockType 
 * @returns 
 */
export function isBlockActive(editor: ReactEditor, format: string, blockType: TypeOrAlign = "type") {
    if (!editor.selection) {
        return false;
    }

    const [match] = Array.from(
        Editor.nodes(editor, {
            at: Editor.unhangRange(editor, editor.selection),
            //@ts-expect-error Expect error due to Custom Element support
            match: (n: CustomElement) =>
                !Editor.isEditor(n) &&
                SlateElement.isElement(n) &&
                n[blockType] === format
        }));

    return !!match;
}

/**
 * Activate or deactivate the specified block type.
 * @param editor 
 * @param format 
 * @returns 
 */
export function toggleBlock(editor: ReactEditor, format: AlignType | ElementType) {
    const isAlign = TEXT_ALIGN_TYPES.includes(format);
    const isActive = isBlockActive(editor, format, isAlign ? "align" : "type");
    const isList = LIST_TYPES.includes(format);

    Transforms.unwrapNodes(editor, {
        //@ts-expect-error Expect error due to Custom Element support
        match: (n: CustomElement) =>
            !Editor.isEditor(n) &&
            SlateElement.isElement(n) &&
            LIST_TYPES.includes(String(n.type)) &&
            !isAlign,
        split: true
    });

    const newProperties: any = isAlign ?
        { align: isActive ? undefined : format } :
        { type: isActive ? undefined : isList ? "list-item" : format };
    Transforms.setNodes<CustomElement>(editor, newProperties);

    if (!isActive && isList) {
        const block: CustomElement = { type: format, children: [] } as { type: ElementType, children: any[] };
        Transforms.wrapNodes(editor, block);
    }

}

/**
 * Adaption of toggleBlock for Toolbar-button support.
 * @param event 
 * @param editor 
 * @param format 
 */
export function onBlockButton(event: React.MouseEvent, editor: ReactEditor, format: AlignType | ElementType) {
    event.preventDefault();
    toggleBlock(editor, format);
    ReactEditor.focus(editor);
}