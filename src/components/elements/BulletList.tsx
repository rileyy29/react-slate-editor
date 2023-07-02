import { memo } from "react";
import { RenderCustomElementProps } from "../../types";

const BulletList = ({ attributes, children }: RenderCustomElementProps) => {
    return <ul style={{ margin: "unset", listStyleType: "disc", marginBlockStart: "0em", paddingInlineStart: "20px" }} {...attributes}>{children}</ul>;
}

export default memo(BulletList);