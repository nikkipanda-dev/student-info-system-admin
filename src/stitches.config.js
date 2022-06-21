import { createStitches } from '@stitches/react';

export const {
    styled,
    css,
    globalCss,
    keyframes,
    getCssText,
    theme,
    createTheme,
    config,
} = createStitches({
    theme: {
        colors: {
            blue1: "#00B4D8",
            blue2: "#00B4D8",
            blue3: "#0077B6",
            blue4: "#03045E",
            yellow1: "#fff6dc",
            yellow2: "#ffd968",
            yellow3: "#f0ca57",
            red1: "#ffe3e6",
            red2: "#DC3545",
            red3: "#bd202f",
            green1: "#dcffe4",
            green2: "#28A745",
            green3: "#178931",
            gray1: "#FBFBFB",
            gray2: "#E3E3E3",
            gray3: "#9D9D9D",
            gray4: "#747474",
            gray5: "#3e3e3e",
            white: "#ffffff",
            black: "#000000",
        },
        space: {
            5: '5px',
            10: '10px',
            15: '15px',
            20: '20px',
            30: '30px',
            50: '50px',
        },
        fontSizes: {
            default: '16px',
            small: '.9rem',
            large: '1.1rem',
            heading1: '2.15rem',
            heading2: '1.75rem',
            heading3: '1.5rem',
            heading4: '1.35rem',
        },
        fonts: {
            sawarabiGothic: 'Sawarabi Gothic, sans-serif',
            khula: 'Khula, sans-serif',
        },
        fontWeights: {},
        lineHeights: {},
        letterSpacings: {
            default: '.1px',
        },
        sizes: {},
        borderWidths: {},
        borderStyles: {},
        radii: {
            default: "15px",
            small: "10px",
            rounded: "30px",
        },
        shadows: {},
        zIndices: {},
        transitions: {
            default: 'all .15s ease-in-out',
        },
    },

});

export const globalStyles = globalCss({
    "html": {
        fontSize: '$default',
        fontFamily: '$khula',
    },
    "*": {
        margin: 0,
        padding: 0,
        letterSpacing: '$default',
    },
    '.ant-form-item-explain-error': {
        color: '$red2',
        fontFamily: '$khula',
        fontSize: '$small',
    },
    "@import": ["https://fonts.googleapis.com/css2?family=Khula&family=Sawarabi+Gothic&display=swap"],
});

export const spinnerStyle = {
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: '$default',
}

export const fadeIn = keyframes({
    '0%': { opacity: '0' },
    '100%': { opacity: '1' },
});

export const fadeOut = keyframes({
    '0%': { opacity: '1' },
    '100%': { opacity: '0' },
});

export const sectionStyle = {
    background: '$gray1', 
    padding: '$30',
    borderRadius: '$rounded',
}

export const sidebarStyle = {
    padding: '$15',
    fontFamily: '$khula',
    fontSize: '$default',
    'a': {
        color: '$gray4',
        letterSpacing: '$default',
    },
    '.activeLink': {
        fontFamily: '$khula',
        color: '$blue2',
    },
}