import { Fragment, memo } from "react";
import { RenderCustomElementProps } from "../../types";
import ResizableImage from "../custom/ResizeableImage";

const Image = ({ attributes, children, element }: RenderCustomElementProps) => {
    return (
        <div {...attributes} contentEditable={false}>
            <Fragment>{children}</Fragment>
            <ResizableImage uri={element.url} style={element.style} />
        </div>
    )
}

export default memo(Image);