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
                background: '$yellow2',
                color: '$gray5',
                '&:hover': {
                    background: '$yellow3',
                },
            },
            green: {
                background: '$green2',
                color: '$white',
                '&:hover': {
                    background: '$green3',
                },
            },
            red: {
                background: '$red2',
                color: '$white',
                '&:hover': {
                    background: '$red3',
                },
            },
        },
    },
    '&.button-sm': {
        fontSize: '$small',
    },
    '&.button-lg': {
        padding: '10px $10 $5',
        fontSize: '$large',
    },
    '&:hover': {
        cursor: 'pointer',
    },
    '&[disabled], &[disabled]:hover': {
        background: '$blue1',
        cursor: 'default',
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
    disabled,
}) => {
    return (
        <Btn
        {...className && {className: className}}
        {...css && {css: {...css}}}
        type={submit ? "submit" : "button"}
        {...onClick && {onClick: () => onClick()}}
        {...evtOnclick && {onClick: evt => evtOnclick(evt)}}
        {...color && {color: color}}
        {...disabled && {disabled: true}}>
            {text}
        </Btn>
    )
}

export default Button;