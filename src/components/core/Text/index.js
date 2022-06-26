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
            blue2: {
                color: '$blue2',
            }
        },
        size: {
            default: {
                fontSize: '$default',
            },
            large: {
                fontSize: '$large',
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
    size,
    children,
    as,
    href,
}) => {
    if (!(type)) {
        return <NotFound name="Text" />
    }

    const TextType = textType[type];

    if (!(TextType)) {
        return <NotFound name="Text [type]" />
    }

    return (
        <TextType 
        {...className && {className: className}} 
        {...css && {css: {...css}}}
        {...color && {color: color}}
        {...size && {size: size}}
        {...as && {as: as}}
        {...href && {href: href}}>
            {children}
        </TextType>
    )
}

export default Text;