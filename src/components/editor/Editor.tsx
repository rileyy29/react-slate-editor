import { ReactElement, ReactNode, memo, useCallback, useMemo } from "react";
import { Descendant, createEditor } from "slate";
import { withHistory } from "slate-history";
import { Editable, RenderElementProps, RenderLeafProps, Slate, withReact } from "slate-react";
import { loadContentFromJSON } from "../../helpers";
import { getEmptyTextElement, onBlockButton, onMarkButton } from "../../nodes";
import onKeyDown from "../../plugins/onKeyDown";
import onPaste from "../../plugins/onPaste";
import withImages from "../../plugins/withImages";
import { RenderCustomElementProps } from "../../types";
import Element from "../elements/base/Element";
import Leaf from "../elements/base/Leaf";
import Toolbar from "../toolbar/Toolbar";
import styles from "./Editor.module.scss";

type EditorChildrenType = [{ children: any[] }];
type ToolbarIconType = "bold" | "italic" | "strikethrough" | "numbered-list" | "bulleted-list";

export interface InterfaceEditorProps {
    shouldSpellCheck?: boolean;
    shouldAutoFocus?: boolean;
    placeholder?: string;
    isReadOnly?: boolean;
    initialValue?: any;
    onChange?: (nodes: Descendant[]) => void;
    onImagePaste?: (reader: File) => Promise<string>;
    renderToolbarIcon?: (type: ToolbarIconType, onClick: (event: React.MouseEvent) => void) => ReactNode | ReactElement;
}

export default memo(function Editor({
    shouldSpellCheck = false,
    shouldAutoFocus = true,
    isReadOnly = false,
    placeholder = "",
    initialValue,
    onChange,
    onImagePaste,
    renderToolbarIcon
}: InterfaceEditorProps) {
    const editor = useMemo(() => withImages(withHistory(withReact(createEditor()))), []);
    const renderIcon = useCallback((type: ToolbarIconType, onClick: (event: React.MouseEvent) => void) => renderToolbarIcon ? renderToolbarIcon(type, onClick) : null, [renderToolbarIcon]);
    const renderElement = useCallback((props: RenderElementProps) => <Element {...props as RenderCustomElementProps} />, []);
    const renderLeaf = useCallback((props: RenderLeafProps) => <Leaf {...props} />, []);

    const defaultValue = useMemo<EditorChildrenType>(() => {
        const defaultChildren = getEmptyTextElement();

        if (!initialValue) {
            return defaultChildren;
        }

        if (typeof initialValue === "string") {
            return String(initialValue).trim() === "" ? defaultChildren : loadContentFromJSON(initialValue);
        }

        return initialValue;
    }, [initialValue]);

    return (
        <Slate
            editor={editor}
            value={defaultValue}
            onChange={(value) => {
                if (!isReadOnly && onChange) {
                    onChange(value);
                }
            }}>
            {isReadOnly || !renderIcon ? null :
                <Toolbar>
                    {renderIcon("bold", (event: React.MouseEvent) => onMarkButton(event, editor, "bold"))}
                    {renderIcon("italic", (event: React.MouseEvent) => onMarkButton(event, editor, "italic"))}
                    {renderIcon("strikethrough", (event: React.MouseEvent) => onMarkButton(event, editor, "strikethrough"))}
                    {renderIcon("numbered-list", (event: React.MouseEvent) => onBlockButton(event, editor, "numbered-list"))}
                    {renderIcon("bulleted-list", (event: React.MouseEvent) => onBlockButton(event, editor, "bulleted-list"))}
                </Toolbar>}
            <div className={styles.editorWrapper}>
                <Editable
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    spellCheck={shouldSpellCheck}
                    autoFocus={shouldAutoFocus}
                    readOnly={isReadOnly}
                    placeholder={placeholder}
                    onKeyDown={(event) => onKeyDown(event, editor)}
                    onPaste={(event) => onPaste(event, editor, onImagePaste)} />
            </div>
        </Slate>
    )
});