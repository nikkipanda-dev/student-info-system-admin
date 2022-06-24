import { styled } from "../../../stitches.config";

const Wrapper = styled('label', {
    variants: {
        uploadSize: {
            medium: {
                background: '$gray1',
                borderRadius: '$small',
                border: 'dotted',
                borderColor: '$gray2',
                padding: '$20',
                width: '300px',
                height: '150px',
                color: '$blue2',
            },
        }
    },
    '&.upload:hover': {
        cursor: 'pointer',
    },
});

export const Label = ({
    htmlFor,
    className,
    css,
    uploadSize,
    children,
}) => {
    return (
        <Wrapper
        {...htmlFor && {htmlFor: htmlFor}}
        {...className && {className: className}}
        {...css && {css: {...css}}}
        {...uploadSize && { uploadSize: uploadSize }}>
            {children}
        </Wrapper>
    )
}

export default Label;