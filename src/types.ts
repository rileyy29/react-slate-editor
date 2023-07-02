import { CSSProperties } from "react";
import { BaseElement } from "slate";
import { RenderElementProps } from "slate-react";

//! Constant-based Types
export const LIST_TYPES = ['numbered-list', 'bulleted-list'];
export const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify'];

//! Elements
export type CustomElement = BaseElement & {
    type?: ElementType;
    url?: string;
    align?: AlignType;
    style?: CSSProperties;
}

export type ElementType = "image" | "block-quote" | "list-item" | "numbered-list" | "bulleted-list" | "code-block";
export type AlignType = "left" | "center" | "right" | "justify";
export type TypeOrAlign = "type" | "align";

export interface RenderCustomElementProps extends RenderElementProps {
    element: CustomElement;
    style?: CSSProperties;
}

//! Leaf
export type CustomLeaf = {
    bold?: boolean;
    italic?: boolean;
    code?: boolean;
    underline?: boolean;
    strikethrough?: boolean;
}