import { styled } from "../../../stitches.config";

const Wrapper = styled('div', {});

export const Container = ({
    children, 
    css,
    className,
}) => {
    return (
        <Wrapper {...className && {className: className}} {...css && {css: {...css}}}>
            {children}
        </Wrapper>
    )
}

export default Container;