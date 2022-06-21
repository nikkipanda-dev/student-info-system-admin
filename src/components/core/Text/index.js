import { styled } from "../../../stitches.config";
import NotFound from "../../widgets/NotFound";

const styling = {
    fontFamily: '$khula',
    fontSize: '$small',
    color: '$black',
    variants: {
        color: {
            info: {
                color: '$gray4',
            },
            success: {
                color: '$green2',
            },
            warning: {
                color: '$yellow3',
            },
            danger: {
                color: '$red2',
            },
        }
    }
}

const Span = styled('span', 
    styling,
    {}
);

const Paragraph = styled('p', 
    styling,
    {}
);

const textType = {
    span: Span,
    p: Paragraph,
}

export const Text = ({
    className,
    css,
    type,
    color,
    children,
}) => {
    if (!(type)) {
        return <NotFound name="Text" />
    }

    const Text = textType[type];

    if (!(type)) {
        return <NotFound name="Text [type]" />
    }

    return (
        <Text 
        {...className && {className: className}} 
        {...css && {css: {...css}}}
        {...color && {color: color}}>
            {children}
        </Text>
    )
}

export default Text;