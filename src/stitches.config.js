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
            yellow1: "#ffd968",
            yellow2: "#f0ca57",
            red1: "#DC3545",
            red2: "#bd202f",
            green1: "#28A745",
            green2: "#178931",
            gray1: "#FBFBFB",
            gray2: "#9D9D9D",
            gray3: "#E3E3E3",
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
    "@import": ["https://fonts.googleapis.com/css2?family=Khula&family=Sawarabi+Gothic&display=swap"],
});