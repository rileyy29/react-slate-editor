import { memo } from "react";
import { RenderCustomElementProps } from "../../types";

const ListItem = ({ attributes, children }: RenderCustomElementProps) => {
    return <li {...attributes}>{children}</li>;
}

export default memo(ListItem);