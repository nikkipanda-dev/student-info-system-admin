import { styled } from "../../../stitches.config";

const Wrapper = styled('section', {});

export const Section = ({
    children,
    className,
    css,
}) => {
    return (
        <Wrapper {...className && {className: className}} {...css && {css: {...css}}}>
            {children}
        </Wrapper>
    )
}

export default Section;