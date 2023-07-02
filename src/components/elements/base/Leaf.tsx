import { RenderLeafProps } from "slate-react";
import { CustomLeaf } from "../../../types";

export default function Leaf({ attributes, children, ...props }: RenderLeafProps) {
    const leaf = props.leaf as CustomLeaf;

    if (leaf.bold) {
        children = <strong>{children}</strong>;
    }

    if (leaf.code) {
        children = <code>{children}</code>;
    }

    if (leaf.italic) {
        children = <em>{children}</em>;
    }

    if (leaf.underline) {
        children = <u>{children}</u>;
    }

    if (leaf.strikethrough) {
        children = <span style={{ textDecorationLine: "line-through" }}>{children}</span>
    }

    return <span {...attributes}>{children}</span>
}