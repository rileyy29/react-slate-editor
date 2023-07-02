import { memo } from "react";
import { RenderCustomElementProps } from "../../types";

const BlockQuote = ({ attributes, children }: RenderCustomElementProps) => {
    return <blockquote {...attributes}>{children}</blockquote>;
}

export default memo(BlockQuote);