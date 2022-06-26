import { styled } from "../../../stitches.config";

const Wrapper = styled('a', {});

export const Anchor = ({
    className,
    css,
    download,
    href,
    target,
    children,
}) => {
    return (
        <Wrapper
        {...className && {className: className}}
        {...css && {css: {...css}}}
        {...href && {href: href}}
        target={target ? target : "_self"}
        {...download && {download: true}}>
            {children}
        </Wrapper>
    )
}

export default Anchor;