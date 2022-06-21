import { styled, fadeIn, } from "../../../stitches.config";

const Wrapper = styled('section', {
    transition: '$default',
    opacity: 0,
    animation: `${fadeIn} .2s ease-in-out .1s 1 normal forwards`,
    width: '100%',
    variants: {
        background: {
            transparent: {
                background: 'transparent',
            },
            blue: {
                background: '$blue2',
            },
            green: {
                background: '$green1',
            },
            yellow: {
                background: '$yellow1',
            },
            gray1: {
                background: '$gray1',
            },
            gray2: {
                background: '$gray2',
            },
            gray3: {
                background: '$gray3',
            },
        },
    },
});

export const Section = ({
    children,
    className,
    css,
    background,
}) => {
    return (
        <Wrapper 
        {...className && {className: className}} 
        {...css && {css: {...css}}}
        {...background && {background: background}}>
            {children}
        </Wrapper>
    )
}

export default Section;