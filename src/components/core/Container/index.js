import { styled } from "../../../stitches.config";

const Wrapper = styled('div', {
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

export const Container = ({
    children, 
    css,
    className,
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

export default Container;