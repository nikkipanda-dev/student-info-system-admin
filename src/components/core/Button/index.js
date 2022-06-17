import { styled } from "../../../stitches.config";

const Btn = styled('button', {
    border: 'none',
    transition: '$default',
    padding: '6px $10 $5',
    fontSize: '$default',
    fontFamily: '$khula',
    fontWeight: 'bold',
    borderRadius: '$small',
    variants: {
        color: {
            transparent: {
                background: 'transparent',
            },
            blue: {
                background: '$blue2',
                color: '$white',
                '&:hover': {
                    background: '$blue3',
                },
            },
            yellow: {
                background: '$yellow1',
                color: '$gray5',
                '&:hover': {
                    background: '$yellow2',
                },
            },
            green: {
                background: '$green1',
                color: '$white',
                '&:hover': {
                    background: '$green2',
                },
            },
            red: {
                background: '$red1',
                color: '$white',
                '&:hover': {
                    background: '$red2',
                },
            },
        },
    },
    '.button-sm': {

    },
    '&:hover': {
        cursor: 'pointer',
    },
});

export const Button = ({
    submit,
    text,
    onClick,
    evtOnclick,
    className,
    css,
    color,
}) => {
    return (
        <Btn
        {...className && {className: className}}
        {...css && {css: {...css}}}
        type={submit ? "submit" : "button"}
        {...onClick && {onClick: () => onClick()}}
        {...evtOnclick && {onClick: evt => evtOnclick(evt)}}
        {...color && {color: color}}>
            {text}
        </Btn>
    )
}

export default Button;