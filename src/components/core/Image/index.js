import { styled } from "../../../stitches.config";

import NotFound from "../../widgets/NotFound";

const Img = styled('img', {});

export const Image = ({
    src,
    alt,
    className,
    css,
    onClick,
}) => {
    if (!(src)) {
        <NotFound name="Image src" />
        return;
    }

    return (
        <Img 
        {...className && {className: className}}
        {...css && {css: {...css}}}
        {...alt && {alt: alt}}
        {...onClick && {onClick: () => onClick()}}
        src={src} />
    )
}

export default Image;
