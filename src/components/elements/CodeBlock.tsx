import { memo } from "react";
import { RenderCustomElementProps } from "../../types";

const CodeBlock = ({ attributes, children }: RenderCustomElementProps) => {
    return (
        <div {...attributes} style={{
            fontFamily: "inherit",
            fontSize: "16px",
            lineHeight: "20px",
            marginTop: "0px",
            background: "rgba(0, 20, 60, .03)",
            padding: "0px 13px",
            margin: "0px 10px"
        }}>
            {children}
        </div>
    )
}

export default memo(CodeBlock);