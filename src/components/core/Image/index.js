import { styled } from "../../../stitches.config";

import NotFound from "../../widgets/NotFound";

const Img = styled('img', {});

export const Image = ({
    src,
    alt,
    className,
    css,
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
        src={src} />
    )
}

export default Image;
