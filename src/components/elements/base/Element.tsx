import { RenderCustomElementProps } from "../../../types";
import BlockQuote from "../BlockQuote";
import BulletList from "../BulletList";
import CodeBlock from "../CodeBlock";
import Image from "../Image";
import ListItem from "../ListItem";
import NumberList from "../NumberList";

export default function Element(props: RenderCustomElementProps) {
    const { attributes, children, element } = props;
    const defaultStyle = { textAlign: element?.align };

    if (!element?.type) {
        return <div {...attributes}>{children}</div>
    }

    switch (element.type) {
        case "image":
            return <Image {...props} />;
        case "block-quote":
            return <BlockQuote style={defaultStyle} {...props} />;
        case "bulleted-list":
            return <BulletList style={defaultStyle} {...props} />;
        case "numbered-list":
            return <NumberList style={defaultStyle} {...props} />;
        case "list-item":
            return <ListItem style={defaultStyle} {...props} />;
        case "code-block":
            return <CodeBlock style={defaultStyle} {...props} />
        default:
            return null;
    }
}