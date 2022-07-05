import { styled } from "../../../stitches.config";

import NotFound from "../../widgets/NotFound";

const styling = {
    fontFamily: '$sawarabiGothic',
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
    },
}

const H1 = styled('h1', 
    styling,
    {
        fontSize: '$heading1',
    }
);

const H2 = styled('h2',
    styling,
    {
        fontSize: '$heading2',
    }
);

const H3 = styled('h3',
    styling,
    {
        fontSize: '$heading3',
    }
);

const H4 = styled('h4',
    styling,
    {
        fontSize: '$heading4',
    }
);

const headingType = {
    1: H1,
    2: H2,
    3: H3,
    4: H4,
}

export const Heading = ({
    type,
    className,
    css,
    color,
    text,
}) => {
    if (!(type)) {
        <NotFound name="Heading" />
    }

    const Header = headingType[type];

    return (
        <Header 
        {...className && {className: className}} 
        {...css && {css: {...css}}}
        {...color && {color: color}}>
            {text}
        </Header>
    )
}

export default Heading;