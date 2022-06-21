import { forwardRef, } from "react";
import { styled, fadeIn, } from "../../../stitches.config";

const Wrapper = styled('main', {
    maxWidth: '1920px',
    transition: '$default',
    opacity: '0',
    margin: 'auto',
    animation: `${fadeIn} .2s ease-in-out 1 normal forwards`,
});

export const Main = forwardRef(({
    children,
    className,
    css,
}, ref) => {
    return (
        <Wrapper 
        {...className && {className: className}} 
        {...css && {css: {...css}}}
        {...ref && {ref: ref}}>
            {children}
        </Wrapper>
    )
});

export default Main;