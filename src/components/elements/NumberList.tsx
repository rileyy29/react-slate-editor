import { memo } from "react";
import { RenderCustomElementProps } from "../../types";

const NumberList = ({ attributes, children }: RenderCustomElementProps) => {
    return <ol style={{ marginBlockStart: "0em", paddingInlineStart: "20px", listStyleType: "decimal" }} {...attributes}>{children}</ol>;
}

export default memo(NumberList);