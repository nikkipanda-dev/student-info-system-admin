import { forwardRef, } from "react";
import { styled, } from "../../../stitches.config";

const Wrapper = styled('div', {
    variants: {
        background: {
            transparent: {
                background: 'transparent',
            },
            white: {
                background: '$white',
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
        radius: {
            small: {
                borderRadius: '$small',
            },
            default: {
                borderRadius: '$default',
            }
        },
    },
});

export const Container = forwardRef(({
    children, 
    css,
    className,
    onClick,
    background,
    radius,
}, ref) => {
    return (
        <Wrapper 
        {...className && {className: className}} 
        {...css && {css: {...css}}}
        {...background && {background: background}}
        {...radius && {radius: radius}}
        {...onClick && {onClick: () => onClick()}}
        ref={ref}>
            {children}
        </Wrapper>
    )
});

export default Container;